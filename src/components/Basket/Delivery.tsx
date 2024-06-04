import React, { useEffect, useState, useRef } from 'react';

interface DeliveryProps {
    onDeliveryChange: (option: string) => void
}

const Delivery: React.FC<DeliveryProps> = ({ onDeliveryChange }) => {
    const [deliveryOption, setDeliveryOption] = useState('courier')
    const mapRef = useRef<HTMLDivElement | null>(null)

    const handleDeliveryChange = (option: string) => {
        setDeliveryOption(option);
        onDeliveryChange(option);
    };

    useEffect(() => {
        handleDeliveryChange('courier')
    }, [])

    useEffect(() => {
        if (mapRef.current && window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 42.88026059336971,  lng:  74.58884497026457 }, 
                zoom: 12,
            })

            new window.google.maps.Marker({
                position: { lat: 42.88026059336971, lng: 74.58884497026457 }, 
                map: map,
                title: "Метка",
            })
        }
    }, [])

    return (
        <div>
            <h3>Доставка</h3>
            <div ref={mapRef} style={{ height: '300px', width: '300px', marginTop: '20px' }}></div>
            <div className="flex items-center">
                <label className="ml-2">Доставка курьером - 499 т</label>
            </div>
        </div>
    )
}

export default Delivery
