import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

const AdminOrderDetails: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>()
    const [order, setOrder] = useState<any>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                const orderDoc = await getDoc(doc(db, 'orders', orderId))
                if (orderDoc.exists()) {
                    setOrder({ id: orderDoc.id, ...orderDoc.data() })
                }
            }
        }

        fetchOrder()
    }, [orderId])

    if (!order) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Детали заказа</h2>
            <p>Номер заказа: {order.orderNumber}</p>
            <p>Дата: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
            <p>Общая сумма: {order.totalAmount} сом</p>
            <h3>Товары</h3>
            <ul>
                {order.cartItems.map((item: any, index: number) => (
                    <li key={index}>
                        <p>{item.quantity}x {item.name} - {item.price * item.quantity} сом</p>
                    </li>
                ))}
            </ul>
            <h3>Адрес доставки</h3>
            <p>Город: {order.deliveryAddress.city}</p>
            <p>Улица / Район: {order.deliveryAddress.street}</p>
            <p>Дом: {order.deliveryAddress.house}</p>
            <p>Подъезд: {order.deliveryAddress.entrance}</p>
            <p>Квартира: {order.deliveryAddress.apartment}</p>
            <h3>Контактный телефон</h3>
            <p>{order.customerPhone}</p>
            <h3>Статус оплаты</h3>
            <p>{order.paymentStatus}</p>
        </div>
    )
}

export default AdminOrderDetails
