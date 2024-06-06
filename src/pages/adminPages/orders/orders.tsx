import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
            <h2>Заказы</h2>
            <div>
                {orders.map((order) => (
                    <div key={order.id} className="order-summary" onClick={() => handleOrderClick(order.id)}>
                        <p>Номер заказа: {order.orderNumber}</p>
                        <p>Дата: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
                        <p>Общая сумма: {order.totalAmount} сом</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminOrders
