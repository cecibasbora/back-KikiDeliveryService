import { describe, it, expect, vi } from 'vitest';
import { GetDeliveries } from '../use-cases/get-deliveries';
import type { DeliveryRepository } from '../repositories/delivery-repository';
import { Delivery } from '../../entities/delivery';

describe('GetDeliveries', () => {
  const mockDelivery = (userId: string, isDeleted = false) => 
    new Delivery({
      id: 'del-1',
      customerName: 'Test',
      deliveryAddress: '123 St',
      deliveryDate: new Date(),
      userId,
      isDeleted
    });

  it('returns filtered deliveries for specific user', async () => {
    const testDeliveries = [
      mockDelivery('user-1'),
      mockDelivery('user-2'),
      mockDelivery('user-1')
    ];
    
    const mockRepo: DeliveryRepository = {
      findAll: vi.fn().mockResolvedValue(testDeliveries),
      save: vi.fn(),
      delete: vi.fn()
    };

    const result = await new GetDeliveries(mockRepo).execute('user-1');
    
    expect(result).toEqual([
      testDeliveries[0],
      testDeliveries[2]
    ]);
    expect(mockRepo.findAll).toHaveBeenCalledOnce();
  });

  it('returns empty array when no deliveries exist for user', async () => {
    const testDeliveries = [
      mockDelivery('user-2'),
      mockDelivery('user-3')
    ];
    
    const mockRepo: DeliveryRepository = {
      findAll: vi.fn().mockResolvedValue(testDeliveries),
      save: vi.fn(),
      delete: vi.fn()
    };

    const result = await new GetDeliveries(mockRepo).execute('user-1');
    
    expect(result).toEqual([]);
  });

  it('handles empty repository case', async () => {
    const mockRepo: DeliveryRepository = {
      findAll: vi.fn().mockResolvedValue([]),
      save: vi.fn(),
      delete: vi.fn()
    };

    const result = await new GetDeliveries(mockRepo).execute('any-user');
    
    expect(result).toEqual([]);
  });
});