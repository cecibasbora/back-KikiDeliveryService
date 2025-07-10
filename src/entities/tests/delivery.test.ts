import { expect, test } from 'vitest'
import { Delivery } from '../delivery'

test('it should create a delivery', () => {
    const delivery = new Delivery({
        id: '0001',
        customerName: 'Ursula',
        deliveryAddress:'Rua da floresta, 231',
        deliveryDate: new Date(),
        userId: '0FDI85B'
    })
    expect(delivery).toBeInstanceOf(Delivery)
    expect(delivery.customerName).toEqual('Ursula')
})
