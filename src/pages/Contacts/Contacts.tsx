
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps'
import { Link } from 'react-router-dom'
import './Contacts.css'
const Contacts = () => {
  return (
    <div>

      <div className='Contacts_top'>
        <div className='map-box'>
          <h3 className='contacts_title'>Наш офис</h3>
          <YMaps>
            <div className='map'>
              <Map defaultState={{ center: [43.233413, 76.825989], zoom: 18 }} width={window.innerWidth <= 428 ? 345 : 722} height={window.innerWidth<=428? 177:424}>


                <Placemark geometry={[43.233413, 76.825989]} properties={{ balloonContent: 'Аксай-3а, 62ф, Алматы, Казахстан' }} />
                <GeolocationControl options={{ float: 'right', position: { top: '200px', right: '10px' } }} />
              </Map>
            </div>
          </YMaps>
          <div className='ContactsAddressDiv'>
            <img src="/imgs/address.png" alt="" />
            <div>
              <p className='contacts_address'>Аксай-3а, 62ф, Алматы, Казахстан</p>
              <p className='address_floor'>3 этаж 35 кабинет</p>
            </div>
          </div>
        </div>

      </div>
      <nav className='Contacts_nav'>
        <ul className='Contacts_ul'>
          <li><a href="#"><img src='/imgs/Whatsapp.png' alt="whatsapp" /></a></li>
          <li><a href="#"><img src="/imgs/VK.png" alt="vk" /></a></li>
          <li><a href="#"><img src="imgs/Instagram.png" alt="instaram" /></a></li>
          <li><a href="#"><img src='/imgs/Telegram.png' alt="telegram" /></a></li>
        </ul>
      </nav>
      <div className='Contacts_number'>
        <img src="/imgs/phone.svg" alt="" />
        <h4>+7 777 777 77 77</h4>
      </div>
      <div className='ContactsButtonContainer'>
      <Link to='/'><button className='ContactsButtonToMain'>На главную</button></Link>
      </div>
    </div>
  )
}

export default Contacts
