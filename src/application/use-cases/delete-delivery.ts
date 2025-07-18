import { DeliveryRepository } from "../repositories/delivery-repository";

export class DeleteDelivery {
    constructor(private deliveryRepository: DeliveryRepository) {}

    async execute(id: string): Promise<void> {
        await this.deliveryRepository.delete(id);
    }
}