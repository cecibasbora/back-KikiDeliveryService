
import { describe, it, expect, vi } from 'vitest';
import { GetDeliveries } from '../use-cases/get-deliveries';
import type { DeliveryRepository } from '../repositories/delivery-repository';
import { Delivery } from '../../entities/delivery';

describe('GetDeliveries', () => {
  const mockDelivery = (userId: string) => 
    new Delivery({
      id: 'del-1',
      customerName: 'Test',
      deliveryAddress: '123 St',
      deliveryDate: new Date(),
      userId
    });

  it('returns all deliveries from repository', async () => {
    const testDeliveries = [mockDelivery('user-1'), mockDelivery('user-2')];
    const mockRepo: DeliveryRepository = {
      findAll: vi.fn().mockResolvedValue(testDeliveries),
      save: vi.fn()
    };

    const result = await new GetDeliveries(mockRepo).execute('user-1');
    
    expect(result).toEqual(testDeliveries);
    expect(mockRepo.findAll).toHaveBeenCalledOnce();
  });

  it('handles empty repository case', async () => {
    const mockRepo: DeliveryRepository = {
      findAll: vi.fn().mockResolvedValue([]),
      save: vi.fn()
    };

    const result = await new GetDeliveries(mockRepo).execute('any-user');
    
    expect(result).toEqual([]);
  });
});