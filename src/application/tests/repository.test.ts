import { describe, it, expect, vi } from 'vitest';
import { Delivery } from '../../entities/delivery';
import type { DeliveryRepository } from '../repositories/delivery-repository';

describe('DeliveryRepository', () => {
  const createTestDelivery = (isDeleted = false) => new Delivery({
    id: 'delivery-1',
    customerName: 'John Doe',
    deliveryAddress: '123 Main St',
    deliveryDate: new Date(),
    userId: 'user-123',
    isDeleted
  });

  it('should save a delivery', async () => {
    const testDelivery = createTestDelivery();
    const repository: DeliveryRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findAll: vi.fn().mockResolvedValue([]),
      delete: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
    };

    await repository.save(testDelivery);
    expect(repository.save).toHaveBeenCalledWith(testDelivery);
  });

  it('should retrieve all deliveries', async () => {
    const testDelivery = createTestDelivery();
    const repository: DeliveryRepository = {
      save: vi.fn(),
      findAll: vi.fn().mockResolvedValue([testDelivery]),
      delete: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
    };

    const result = await repository.findAll();
    expect(result).toEqual([testDelivery]);
    expect(result[0].id).toBe('delivery-1');
    expect(result[0].customerName).toBe('John Doe');
  });

  it('should delete a delivery', async () => {
    const testDeliveryId = 'delivery-1';
    const repository: DeliveryRepository = {
      save: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn().mockResolvedValue(undefined),
      update: vi.fn(),
    };

    await repository.delete(testDeliveryId);
    expect(repository.delete).toHaveBeenCalledWith(testDeliveryId);
  });
});