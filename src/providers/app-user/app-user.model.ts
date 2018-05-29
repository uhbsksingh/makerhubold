import { BaseModel } from "../base.model";
import { Collection } from "../collection/collection.model";

export class AppUser extends BaseModel {
    appUserDetailId: number;
    externalId: string;
    appUserName: string;
    firstName: string;
    lastName: string;
    appUserMobile: string;
    profileImageUrl: string;

    appUserCollections: Collection[];
}