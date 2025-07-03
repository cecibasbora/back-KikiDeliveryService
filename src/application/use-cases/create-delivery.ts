import { Delivery } from "../../entities/delivery";
import { RepositoryData } from "../../infrastructure/repository";

export class CreateDelivery {
    constructor(
        private deliveryRepository: RepositoryData,
    ){}

    execute(deliveryParams: Partial<Delivery>): Delivery {
        const delivery = {
            ...deliveryParams
        } as Delivery;

        this.deliveryRepository.save(delivery);
        return delivery;
    } 
}