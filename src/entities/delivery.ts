export interface DeliveryProps {
    id: string;
    customerName: string
    deliveryAddress: string
    deliveryDate: Date
}

export class Delivery {
  constructor(private readonly props: DeliveryProps) {}

  get id(): string { return this.props.id; }
  get customerName(): string { return this.props.customerName; }
  get deliveryAddress(): string { return this.props.deliveryAddress; }
  get deliveryDate(): Date { return this.props.deliveryDate; }
}