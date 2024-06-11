import React from 'react';
import { db } from '../../../firebase/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useAuth from '../../../hooks/useAuth';

interface QuantityControlProps {
    itemId: string,
    quantity: number,
    onQuantityChange: (itemId: string, newQuantity: number) => void,
}

const QuantityControl: React.FC<QuantityControlProps> = ({ itemId, quantity, onQuantityChange }) => {
    const user = useAuth()

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid)
                const userDocSnap = await getDoc(userDocRef)
                const currentCart = userDocSnap.data()?.cart || []

                const updatedCart = currentCart.map((cartItem: any) => {
                    if (cartItem.itemId.id === itemId) {
                        return { ...cartItem, quantity: newQuantity }
                    }
                    return cartItem;
                });

                await updateDoc(userDocRef, { cart: updatedCart })
                onQuantityChange(itemId, newQuantity);

                console.log('количество товаров обновлено');
            } catch (error) {
                console.error('ошибка с счетчиком товаров: ', error)
            }
        }
    }

    const handleIncrement = () => handleUpdateQuantity(quantity + 1)
    const handleDecrement = () => {
        if (quantity > 1) {
            handleUpdateQuantity(quantity - 1)
        }
    }

    return (
        <div className="flex items-center">
            <button
                className={`px-2 py-1 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'text-blue-500'}`}
                onClick={handleDecrement}
                disabled={quantity <= 1}
            >
                -
            </button>
            <span className="px-4">{quantity}</span>
            <button
                className="px-2 py-1 text-blue-500"
                onClick={handleIncrement}
            >
                +
            </button>
        </div>
    )
}

export default QuantityControl

