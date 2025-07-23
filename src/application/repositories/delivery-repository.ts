import { Delivery } from "../../entities/delivery"; 

export interface DeliveryRepository {
    save(delivery: Delivery): Promise<void>;
    findAll(): Promise<Array<Delivery>>;
    delete(id: string): Promise<void>;
    update(id: string, delivery: Partial<Delivery>): Promise<Delivery>;
}