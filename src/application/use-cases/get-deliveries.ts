import { DeliveryRepository } from "../repositories/delivery-repository";
import { Delivery } from "../../entities/delivery";

export class GetDeliveries {
    constructor(
        private deliveryRepository: DeliveryRepository
    ) {}

    async execute(userId: string): Promise<Array<Delivery>> {
        const allDelivery = await this.deliveryRepository.findAll();
        const deliveryByUser = allDelivery.filter(delivery => delivery.userId === userId);
        return allDelivery;
    }
}