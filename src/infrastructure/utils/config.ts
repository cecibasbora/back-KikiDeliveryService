import { DeliveryController } from "../../interface/deliverycontroller";
import { CreateDelivery } from "../../application/use-cases/create-delivery";
import { RepositoryData } from "../repository";
import { GetDeliveries } from "../../application/use-cases/get-deliveries";


export function configureDependencies() {
    const deliveryRepository = new RepositoryData();
    const createDelivery = new CreateDelivery(deliveryRepository);
    const listAllDeliveries = new GetDeliveries(deliveryRepository);

    const deliveryController = new DeliveryController(createDelivery, listAllDeliveries);

    return {
        deliveryController
    }
}