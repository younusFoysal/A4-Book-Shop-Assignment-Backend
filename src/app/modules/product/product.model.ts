import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const Productschema = new Schema<TProduct>({
  title: { type: String, required: [true, 'Title is required'], },
  author: { type: String, required: [true, 'Author is required'], },
  price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be a positive number'], },
  category: { type: String, enum: ["Fiction" , "Science" , "SelfDevelopment" , "Poetry" , "Religious"], required: [true, 'Category is required'], },
  description: { type: String, required: [true, 'Description is required'], },
  image: { type: String, required: [true, 'Image is required'], },
  rating: { type: Number, required: [true, 'Rating is required'], min: [0, 'Rating must be a positive number'], max: [5, 'Rating must be less than or equal to 5'], },
  quantity: { type: Number, required: [true, 'Quantity is required'], min: [0, 'Quantity must be a positive number'], },
  inStock: { type: Boolean, required: [true, 'InStock status is required'], },
}, { timestamps: true, versionKey: false });

export const ProductModel = model<TProduct>('Products', Productschema);
