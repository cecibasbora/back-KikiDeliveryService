import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { DeliveryController } from './deliverycontroller';
import { Delivery } from '../entities/delivery';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let mockCreateDelivery: any;
  let mockGetDeliveries: any;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockCreateDelivery = {
      execute: vi.fn()
    };
    
    mockGetDeliveries = {
      execute: vi.fn()
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    controller = new DeliveryController(mockCreateDelivery, mockGetDeliveries);
  });

  describe('create()', () => {
    it('should create a delivery and return 201 status', () => {
      const testDelivery = new Delivery({
        id: '0001',
        customerName: 'Ursula',
        deliveryAddress:'Rua da floresta, 231',
        deliveryDate: new Date()
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
    it('should return deliveries for a user', async () => {
      const testDeliveries = [
        new Delivery({
          id: '0003',
          customerName: 'Jiji',
          deliveryAddress:'Rua da padaria, 21',
          deliveryDate: new Date()
        })
      ];
      
      mockRequest = { params: { userId: '123' } };
      mockGetDeliveries.execute.mockResolvedValue(testDeliveries);

      await controller.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockGetDeliveries.execute).toHaveBeenCalledWith('123');
      expect(mockResponse.json).toHaveBeenCalledWith(testDeliveries);
    });
  });
});