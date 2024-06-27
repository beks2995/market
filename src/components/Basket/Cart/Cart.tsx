import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firestore';
import { doc, getDoc, updateDoc, DocumentReference } from 'firebase/firestore';
import useAuth from '../../../hooks/useAuth';
import QuantityControl from '../QuantityControl/QuantityControl';
import Delivery from '../Delivery/Delivery';
import './Cart.css'
import { Link } from 'react-router-dom';


export interface CartItem {
    itemId: DocumentReference;
    quantity: number;
}

export interface Device {
    name: string;
    price: any;
    priceWithDiscount: any;
    images: string;
    description: string;
    stock: number;
}

export interface Item {
    id: string;
    name: string;
    price: number;
    images: string;
}

const Cart: React.FC = () => {
    const user = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemsData, setItemsData] = useState<Item[]>([]);
    const [deliveryOption, setDeliveryOption] = useState('courier');
    const [total, setTotal] = useState(0);

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

    useEffect(() => {
        const totalPrice = itemsData.reduce((acc, item) => {
            const cartItem = cartItems.find(cartItem => cartItem.itemId.id === item.id);
            return acc + (item.price * (cartItem?.quantity ?? 0));
        }, 0);
        setTotal(totalPrice);
    }, [itemsData, cartItems]);

    const handleRemoveFromCart = async (itemId: string) => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                const currentCart = userDocSnap.data()?.cart || [];
                const updatedCart = currentCart.filter((item: CartItem) => item.itemId.id !== itemId);

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
        <div className='cart__section'>
            {itemsData.length > 0 ? (
                <>
                    <div className="cart__items-and-delivery">
                        <h2 className='cart__title'>Корзина</h2>
                        {itemsData.map((item, index) => (
                            <div className="cart__product-blok">
                                <div key={index} className="cart__product">
                                    <div className='cart__product-view'>
                                        <img src={item.images} alt={item.name} className='cart__item-img-block' />
                                        <p>{
                                            <QuantityControl
                                                itemId={item.id}
                                                quantity={cartItems.find(cartItem => cartItem.itemId.id === item.id)?.quantity ?? 0}
                                                onQuantityChange={handleQuantityChange}
                                            />
                                        }</p>
                                    </div>
                                    <div className="cart__items-info">
                                        <h3 className='cart__item-name'>{item.name}</h3>
                                        <p className='cart__item-price'>{item.price} сом</p>
                                    </div>
                                </div>
                                <div className="cart__delete-cost">
                                    <button
                                        className="text-red-500"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        <img className='cart__delete-img' src="https://i.postimg.cc/t4MLSsRK/Vector-2.png" alt="delete" />
                                    </button>
                                    <p className='cart__item-price-cost'>{item.price} сом</p>
                                </div>
                            </div>
                        ))}
                        <Delivery onDeliveryChange={handleDeliveryChange} />
                    </div>
                    <div className="cart__total">
                        <div className="cart__total-full">
                            <span className='cart__total-title'>ИТОГО</span>
                            <span className='cart__total-sum'>{total + 499} сом</span>
                        </div>
                        <button className="cart__total-rout" onClick={handleCheckout}>
                            Перейти к оформлению
                        </button>
                    </div>
                </>
            ) : (
                <div className='cart__empty-section'>
                    <img className='cart__empty-img' src="https://i.postimg.cc/4ysxPwt8/Illustration.png" alt="img" />
                    <h2 className='cart__empty-title'>Корзина пуста</h2>
                    <span className='cart__empty-span'>Но это никогда не поздно исправить :)</span>
                    <Link to="/" className="cart__home-link">В каталог товаров</Link>
                </div>
            )}
        </div>
    );

};

export default Cart;
