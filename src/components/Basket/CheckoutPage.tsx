import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Checkout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, deliveryOption } = location.state || {}

    const [itemsData, setItemsData] = useState<any[]>([])
    const [totalCost, setTotalCost] = useState<number>(0)
    const [customerPhone, setCustomerPhone] = useState<string>('')
    const [deliveryAddress, setDeliveryAddress] = useState({
        city: '',
        street: '',
        house: '',
        apartment: '',
        entrance: '',
    });
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

            const calculatedTotalCost = validItems.reduce((acc, item) => acc + item.totalCost, 0)
            setTotalCost(calculatedTotalCost)
        };

        fetchItemsData()
    }, [cartItems])

    const finalTotalCost = totalCost + (deliveryOption === 'courier' ? 499 : 0)

    const validateForm = () => {
        const newErrors: any = {}

        if (!deliveryAddress.city) newErrors.city = 'поле "город" не заполнено'
        if (!deliveryAddress.street) newErrors.street = 'поле "улица / Район" не заполнено'
        if (!deliveryAddress.house) newErrors.house = 'поле "дом" не заполнено'
        if (!deliveryAddress.apartment) newErrors.apartment = 'поле "квартира" не заполнено'
        if (!deliveryAddress.entrance) newErrors.entrance = 'поле "подезд" не заполнено'
        if (!customerPhone) newErrors.customerPhone = 'поле "номер получателя" не заполнено'

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    };

    const handleOrderSubmit = async () => {
        if (!validateForm()) {
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
            paymentStatus: 'pending',
            createdAt: new Date(),
            orderNumber 
        }

        try {
            await setDoc(doc(db, 'orders', orderId), orderData)
            alert('заказ успешно создан')
            navigate('/order-confirmation', { state: { orderId, orderNumber } });
        } catch (error) {
            console.error('ошибка при создании заказа:', error)
        }
    };

    return (
        <div>
            <h2>Оформление заказа</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                    <h3>Доставка курьером</h3>
                    <p>Адрес доставки</p>
                    <input
                        type="text"
                        placeholder="Город"
                        value={deliveryAddress.city}
                        onChange={e => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                    />
                    {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                    <input
                        type="text"
                        placeholder="Улица / Район"
                        value={deliveryAddress.street}
                        onChange={e => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                    />
                    {errors.street && <p style={{ color: 'red' }}>{errors.street}</p>}
                    <input
                        type="text"
                        placeholder="Дом"
                        value={deliveryAddress.house}
                        onChange={e => setDeliveryAddress({ ...deliveryAddress, house: e.target.value })}
                    />
                    {errors.house && <p style={{ color: 'red' }}>{errors.house}</p>}
                    <input
                        type="text"
                        placeholder="Подъезд"
                        value={deliveryAddress.entrance}
                        onChange={e => setDeliveryAddress({ ...deliveryAddress, entrance: e.target.value })}
                    />
                    {errors.entrance && <p style={{ color: 'red' }}>{errors.entrance}</p>}
                    <input
                        type="text"
                        placeholder="Квартира"
                        value={deliveryAddress.apartment}
                        onChange={e => setDeliveryAddress({ ...deliveryAddress, apartment: e.target.value })}
                    />
                    {errors.apartment && <p style={{ color: 'red' }}>{errors.apartment}</p>}
                </div>
                <div style={{ width: '48%' }}>
                    <h3>Ваш заказ</h3>
                    {itemsData.map((item, index) => (
                        <div key={index}>
                            <p> {item.quantity}х {item.name}   {item.totalCost} сом</p>
                        </div>
                    ))}
                    <p>{deliveryOption === 'courier' ? 'Доставка  499 сом' : 'Самовывоз - бесплатно'}</p>
                    <p>К оплате {finalTotalCost} сом</p>             
                    <h3>Способ оплаты</h3>
                    <div>
                        <button
                            className="mt-4 px-4 py-2 "
                            onClick={() => setShowQRCode(!showQRCode)}
                        >
                            Оплата на mBank
                        </button>
                        {showQRCode && (
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <h3>Отсканируйте QR код для оплаты</h3>
                                <img src="https://i.postimg.cc/LskL8FFD/qr-code.gif" alt="QR Code" />
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Номер получателя"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                    />
                    {errors.customerPhone && <p style={{ color: 'red' }}>{errors.customerPhone}</p>}
                    <button
                        className="mt-4 px-4 py-2  "
                        onClick={handleOrderSubmit}
                    >
                        Закончить оформление
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
