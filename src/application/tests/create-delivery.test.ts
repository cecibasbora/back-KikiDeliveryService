import { describe, it, expect, vi } from 'vitest';
import { CreateDelivery } from '../use-cases/create-delivery';

describe('CreateDelivery', () => {
  const mockDeliveryProps = {
    id: 'delivery-1',
    customerName: 'John Doe',
    deliveryAddress: '123 Main St',
    deliveryDate: new Date(),
    userId: 'user-123',
    isDeleted: false
  };

  const createMockRepository = () => ({
    save: vi.fn(),
    findAll: vi.fn().mockResolvedValue([]),
    delete: vi.fn(),
    update: vi.fn(),
  });

  it('should create and save a delivery with complete params', () => {
    const mockRepository = createMockRepository();
    const createDelivery = new CreateDelivery(mockRepository);

    const result = createDelivery.execute(mockDeliveryProps);

    expect(result.id).toBe('delivery-1');
  });

  it('should create a delivery with partial params', () => {
    const mockRepository = createMockRepository();
    const createDelivery = new CreateDelivery(mockRepository);
    const partialParams = {
      customerName: 'Jane Doe',
      deliveryAddress: '456 Oak Ave'
    };

    const result = createDelivery.execute(partialParams);
    expect(result.customerName).toBe('Jane Doe');
  });

  it('should call repository save method', () => {
    const mockRepository = createMockRepository();
    const createDelivery = new CreateDelivery(mockRepository);

    createDelivery.execute(mockDeliveryProps);

    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});