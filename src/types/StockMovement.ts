import { Types } from "mongoose";

export type MovementType = "IN" | "OUT";

export interface IStockMovement {
    product: string;
    type: MovementType;
    quantity: number;
    note?: string;
    createdAt: Date
}

export interface IStockMovementDocument extends Omit<IStockMovement, 'product'> {
    product: Types.ObjectId;
}