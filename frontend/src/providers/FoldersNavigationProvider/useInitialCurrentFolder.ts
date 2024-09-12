import { useTranslation } from "react-i18next";

import { FOLDER_TYPE } from "~/core/enums/folder-type.enum";
import { Folder } from "~/models/folder.model";
import { useOdeClient } from "~/utils/context.utils";

export const useInitialCurrentFolder = () => {
  const { user } = useOdeClient();
  const { t } = useTranslation("magneto");
  const folder = new Folder(FOLDER_TYPE.MY_BOARDS).build({
    _id: FOLDER_TYPE.MY_BOARDS,
    title: t("magneto.my.boards"),
    ownerId: user?.userId ?? "",
    parentId: "",
  });
  return folder;
};
