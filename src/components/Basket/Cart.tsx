import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firestore';
import { doc, getDoc, updateDoc, DocumentReference } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { Item } from '../../types/types';
import QuantityControl from './QuantityControl';
import Delivery from './Delivery';

interface CartItem {
    itemId: DocumentReference;
    quantity: number;
}

const Cart: React.FC = () => {
    const user = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemsData, setItemsData] = useState<Item[]>([]);
    const [deliveryOption, setDeliveryOption] = useState('courier');

    useEffect(() => {
        const fetchCartItems = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setCartItems(userDocSnap.data()?.cart || []);
                }
            }
        };

        fetchCartItems();
    }, [user]);

    useEffect(() => {
        const fetchItemsData = async () => {
            const itemsPromises = cartItems.map(async (cartItem) => {
                if (cartItem.itemId) {
                    const itemDocSnap = await getDoc(cartItem.itemId);
                    if (itemDocSnap.exists()) {
                        return { ...itemDocSnap.data(), id: cartItem.itemId.id } as Item;
                    }
                }
                return null;
            });

            const items = await Promise.all(itemsPromises);
            setItemsData(items.filter(item => item !== null) as Item[]);
        };

        fetchItemsData();
    }, [cartItems]);

    const handleRemoveFromCart = async (itemId: string) => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef)
                const currentCart = userDocSnap.data()?.cart || []
                const updatedCart = currentCart.filter((item: CartItem) => item.itemId.id !== itemId)

                await updateDoc(userDocRef, {
                    cart: updatedCart,
                });

                setCartItems(updatedCart);

            } catch (error) {
                console.error('Ошибка при удалении товара из корзины: ', error);
            }
        }
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        setCartItems(prevCartItems => 
            prevCartItems.map(cartItem => 
                cartItem.itemId.id === itemId 
                ? { ...cartItem, quantity: newQuantity } 
                : cartItem
            )
        );
    };

    const handleDeliveryChange = (option: string) => {
        setDeliveryOption(option);
    };

    const handleCheckout = () => {
        const serializableCartItems = cartItems.map(cartItem => ({
            itemId: cartItem.itemId.id, 
            quantity: cartItem.quantity,
        }));
    
        navigate('/checkout', { state: { cartItems: serializableCartItems, deliveryOption } });
    };

    return (
        <div>
            <h2>Корзина</h2>
            {itemsData.length > 0 ? (
                itemsData.map((item, index) => (
                    <div key={index} className="flex justify-between p-4 border-b">
                        <div>
                            <h3>{item.name}</h3>
                            <p>{item.price} т</p>
                            <p>Количество: {
                                <QuantityControl
                                    itemId={item.id}
                                    quantity={cartItems.find(cartItem => cartItem.itemId.id === item.id)?.quantity ?? 0}
                                    onQuantityChange={handleQuantityChange}
                                />
                            }</p>
                        </div>
                        <button
                            className="text-red-500"
                            onClick={() => handleRemoveFromCart(item.id)}
                        >
                            Удалить
                        </button>
                    </div>
                ))
            ) : (
                <p>Ваша корзина пуста</p>
            )}
            {itemsData.length > 0 && (
                <>
                    <Delivery onDeliveryChange={handleDeliveryChange} />
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleCheckout}>
                        Перейти к оформлению
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
