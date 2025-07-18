import { expect, test } from 'vitest'
import { Delivery } from '../delivery'

test('it should create a delivery', () => {
    const delivery = new Delivery({
        id: '0001',
        customerName: 'Ursula',
        deliveryAddress: 'Rua da floresta, 231',
        deliveryDate: new Date(),
        userId: '0FDI85B',
        isDeleted: false
    })
    
    expect(delivery).toBeInstanceOf(Delivery)
    expect(delivery.customerName).toEqual('Ursula')
    expect(delivery.isDeleted).toBe(false)
})

test('it should create a deleted delivery', () => {
    const delivery = new Delivery({
        id: '0002',
        customerName: 'Deleted User',
        deliveryAddress: '456 Deleted St',
        deliveryDate: new Date(),
        userId: 'DELETED1',
        isDeleted: true
    })
    
    expect(delivery).toBeInstanceOf(Delivery)
    expect(delivery.isDeleted).toBe(true)
})
