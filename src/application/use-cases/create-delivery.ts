// import { Delivery } from "../../entities/delivery";
// import { RepositoryData } from "../../infrastructure/repository";

// interface CreateDeliveryRequest {
//     id: string;
//     customerName: string;
//     deliveryAddress: string;
//     deliveryDate: Date;
// }

// type CreateDeliveryResponse = Delivery;

// export class CreateDelivery {
//     constructor(private repository: RepositoryData) {}

//     async execute({
//         id,
//         customerName,
//         deliveryAddress,
//         deliveryDate,
//     }: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
//         const delivery = new Delivery({
//             id,
//             customerName,
//             deliveryAddress,
//             deliveryDate,
//         });

//         await this.repository.save(delivery); 
//         return delivery;
//     }
// }

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