import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const DeliveryModel = mongoose.model('Delivery', DeliverySchema);