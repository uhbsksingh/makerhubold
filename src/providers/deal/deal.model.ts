import { DateTime } from "ionic-angular";
import { BaseModel } from "../base.model";
import { Collection } from "../collection/collection.model";
import { Item } from "../item/item.model";

export class Deal extends BaseModel {
    dealDetailId: number;
    aliasName: string;
    createdByCollectionDetailId: string;
    tags: string;
    createdDateTime: DateTime;
    updatedDateTime: DateTime;

    referencedCollectionDetail: Collection;
    dealItemDetails: DealItem[]
}

export class DealItem extends BaseModel {
    dealItemDetailId: number;
    dealDetailId: number;
    senderId: string;
    transferQuantity: number;
    transferApproved: boolean;
    transferDateTime: string;
    newReferenceCollectionDetailId: string;
    currentReferenceCollectionDetailId: string;

    itemDetail: Item;
}
