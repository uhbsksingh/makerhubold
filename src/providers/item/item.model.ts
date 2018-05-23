import { BaseModel } from "../base.model";

export class Item extends BaseModel {
    itemDetailId: number;
    itemName: string;
    height: string;
    weight: string;
    itemQuantity: number;
    tags: string;
    itemImages: ImageDetail[];
}

export class ImageDetail {
    imageId: number;
    imageUrl: string;
    caption: string;
    mimeType: string;
}