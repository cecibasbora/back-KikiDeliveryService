import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { DeliveryController } from '../deliverycontroller';
import { Delivery } from '../../entities/delivery';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let mockCreateDelivery: any;
  let mockGetDeliveries: any;
  let mockDeleteDelivery: any;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockCreateDelivery = {
      execute: vi.fn()
    };
    
    mockGetDeliveries = {
      execute: vi.fn()
    };

    mockDeleteDelivery = {
      execute: vi.fn()
    }

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    controller = new DeliveryController(mockCreateDelivery, mockGetDeliveries, mockDeleteDelivery);
  });

  describe('create()', () => {
    it('should create a delivery and return 201 status', () => {
      const testDelivery = new Delivery({
        id: '0001',
        customerName: 'Ursula',
        deliveryAddress: 'Rua da floresta, 231',
        deliveryDate: new Date(),
        userId: 'A82YDBO',
        isDeleted: false
      });
      
      mockRequest = { body: testDelivery };
      mockCreateDelivery.execute.mockReturnValue(testDelivery);

      controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockCreateDelivery.execute).toHaveBeenCalledWith(testDelivery);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(testDelivery);
    });
  });

  describe('getAll()', () => {
    it('should return deliveries for a user from route params', async () => {
    const testDeliveries = [
       new Delivery({
          id: '0005',
          customerName: 'Deleted',
          deliveryAddress: 'Rua deletada, 99',
          deliveryDate: new Date(),
          userId: '456',
          isDeleted: false
        })
      ];
    
      mockRequest = { params: { userId: '456' } };
      mockGetDeliveries.execute.mockResolvedValue(testDeliveries.filter(d => !d.isDeleted));

      await controller.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockGetDeliveries.execute).toHaveBeenCalledWith('456');
      expect(mockResponse.json).toHaveBeenCalledWith([testDeliveries[0]]);
    });
  });

  describe('deleteDelivery()', () => {
    it('should delete a delivery and return 204 status', async () => {
      const deliveryId = 'delivery-123';
      mockRequest = { params: { id: deliveryId } };
      
      await controller.delete(mockRequest as Request, mockResponse as Response);

      expect(mockDeleteDelivery.execute).toHaveBeenCalledWith(deliveryId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });
  });  
});