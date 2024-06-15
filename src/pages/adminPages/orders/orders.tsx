import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firestore';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './orders.css'

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = collection(db, 'orders')
                const ordersSnapshot = await getDocs(ordersCollection)
                const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setOrders(ordersList)
            } catch (error) {
                console.error('Ошибка в запросе:', error)
            }
        }

        fetchOrders()
    }, [])

    const handleOrderClick = (orderId: string) => {
        navigate(`/admin/orders/${orderId}`)
    }

    const markOrderAsViewed = async (orderId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        try {
            const orderRef = doc(db, 'orders', orderId)
            await updateDoc(orderRef, {
                viewed: true
            })
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, viewed: true } : order
                )
            )
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    const deleteOrder = async (orderId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
            try {
                const orderRef = doc(db, 'orders', orderId)
                await deleteDoc(orderRef)
                setOrders(prevOrders =>
                    prevOrders.filter(order => order.id !== orderId)
                )
                alert('Заказ успешно удален')
            } catch (error) {
                console.error('Ошибка в удалении заказа:', error)
            }
        }
    };

    return (
        <div>
            <div className='orders__container'>
                {orders.map((order) => (
                    <div key={order.id} className={`orders-summary ${order.viewed ? 'viewed' : ''}`} onClick={() => handleOrderClick(order.id)}>
                        <p className='orders__number'>Номер заказа: {order.orderNumber}</p>
                        <p className='orders__number'>Дата: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
                        <p className='orders__number'>Общая сумма: {order.totalAmount} сом</p>
                        <p className='orders__viewed'>{order.viewed ? 'Заказ просмотрен' : 'Заказ не просмотрен'}</p> 
                        <div className='orders__actions'>
                            {!order.viewed && (
                                <button type="button" onClick={(event) => markOrderAsViewed(order.id, event)}>Пометить как просмотренный</button>
                            )}
                            <button type="button" onClick={(event) => deleteOrder(order.id, event)}>Удалить заказ</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminOrders
