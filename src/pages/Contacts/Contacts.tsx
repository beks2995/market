import React from 'react'
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from 'react-yandex-maps'

const Contacts = () => {
  return (
    <div>

      <div className='Contacts_top'>
        <div className='map-box'>
          <h3 className='contacts_title'>Наш офис</h3>
          <YMaps apiKey='3b0cf7b3-13d7-418b-a62a-3be18ff25c06'>
            <div className='map'>
              <Map  defaultState={{ center: [43.233413, 76.825989], zoom: 18 }} width={722} height={424}>
  
         
                <Placemark geometry={[43.233413, 76.825989]} properties={{ balloonContent: 'Аксай-3а, 62ф, Алматы, Казахстан' }} />
                <GeolocationControl options={{ float: 'right', position:{top:'200px',right:'10px'} }} />
              </Map>
            </div>
          </YMaps>
          <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/imgs/address.svg" alt="" />
        <div  >
            <p className='contacts_address'>Аксай-3а, 62ф, Алматы, Казахстан</p>
            <p className='address_floor'>3 этаж 35 кабинет</p>
            </div>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="#"><img src='/imgs/Whatsapp.png' alt="" /></a></li>
            <li><a href="#"><img src="/imgs/VK.png" alt="" /></a></li>
            <li><a href="#"><img src="imgs/Instagram.png" alt="" /></a></li>
            <li><a href="#"><img src='/imgs/Telegram.png' alt="" /></a></li>
          </ul>
        </nav>
      </div>
      <div style={{display:'flex',gap:'28px'}} className='Contacts_number'>
        <img src="/imgs/phone.svg" alt="" />
        <h4>+7 777 777 77 77</h4>
      </div>
    </div>
  )
}

export default Contacts
