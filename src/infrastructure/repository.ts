import { DeliveryRepository } from '../application/repositories/delivery-repository';
import { Delivery } from '../entities/delivery';
import { DeliveryModel } from './model';

export class RepositoryData implements DeliveryRepository {
    async save (delivery: Delivery): Promise<void> {
        const newDelivery = new DeliveryModel(delivery)
        await newDelivery.save();
    }

    async findAll (): Promise<Array<Delivery>> {
    const delivery = await DeliveryModel.find();

    const translatedDelivery = delivery.map(item => {
        return {
            id: item._id.toString(),
            customerName: item.customerName,
            deliveryAddress: item.deliveryAddress,
            deliveryDate: item.deliveryDate,
            userId: item.userId
        }
    }) as Array<Delivery>

    return translatedDelivery;
    }
}