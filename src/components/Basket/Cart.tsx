import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firestore';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { Item } from '../../types/types';
import AddToCartButton from './AddToCartButton';

interface CartItem {
    itemId: string;
    quantity: number;
}

const Cart: React.FC = () => {
    const user = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemsData, setItemsData] = useState<Item[]>([]);

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
                    const itemDocRef = doc(db, 'items', cartItem.itemId);
                    const itemDocSnap = await getDoc(itemDocRef);
                    return itemDocSnap.exists() ? itemDocSnap.data() as Item : null;
                } else {
                    return null;
                }
            });

            const items = await Promise.all(itemsPromises);
            setItemsData(items.filter(item => item !== null) as Item[]);
        };

        fetchItemsData();
    }, [cartItems]);

    const handleRemoveFromCart = async (itemId: string) => {
        console.log('Attempting to remove item with itemId:', itemId);
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, {
                    cart: arrayRemove(itemId), // Передача значения для удаления из массива
                });
                console.log('Item removed from cart in Firestore');

                // Обновление состояния cartItems путем фильтрации элемента с совпадающим itemId
                setCartItems(prevCartItems =>
                    prevCartItems.filter(cartItem => cartItem.itemId !== itemId)
                );

                console.log('Товар удален из корзины');
            } catch (error) {
                console.error('Ошибка при удалении товара из корзины: ', error);
            }
        }
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
                                cartItems.find(cartItem => cartItem.itemId === item.id)?.quantity ?? 0
                            }</p>
                        </div>
                        <button
                            className="text-red-500"
                            onClick={() => {
                                if (item.id) {
                                    console.log('Attempting to remove item with id:', item.id);
                                    handleRemoveFromCart(item.id);
                                } else {
                                    console.log('Item id is undefined. Ignoring removal.');
                                }
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                ))
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </div>
    );
};

export default Cart;
