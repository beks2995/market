import React, { useEffect, useState, useRef } from 'react';
import './Delivery.css';

interface DeliveryProps {
    onDeliveryChange: (option: string) => void;
}

const Delivery: React.FC<DeliveryProps> = ({ onDeliveryChange }) => {
    const [deliveryOption, setDeliveryOption] = useState('courier');
    const mapRef = useRef<HTMLDivElement | null>(null);

    const handleDeliveryChange = (option: string) => {
        setDeliveryOption(option);
        onDeliveryChange(option);
    };

    useEffect(() => {
        handleDeliveryChange('courier');
    }, []);

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

    return (
        <div className="delivery">
            <h3 className="delivery__title">Доставка</h3>
            <div ref={mapRef} className="delivery__map"></div>
            <div className="delivery__options">
                <div className="delivery__block">
                    <p className='delivery__text'><img 
                    src='https://i.postimg.cc/vTMGX48r/Vector-3.png' alt='car'
                        onChange={() => handleDeliveryChange('courier')}
                    />Доставка курьером - 499 т</p>
                    <img src="https://i.postimg.cc/BQ24kcPx/Vector-4.png" alt="" className="delivery__img" />
                    </div>
                    <p className="delivery__cost-text">499 сом</p>
            </div>
        </div>
    );
};

export default Delivery;
