import React from 'react'
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps'

const Contacts = () => {
  return (
    <div>

      <div className='Contacts_top'>
        <div className='map-box'>
          <div>Hello</div>
          <h3 className='contacts_title'>Наш офис</h3>
          <YMaps>
            <div className='map'>
              <Map  defaultState={{ center: [43.233413, 76.825989], zoom: 18 }} width={722} height={424}>
  
         
                <Placemark geometry={[43.233413, 76.825989]} properties={{ balloonContent: 'Аксай-3а, 62ф, Алматы, Казахстан' }} />
                <GeolocationControl options={{ float: 'right', position:{top:'200px',right:'10px'} }} />
              </Map>
            </div>
          </YMaps>
          <div style={{ display: 'flex', alignItems: 'center', gap:'11px'}}>
        <img src="/imgs/address.png" alt="" />
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
