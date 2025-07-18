import { Request, Response } from 'express';
import { CreateDelivery } from '../application/use-cases/create-delivery';
import { GetDeliveries } from '../application/use-cases/get-deliveries';
import { Delivery } from '../entities/delivery';
import { DeleteDelivery } from '../application/use-cases/delete-delivery';


export class DeliveryController {
  constructor(
    private createDelivery: CreateDelivery,
    private getDeliveries: GetDeliveries,
    private deleteDelivery: DeleteDelivery
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

  async delete(req: Request, res:Response) {
    const id = req.params.id;
    const delivery = await this.deleteDelivery.execute(id);
    res.status(204).json(delivery); 
}
}
