import { Delivery } from "../../entities/delivery"; 

export interface DeliveryRepository {
    save(delivery: Delivery): Promise<void>;
    findAll(): Promise<Array<Delivery>>;
}