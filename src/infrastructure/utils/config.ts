import { DeliveryController } from "../../interface/deliverycontroller";
import { CreateDelivery } from "../../application/use-cases/create-delivery";
import { RepositoryData } from "../repository";
import { GetDeliveries } from "../../application/use-cases/get-deliveries";
import { DeleteDelivery } from "../../application/use-cases/delete-delivery";
import { UpdateDelivery } from "../../application/use-cases/update-delivery";


export function configureDependencies() {
    const deliveryRepository = new RepositoryData();
    const createDelivery = new CreateDelivery(deliveryRepository);
    const listAllDeliveries = new GetDeliveries(deliveryRepository);
    const deleteDelivery = new DeleteDelivery(deliveryRepository);
    const updateDelivery = new UpdateDelivery(deliveryRepository)

    const deliveryController = new DeliveryController(createDelivery, listAllDeliveries, deleteDelivery, updateDelivery);

    return {
        deliveryController
    }
}