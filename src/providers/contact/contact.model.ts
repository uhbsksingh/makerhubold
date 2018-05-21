import { DateTime } from "ionic-angular";
import { BaseModel } from "../base.model";

export class Contact extends BaseModel {
    contactDetailId: number;
    collectionDetailId: string;
    referenceCollectionDetailId: string;
    referenceCollectionDetailName: string;
}