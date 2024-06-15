import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import './OrderDetailsPage.css'

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
        <div className='details__container'>
            <h2 className='details__title'>Детали заказа</h2>
            <p className='details__text'>Номер заказа: {order.orderNumber}</p>
            <p className='details__text'>Дата: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
            <p className='details__text'>Общая сумма: {order.totalAmount} сом</p>
            <h3 className='details__title'>Товары</h3>
            <ul>
                {order.cartItems.map((item: any, index: number) => (
                    <li className='details__li' key={index}>
                        <p className='details__text'>{item.quantity}x {item.name} - {item.price * item.quantity} сом</p>
                    </li>
                ))}
            </ul>
            <h3 className='details__title'>Адрес доставки</h3>
            <p className='details__text'>Город: {order.deliveryAddress.city}</p>
            <p className='details__text'>Улица / Район: {order.deliveryAddress.street}</p>
            <p className='details__text'>Дом: {order.deliveryAddress.house}</p>
            <p className='details__text'>Подъезд: {order.deliveryAddress.entrance}</p>
            <p className='details__text'>Квартира: {order.deliveryAddress.apartment}</p>
            <h3 className='details__title'>Контактный телефон</h3>
            <p className='details__text'>{order.customerPhone}</p>
            <h3 className='details__title'>Статус оплаты</h3>
            <p className='details__text'>{order.paymentStatus}</p>
        </div>
    )
}

export default AdminOrderDetails
