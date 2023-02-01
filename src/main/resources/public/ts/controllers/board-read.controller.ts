import {ng, notify} from "entcore";
import {IScope} from "angular";
import {IBoardsService, ICardsService, ISectionsService} from "../services";
import {Board, Boards, Card, Section, Sections} from "../models";
import {safeApply} from "../utils/safe-apply.utils";
import {AxiosError} from "axios";
import {LAYOUT_TYPE} from "../core/enums/layout-type.enum";

interface IViewModel {

    card: Card;
    board: Board;

    filter: {
        page: number,
        count: number,
        boardId: string
    };

    getCard(): Promise<void>;

    nextPage(): Promise<void>;

    previousPage(): Promise<void>;

    changeSection(section: Section): Promise<void>;

    getPageBySection(section: Section): number;

    isLastPage(): boolean;

    goToBoard(): void;

    openSection(): void;

    sectionFilter(item): boolean;

}

interface ICardsScope extends IScope {
    vm: IViewModel;
}

class Controller implements ng.IController, IViewModel {

    card: Card;
    section: Section;
    board: Board;

    filter: {
        page: number,
        count: number,
        boardId: string;
        showSection: boolean;
    };


    constructor(private $scope: ICardsScope,
                private $route: any,
                private $location: ng.ILocationService,
                private $sce: ng.ISCEService,
                private boardsService: IBoardsService,
                private sectionsService: ISectionsService,
                private cardsService: ICardsService) {
        this.$scope.vm = this;

        this.filter = {
            page: 0,
            count: 0,
            boardId: (this.$route.current && this.$route.current.params) ? this.$route.current.params.boardId : null,
            showSection: false
        };

        this.board = new Board();
        this.getBoard()
            .then(() => this.getCard())
            .then(() => this.filter.count = this.board.isLayoutFree() ? this.board.cardIds.length : this.board.cardIdsSection().length);
    }

    async $onInit(): Promise<void> {
    }

    /**
     * Reading mode : go to the next page
     */
    async nextPage(): Promise<void> {
        this.filter.page++;
        await this.getCard();
        safeApply(this.$scope);
    }

    /**
     * Reading mode : go to the previous page
     */
    async previousPage(): Promise<void> {
        this.filter.page--;
        await this.getCard();
        safeApply(this.$scope);
    }

    /**
     *     Fetch board infos.
     */
    getBoard = async (): Promise<void> => {
        return this.boardsService.getBoardsByIds([this.filter.boardId])
            .then(async (res: Boards) => {
                if (!!res) {
                    this.board = res.all[0];
                    if (this.board.layoutType != LAYOUT_TYPE.FREE) {
                        return this.sectionsService.getSectionsByBoard(this.filter.boardId).then(async (sections: Sections) => {
                            this.board.sections = [];
                            sections.all.forEach(section => {
                                if (section.cardIds.length > 0) {
                                    this.board.sections.push(section);
                                }
                            })
                            this.board.sections = sections.all;
                            this.section = this.board.sections.find(section => section.cardIds.length > 0);
                            return Promise.resolve();
                        });
                    }
                }
            })
            .catch((err: AxiosError) => {
                notify.error(err.message)
            });
    }

    /**
     * Get card infos
     */
    getCard = async (): Promise<void> => {
        const cards: Array<string> = this.board.isLayoutFree() ? this.board.cardIds : this.board.cardIdsSection();
        if (!this.board.isLayoutFree()) {
            this.section = this.board.sections.find(section => section.cardIds.indexOf(cards[this.filter.page]) !== -1)
        }
        return this.cardsService.getCardById(cards[this.filter.page])
            .then((res: Card) => {
                if (!!res) {
                    this.card = res;
                }
                safeApply(this.$scope);
            })
            .catch((err: AxiosError) => {
                notify.error(err.message)
            });
    }

    /**
     * Check if the current page is the last one
     */
    isLastPage = (): boolean => {
        return this.filter.count == this.filter.page + 1;
    }

    getPageBySection(section: Section): number {
        let sum: number = 0;
        section = this.board.sections.find(sectionResult => sectionResult.id == section.id);
        for (let i = 0; i < this.board.sections.indexOf(section); i++) {
            sum += this.board.sections[i].cardIds.length;
        }
        return sum;
    }

    async changeSection(section: Section): Promise<void> {
        this.filter.page = this.getPageBySection(section);
        await this.getCard();
        this.filter.showSection = false;
        safeApply(this.$scope);
    }


    openSection(): void {
        this.filter.showSection = !this.filter.showSection;
    }

    sectionFilter = item => {
        return item.cardIds.length > 0 && this.section.id !== item.id;
    };


    /**
     * Go to the board page
     */
    goToBoard(): void {
        this.$location.path(`/board/view/${this.board.id}`);
    }

    $onDestroy() {
    }

}

export const boardReadController = ng.controller('BoardReadController',
    ['$scope', '$route', '$location', '$sce', 'BoardsService', 'SectionsService', 'CardsService', Controller]);