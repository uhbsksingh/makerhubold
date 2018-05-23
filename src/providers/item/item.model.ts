import { BaseModel } from "../base.model";

export class Item extends BaseModel {
    itemDetailId: number;
    itemName: string;
    height: string;
    weight: string;
    itemQuantity: number;
    tags: string
}