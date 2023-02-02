package fr.cgi.magneto.model.boards;

import fr.cgi.magneto.core.constants.*;
import fr.cgi.magneto.helper.*;
import fr.cgi.magneto.model.Model;
import fr.cgi.magneto.model.cards.Card;
import io.vertx.core.json.*;

import java.util.*;

public class BoardPayload implements Model<BoardPayload> {
    private String _id;
    private String title;
    private String imageUrl;
    private String description;
    private String ownerId;
    private String ownerName;
    private String creationDate;
    private String modificationDate;
    private String folderId;
    private String layoutType;
    private List<String> cardIds;
    private List<String> tags;
    private boolean isPublic;

    public BoardPayload() {

    }

    @SuppressWarnings("unchecked")
    public BoardPayload(JsonObject board) {
        this._id = board.getString(Field._ID, null);
        this.title = board.getString(Field.TITLE);
        this.imageUrl = board.getString(Field.IMAGEURL);
        this.description = board.getString(Field.DESCRIPTION);
        this.ownerId = board.getString(Field.OWNERID);
        this.ownerName = board.getString(Field.OWNERNAME);
        this.folderId = board.getString(Field.FOLDERID);
        this.layoutType = board.getString(Field.LAYOUTTYPE);
        this.cardIds = !board.getJsonArray(Field.CARDIDS, new JsonArray()).isEmpty() ?
                board.getJsonArray(Field.CARDIDS, new JsonArray()).getList() : null;
        this.tags = !board.getJsonArray(Field.TAGS, new JsonArray()).isEmpty() ?
                board.getJsonArray(Field.TAGS, new JsonArray()).getList() : null;
        this.isPublic = board.getBoolean(Field.PUBLIC, false);
        if (this.getId() == null) {
            this.setCreationDate(DateHelper.getDateString(new Date(), DateHelper.MONGO_FORMAT));
        }
        this.setModificationDate(DateHelper.getDateString(new Date(), DateHelper.MONGO_FORMAT));
    }

    public String getId() {
        return _id;
    }

    public BoardPayload setId(String id) {
        this._id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public BoardPayload setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public BoardPayload setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public BoardPayload setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public BoardPayload setOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public BoardPayload setOwnerName(String ownerName) {
        this.ownerName = ownerName;
        return this;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public BoardPayload setCreationDate(String creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public String getFolderId() {
        return folderId;
    }

    public BoardPayload setFolderId(String folderId) {
        this.folderId = folderId;
        return this;
    }

    public String getLayoutType() {
        return layoutType;
    }

    public BoardPayload setLayoutType(String layoutType) {
        this.layoutType = layoutType;
        return this;
    }

    public boolean isLayoutFree() {
        return this.layoutType.equals(Field.FREE);
    }

    public String getModificationDate() {
        return modificationDate;
    }

    public BoardPayload setModificationDate(String modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public List<String> getCardIds() {
        return cardIds;
    }

    public BoardPayload setCardIds(List<String> cardIds) {
        this.cardIds = cardIds;
        return this;
    }

    public List<String> getTags() {
        return tags;
    }

    public BoardPayload setTags(List<String> tags) {
        this.tags = tags;
        return this;
    }

    public BoardPayload addCards(List<String> cardIds) {
        if (this.cardIds == null)
            this.cardIds = new ArrayList<>();
        if(cardIds != null) {
            cardIds.forEach((id) -> this.cardIds.add(0, id));
        }
        return this;
    }

    public BoardPayload removeCardIds(List<String> cardIds) {
        if(cardIds != null) {
            cardIds.forEach((id) -> this.cardIds.remove(id));
        }
        return this;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public BoardPayload setPublic(boolean isPublic) {
        this.isPublic = isPublic;
        return this;
    }

    @Override
    public JsonObject toJson() {

        JsonObject json = new JsonObject();
        if (this.getTitle() != null) {
            json.put(Field.TITLE, this.getTitle());
        }
        if (this.getImageUrl() != null) {
            json.put(Field.IMAGEURL, this.getImageUrl());
        }
        if (this.getDescription() != null) {
            json.put(Field.DESCRIPTION, this.getDescription());
        }

        if (this.getCardIds() != null && this.getId() != null) {
            json.put(Field.CARDIDS, new JsonArray(this.getCardIds()));
        }

        if (this.getTags() != null) {
            json.put(Field.TAGS, new JsonArray(this.getTags()));
        }

        if (this.getLayoutType() != null) {
            json.put(Field.LAYOUTTYPE, this.getLayoutType());
        }

        json.put(Field.PUBLIC, this.isPublic());
        json.put(Field.MODIFICATIONDATE, this.getModificationDate());

        // If create
        if (this.getId() == null) {
            json.put(Field.CREATIONDATE, this.getCreationDate())
                    .put(Field.DELETED, false)
                    .put(Field.OWNERID, this.getOwnerId())
                    .put(Field.OWNERNAME, this.getOwnerName())
                    .put(Field.CARDIDS, new JsonArray());
        }

        return json;
    }

    @Override
    public BoardPayload model(JsonObject board) {
        return new BoardPayload(board);
    }

}
