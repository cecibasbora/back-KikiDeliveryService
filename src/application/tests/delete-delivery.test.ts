import { describe, it, expect, vi } from 'vitest';
import { DeleteDelivery } from '../use-cases/delete-delivery';
import type { DeliveryRepository } from '../repositories/delivery-repository';

describe('DeleteDeliveryUseCase', () => {
  it('should delete a delivery successfully', async () => {
    const testDeliveryId = 'delivery-1';
    const mockRepository: DeliveryRepository = {
      save: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn().mockResolvedValue(undefined),
      update: vi.fn(),
    };

    const useCase = new DeleteDelivery(mockRepository);
    await useCase.execute(testDeliveryId);

    expect(mockRepository.delete).toHaveBeenCalledWith(testDeliveryId);
  });
});