import { IProduct } from '@/types/Product'
import { models, model, Schema, Types } from 'mongoose'

export interface IProductDocument extends Omit<IProduct, 'category'> {
    category: Types.ObjectId;
}

const ProductSchema = new Schema<IProductDocument>({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        minLength: [3, 'name most be gend then 3 characters']
    },

    sku: {
        type: String,
        required: [true, "SKU is required"],
        unique: true,
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "category is requited"],
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0.01, "Price must be a positive number"],
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        }
    },

    archived: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true, })


export const Product = models.Product || model<IProductDocument>('Product', ProductSchema);
