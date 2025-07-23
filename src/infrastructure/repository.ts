import { DeliveryRepository } from '../application/repositories/delivery-repository';
import { Delivery } from '../entities/delivery';
import { DeliveryModel } from './model';
import mongoose from 'mongoose';

export class RepositoryData implements DeliveryRepository {
    async save (delivery: Delivery): Promise<void> {
        const newDelivery = new DeliveryModel(delivery)
        await newDelivery.save();
    }

    async findAll (): Promise<Array<Delivery>> {
    const delivery = await DeliveryModel.find({ isDeleted: false });

    const translatedDelivery = delivery.map(item => {
        return {
            id: item._id.toString(),
            customerName: item.customerName,
            deliveryAddress: item.deliveryAddress,
            deliveryDate: item.deliveryDate,
            userId: item.userId,
        }
    }) as Array<Delivery>

    return translatedDelivery;
    }

    async delete (id: string): Promise <void> {
         const result = await DeliveryModel.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id),
            { 
                $set: {isDeleted: true}
            }
        );
    } 

    async update(id: string, delivery: Partial<Delivery>): Promise<Delivery> {
    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        { 
            $set: {
                customerName: delivery.customerName,
                deliveryAddress: delivery.deliveryAddress,
                deliveryDate: delivery.deliveryDate,
                userId: delivery.userId
            }
        },
        { new: true }
    );

    if (!updatedDelivery) {
        throw new Error('Delivery not found');
    }

    return new Delivery({
        id: updatedDelivery._id.toString(),
        customerName: updatedDelivery.customerName,
        deliveryAddress: updatedDelivery.deliveryAddress,
        deliveryDate: updatedDelivery.deliveryDate,
        userId: updatedDelivery.userId,
        isDeleted: false,
    });
}

}