
import {mongoose} from 'mongoose';
import {Schema, model, Document} from 'mongoose';

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
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        category: string;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
    }
    export const Product = model<IProduct>('Product', productSchema);