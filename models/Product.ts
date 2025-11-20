import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, enum: [], default: [] },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    offer: { type: String, default: null },
    weight: {
      type: String,
      enum: ['500 جرام', '1000 جرام', '250 جرام'],
      default: ['500 جرام'],
    },
    category: {
      type: String,
      enum: [
        'كل التصنيفات',
        'العروض',
        'العسل العضوي',
        'خلطات العسل',
        'منتجات الخلية',
        'منتجات المزرعة',
      ],
      default: ['كل التصنيفات'],
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
