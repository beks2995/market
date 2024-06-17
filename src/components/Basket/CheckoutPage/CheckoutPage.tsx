import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './CheckoutPage.css';

const Checkout: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, deliveryOption } = location.state || {}

    const [itemsData, setItemsData] = useState<any[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [customerPhone, setCustomerPhone] = useState<string>('');
    const [deliveryAddress, setDeliveryAddress] = useState({
        city: '',
        street: '',
        house: '',
        apartment: '',
        entrance: '',
    })
    const [showQRCode, setShowQRCode] = useState<boolean>(false)
    const [orderId, setOrderId] = useState<string>('')
    const [orderNumber, setOrderNumber] = useState<string>('')
    const [errors, setErrors] = useState<any>({})

    useEffect(() => {
        const generateOrderId = () => {
            const newOrderId = `order_${Date.now()}`
            setOrderId(newOrderId)
            const newOrderNumber = `${Math.floor(100000 + Math.random() * 900000)}`
            setOrderNumber(newOrderNumber)
        };

        generateOrderId();

        const fetchItemsData = async () => {
            const itemsPromises = cartItems.map(async (cartItem: any) => {
                const itemDocSnap = await getDoc(doc(db, 'items', cartItem.itemId))
                if (itemDocSnap.exists()) {
                    const itemData = itemDocSnap.data()
                    const itemTotalCost = itemData.price * cartItem.quantity;
                    return { ...itemData, id: cartItem.itemId, quantity: cartItem.quantity, totalCost: itemTotalCost }
                }
                return null;
            });

            const items = await Promise.all(itemsPromises);
            const validItems = items.filter(item => item !== null) as any[]
            setItemsData(validItems)

            const calculatedTotalCost = validItems.reduce((acc, item) => acc + item.totalCost, 0);
            setTotalCost(calculatedTotalCost);
        };

        fetchItemsData();
    }, [cartItems]);

    useEffect(() => {
        if (mapRef.current && window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 42.88026059336971, lng: 74.58884497026457 },
                zoom: 12,
            });

            new window.google.maps.Marker({
                position: { lat: 42.88026059336971, lng: 74.58884497026457 },
                map: map,
                title: "Метка",
            });
        }
    }, []);

    const finalTotalCost = totalCost + (deliveryOption === 'courier' ? 499 : 0)

    const handleOrderSubmit = async () => {
        if (!customerPhone || !deliveryAddress.city || !deliveryAddress.street || !deliveryAddress.house) {
            alert('Все поля должны быть заполнены!')
            return
        }

        const orderData = {
            cartItems: itemsData.map(item => ({
                itemId: item.id,
                quantity: item.quantity,
                price: item.price,
                name: item.name
            })),
            deliveryOption,
            totalAmount: finalTotalCost,
            customerPhone,
            deliveryAddress,
            paymentStatus: 'Оплачено',
            createdAt: new Date(),
            orderNumber,
            viewed: false
        }

        try {
            await setDoc(doc(db, 'orders', orderId), orderData)
            alert('Заказ успешно создан')
            navigate('/order-confirmation', { state: { orderId, orderNumber } });
        } catch (error) {
            console.error('Ошибка при создании заказа:', error)
        }
    };

    return (
        <div className='order'>
            <div className='order__container'>
                <h2 className='order__title'>Оформление заказа</h2>
                <div className='order__decoration'>
                    <div className="order__decoration-container">
                        <div className="order__decoration-block">
                            <div className="order__title-block">
                                <h3 className='order__decoration-title'>Доставка курьером</h3>
                                <span className="order__delivery">499 сом</span>
                            </div>
                            <div ref={mapRef} className="order__decoration-map"></div>
                            <p className='order__decoration-description'><img src="https://i.postimg.cc/1zS2Ht9k/Vector-2.png" alt="location" />Адрес доставки</p>
                            <div className="order__decoration-container-inputs">
                                <div className="order__decoration-container-input">
                                    <div className="order__decoration-input">
                                        <input
                                            className='order__decoration-city'
                                            type="text"
                                            placeholder="Город"
                                            value={deliveryAddress.city}
                                            onChange={e => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                                        />
                                        <span className='order__decoration-span'>
                                            <img src="https://i.postimg.cc/sg0dVyyq/Vector-3.png" alt="arrow" className="order__decoration-img" />
                                        </span>
                                        {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                                    </div>
                                    <div className="order__decoration-input">
                                        <input
                                            className='order__decoration-city'
                                            type="text"
                                            placeholder="Улица / Район"
                                            value={deliveryAddress.street}
                                            onChange={e => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                                        />
                                        <span className='order__decoration-span'>
                                            <img src="https://i.postimg.cc/mDfGf2bS/Vector-4.png" alt="arrow" className="order__decoration-img" />
                                        </span>
                                    </div>
                                </div>
                                <div className="order__decoration-home-block">
                                    <div className="order__decoration-home-block-first">
                                        <div className="order__decoration-home-input">
                                            <input
                                                className="order__decoration-home"
                                                type="text"
                                                placeholder="Дом"
                                                value={deliveryAddress.house}
                                                onChange={e => setDeliveryAddress({ ...deliveryAddress, house: e.target.value })}
                                            />
                                            <span className="order__decoration-home-span">
                                                <img src="https://i.postimg.cc/mDfGf2bS/Vector-4.png" alt="arrow" className="order__decoration-home-img" />
                                            </span>
                                        </div>
                                        <div className="order__decoration-home-input">
                                            <input
                                                className="order__decoration-home"
                                                type="text"
                                                placeholder="Квартира"
                                                value={deliveryAddress.apartment}
                                                onChange={e => setDeliveryAddress({ ...deliveryAddress, apartment: e.target.value })}
                                            />
                                            <span className="order__decoration-home-span">
                                                <img src="https://i.postimg.cc/mDfGf2bS/Vector-4.png" alt="arrow" className="order__decoration-home-img" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="order__decoration-home-input">
                                        <input
                                            className="order__decoration-home"
                                            type="text"
                                            placeholder="Подъезд"
                                            value={deliveryAddress.entrance}
                                            onChange={e => setDeliveryAddress({ ...deliveryAddress, entrance: e.target.value })}
                                        />
                                        <span className="order__decoration-home-span-p">
                                            <img src="https://i.postimg.cc/mDfGf2bS/Vector-4.png" alt="arrow" className="order__decoration-home-img" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='order__info'>
                        <div className="order__info-container">
                            <div className="order__info-your">
                                <h3 className='order__info-your-title'>Ваш заказ</h3>
                                <div className="order__info-your-product-card">
                                    {itemsData.map((item, index) => (
                                        <div className='order__info-your-product' key={index}>
                                            <p className='order__info-your-text-block'> <span className='order-info-your-text'>{item.quantity}х</span> {item.name}</p> <p className='order-info-your-text'>{item.totalCost} сом</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="order__info-your-total">
                                    <p className='order__info-your-delivery'>{deliveryOption === 'courier' ? 'Доставка' : 'Самовывоз - бесплатно'} <span className='order__info-your-span'>499 сом</span></p>
                                    <p className='order__info-your-delivery'>К оплате<span> {finalTotalCost} сом</span></p>
                                </div>
                            </div>
                            <div className="order__payment">
                                <div className="order__payment-total">
                                    <div className="order__payment-container">
                                        <h3 className='order__payment-title'>Способ оплаты</h3>
                                        <div className='order__payment-block'>
                                            <button
                                                className="order__payment-btn"
                                                onClick={() => setShowQRCode(!showQRCode)}
                                            >
                                                <img src="https://i.postimg.cc/Gtj01vzc/Vector-5.png" alt="visa" />
                                                Оплата на mBank
                                            </button>
                                            <img src="https://i.postimg.cc/sg0dVyyq/Vector-3.png" alt="" />
                                        </div>
                                    </div>
                                    {showQRCode && (
                                        <div className='order__payment-qr'>
                                            <img src="https://i.postimg.cc/LskL8FFD/qr-code.gif" alt="QR Code" />
                                        </div>
                                    )}
                                    <div className="order__payment-block">
                                        <button
                                            className="order__payment-btn-promo"
                                        >
                                            <img src="https://i.postimg.cc/1Xbv2X19/Vector-6.png" alt="pazle" />
                                            Есть промокод?
                                        </button>
                                        <img src="https://i.postimg.cc/YCRsqp1x/Vector-7.png" alt="arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="order__number-comfirm">
                                <h3 className="order__number-title">Номер получателя</h3>
                                <div className="order__number">
                                    <input
                                        className='order__number-input'
                                        type="text"
                                        placeholder="+996 _ _ _ _"
                                        value={customerPhone}
                                        onChange={e => setCustomerPhone(e.target.value)}
                                    />
                                    <span className='order__number-span'>
                                        <img src="https://i.postimg.cc/mDfGf2bS/Vector-4.png" alt="arrow" className="order__decoration-img" />
                                    </span>
                                </div>
                            </div>
                            <button
                                className="order__finish"
                                onClick={handleOrderSubmit}
                            >
                                Закончить оформление
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
