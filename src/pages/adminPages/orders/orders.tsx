import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './orders.css'

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersCollection = collection(db, 'orders')
            const ordersSnapshot = await getDocs(ordersCollection)
            const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setOrders(ordersList)
        }

        fetchOrders()
    }, [])

    const handleOrderClick = (orderId: string) => {
        navigate(`/admin/orders/${orderId}`)
    };

    return (
        <div>
            <div className='orders__container'>
                {orders.map((order) => (
                    <div key={order.id} className="orders-summary" onClick={() => handleOrderClick(order.id)}>
                        <p className='orders__number'>Номер заказа: {order.orderNumber}</p>
                        <p className='orders__number'>Дата: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
                        <p className='orders__number'>Общая сумма: {order.totalAmount} сом</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminOrders
