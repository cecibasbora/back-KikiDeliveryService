import { DeliveryRepository } from "../repositories/delivery-repository";
import { Delivery } from "../../entities/delivery";

export class UpdateDelivery {
    constructor(private deliveryRepository: DeliveryRepository) {}

    async execute(id: string, updateData: Partial<Delivery>): Promise<Delivery> {
        return await this.deliveryRepository.update(id, updateData);
    }
}