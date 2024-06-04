    import React from 'react';
    import { ShoppingCartIcon } from '@heroicons/react/24/outline';
    import { db } from '../../firebase/firestore';
    import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
    import useAuth from '../../hooks/useAuth';

    interface AddToCartButtonProps {
        itemId: string;
    }

    const AddToCartButton: React.FC<AddToCartButtonProps> = ({ itemId }) => {
        const user = useAuth();

        const handleAddToCart = async () => {
            if (!user) {
                console.error('Пользователь не авторизован');
                return;
            }

            if (!itemId) {
                console.error('Не удалось добавить товар в корзину: не указан ID товара');
                return;
            }

            try {
                const itemDocRef = doc(db, 'items', itemId);
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, {
                    cart: arrayUnion({ itemId: itemDocRef, quantity: 1 }),
                });
                console.log('Товар добавлен в корзину');
            } catch (error) {
                console.error('Ошибка при добавлении товара в корзину: ', error);
            }
        };

        return (
            <button
                className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleAddToCart}
            >
                <ShoppingCartIcon className="h-6 mr-2" />
                <span>Добавить в корзину</span>
            </button>
        );
    };

    export default AddToCartButton;
