import React from 'react'
import { useLocation } from 'react-router-dom'
import './OrderConfirmation.css'

const OrderConfirmation: React.FC = () => {
    const location = useLocation()
    const { orderId, orderNumber } = location.state || {}

    if (!orderId) {
        return <div>Order ID not found.</div>
    }

    return (
        <div className="order-confirmation-finish">
            <div className="confirmation-message">
                <p className='confirmation-text'>Номер вашего заказа №{orderNumber}, с Вами свяжется наш менеджер.</p>
            </div>
        </div>
    )
}

export default OrderConfirmation
