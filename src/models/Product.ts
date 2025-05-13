
import mongoose, {Types} from 'mongoose';
import {Schema, model, models, Document} from 'mongoose';

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    category: {type: String, required: true},
    stockQuantity: {type: Number, required: true},
    }, {
    timestamps: true,
    });

    export interface IProduct extends Document {
        _id: Types.ObjectId; // MongoDB ObjectId
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        category: string;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
    }

    // Check if the model already exists, otherwise create it
export const Product = models.Product || model<IProduct>('Product', productSchema);