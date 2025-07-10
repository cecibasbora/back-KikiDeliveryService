import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { DeliveryModel } from '../model';
import dotenv from 'dotenv'
dotenv.config();

describe('DeliveryModel', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a delivery with required fields', async () => {
    const delivery = new DeliveryModel({
      customerName: 'Ursula',
      deliveryAddress: '123 Main St',
      deliveryDate: new Date(),
      userId: 'user123'
    });

    const savedDelivery = await delivery.save();
    
    expect(savedDelivery).toHaveProperty('_id');
    expect(savedDelivery.customerName).toBe('Ursula');
    expect(savedDelivery.deliveryAddress).toBe('123 Main St');
    expect(savedDelivery).toHaveProperty('deliveryDate');
    expect(savedDelivery.userId).toBe('user123');
  });

  it('should fail when required fields are missing', async () => {
    const delivery = new DeliveryModel({
    });

    await expect(delivery.save()).rejects.toThrow();
  });
});