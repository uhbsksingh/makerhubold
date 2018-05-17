import { DateTime } from "ionic-angular";
import { BaseModel } from "../base.model";

export class Deal extends BaseModel {
    AliasName: string;
    CreatedByCollectionDetailId: string;
    Tags: string;
    CreatedDateTime: DateTime;
    UpdatedDateTime: DateTime;
}