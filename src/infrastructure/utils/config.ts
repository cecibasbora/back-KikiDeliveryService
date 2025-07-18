import { DeliveryController } from "../../interface/deliverycontroller";
import { CreateDelivery } from "../../application/use-cases/create-delivery";
import { RepositoryData } from "../repository";
import { GetDeliveries } from "../../application/use-cases/get-deliveries";
import { DeleteDelivery } from "../../application/use-cases/delete-delivery";


export function configureDependencies() {
    const deliveryRepository = new RepositoryData();
    const createDelivery = new CreateDelivery(deliveryRepository);
    const listAllDeliveries = new GetDeliveries(deliveryRepository);
    const deleteDelivery = new DeleteDelivery(deliveryRepository);

    const deliveryController = new DeliveryController(createDelivery, listAllDeliveries, deleteDelivery);

    return {
        deliveryController
    }
}