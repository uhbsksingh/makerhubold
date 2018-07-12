import { BaseModel } from "./base.model";
import { Collection } from "./collection/collection.model";
import { AppUser } from "./app-user.model";

export class Registration extends BaseModel {
    collectionDetail: Collection;
    appUserDetail: AppUser;
}