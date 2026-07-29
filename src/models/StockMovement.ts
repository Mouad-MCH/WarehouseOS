import { IStockMovementDocument } from '@/types/StockMovement';
import { model, models, Schema } from 'mongoose';


const StockMovementSchema = new Schema<IStockMovementDocument>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "Product is required"]
    },

    type: {
        type: String,
        enum: {
            values: ['IN', 'OUT'],
            message: "Type must be either IN or OUT",
        },
        required: [true, 'Movement type is required']
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be integer",
        }
    },

    note: {
        type: String,
        trim: true,
    }

}, { timestamps: { createdAt: true, updatedAt: false } });

export const StockMovement = models.StockMovement || model<IStockMovementDocument>("StockMovement", StockMovementSchema);
