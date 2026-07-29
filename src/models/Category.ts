import { ICategory } from '@/types/Category';
import { model, models, Schema } from 'mongoose';


const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, "Category name is required"],
        minLength: [3, "Category name must be at least 3 characters"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },

    archived: {
      type: Boolean,
      default: false,
    },

}, { timestamps: true })

export const Category = models.Category || model<ICategory>("Category", CategorySchema);