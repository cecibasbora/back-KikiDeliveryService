import { describe, it, expect, vi } from 'vitest';
import { Delivery } from '../../entities/delivery';
import type { DeliveryRepository } from '../repositories/delivery-repository';

describe('DeliveryRepository', () => {

  const createTestDelivery = () => new Delivery({
    id: 'delivery-1',
    customerName: 'John Doe',
    deliveryAddress: '123 Main St',
    deliveryDate: new Date(),
    userId: 'user-123'
  });

  it('should save a delivery', async () => {
    const testDelivery = createTestDelivery();
    const repository: DeliveryRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findAll: vi.fn().mockResolvedValue([]),
    };

    await repository.save(testDelivery);
    expect(repository.save).toHaveBeenCalledWith(testDelivery);
  });

  it('should retrieve all deliveries', async () => {
    const testDelivery = createTestDelivery();
    const repository: DeliveryRepository = {
      save: vi.fn(),
      findAll: vi.fn().mockResolvedValue([testDelivery]),
    };

    const result = await repository.findAll();
    expect(result).toEqual([testDelivery]);
    expect(result[0].id).toBe('delivery-1');
    expect(result[0].customerName).toBe('John Doe');
  });
});