import { Request, Response } from 'express';
import { CreateDelivery } from '../application/use-cases/create-delivery';
import { GetDeliveries } from '../application/use-cases/get-deliveries';
import { Delivery } from '../entities/delivery';


export class DeliveryController {
  constructor(
    private createDelivery: CreateDelivery,
    private getDeliveries: GetDeliveries,
  ){}

  create(req: Request, res: Response) {
    const params: Delivery = req.body;
    const delivery = this.createDelivery.execute(params);
    res.status(201).json(delivery);
  }

  async getAll(req: Request, res: Response) {
    const userId = req.params.userId;
    const delivery = await this.getDeliveries.execute(userId);
    res.json(delivery);
  }
}