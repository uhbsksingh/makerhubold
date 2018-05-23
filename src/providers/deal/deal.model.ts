import { DateTime } from "ionic-angular";
import { BaseModel } from "../base.model";

export class Deal extends BaseModel {
    aliasName: string;
    createdByCollectionDetailId: string;
    referencedCollectionDetailId: string;
    tags: string;
    createdDateTime: DateTime;
    updatedDateTime: DateTime;
}