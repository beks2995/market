
import { db } from '../../../firebase/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useAuth from '../../../hooks/useAuth';
import './QuantityControl.css';

interface QuantityControlProps {
    itemId: string;
    quantity: number;
    onQuantityChange: (itemId: string, newQuantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ itemId, quantity, onQuantityChange }) => {
    const user = useAuth();

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                const currentCart = userDocSnap.data()?.cart || [];

                const updatedCart = currentCart.map((cartItem: any) => {
                    if (cartItem.itemId.id === itemId) {
                        return { ...cartItem, quantity: newQuantity };
                    }
                    return cartItem;
                });

                await updateDoc(userDocRef, { cart: updatedCart });
                onQuantityChange(itemId, newQuantity);

                console.log('Количество товаров обновлено');
            } catch (error) {
                console.error('Ошибка с счетчиком товаров: ', error);
            }
        }
    };

    const handleIncrement = () => handleUpdateQuantity(quantity + 1);
    const handleDecrement = () => {
        if (quantity > 1) {
            handleUpdateQuantity(quantity - 1);
        }
    };

    return (
        <div className="quantity-control">
            <button
                className={`quantity-control__button ${quantity <= 1 ? 'disabled' : ''}`}
                onClick={handleDecrement}
                disabled={quantity <= 1}
            >
                <img src="https://i.postimg.cc/6TxX1D5k/image.png" alt="-" />
            </button>
            <span className="quantity-control__count">{quantity}</span>
            <button
                className="quantity-control__button"
                onClick={handleIncrement}
            >
                <img src="https://i.postimg.cc/nLFHxbYZ/image.png" alt="+" />
            </button>
        </div>
    );
};

export default QuantityControl;
