import { FC } from 'react';
import styles from './Footer.module.css'
import { Link } from 'react-router-dom';

interface FooterProps {
  isMobile: boolean;
}

const Footer: FC<FooterProps> = ({ isMobile }) => {
  return (
    <>
      {!isMobile && <div className={styles.footer_wrap}>
        <footer className={styles.footer}>

          <div className={styles.footer_left}>
            <div className={styles.footer_logo}><Link to="/" >QPICK</Link></div>
          </div>
          <div className={styles.footer_nav}>
            <div className={styles.footer_nav__left}>
              <Link to='/wishlist'>Избранное</Link>
              <Link to='/cart'>Корзина</Link>
              <Link to='/contacts'>Контакты</Link>
            </div>
            <div className={styles.footer_nav__right}>
              <button className={styles.terms_button}>
                <Link to='/uslovie'>
                  Условия сервиса
                </Link>
              </button>
              <div className={styles.language_switcher}>
                <i className={styles.globe_icon}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_0_1921)"><path d="M1.66675 10.0001C1.66675 14.6026 5.39758 18.3334 10.0001 18.3334C14.6026 18.3334 18.3334 14.6026 18.3334 10.0001C18.3334 5.39758 14.6026 1.66675 10.0001 1.66675C5.39758 1.66675 1.66675 5.39758 1.66675 10.0001Z" stroke="#838383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10.8335 1.7085C10.8335 1.7085 13.3335 5.00016 13.3335 10.0002C13.3335 15.0002 10.8335 18.2918 10.8335 18.2918" stroke="#838383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M9.16675 18.2918C9.16675 18.2918 6.66675 15.0002 6.66675 10.0002C6.66675 5.00016 9.16675 1.7085 9.16675 1.7085" stroke="#838383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M2.19165 12.9167H17.8083" stroke="#838383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M2.19165 7.0835H17.8083" stroke="#838383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></g><defs><clipPath id="clip0_0_1921"><rect width="20" height="20" fill="white" /></clipPath></defs></svg></i>
                <a>Каз</a>
                <a>Рус</a>
                <a>Eng</a>
              </div>
            </div>
          </div>
          <div className={styles.footer_right}>
            <a href="https://vk.com" target='_blank'>
              <img src="/footerIcons/VK.svg" alt="vk icon" />
            </a>
            <a href="https://www.instagram.com/qpick.kz/" target='_blank'>
              <img src="/footerIcons/Instagram.svg" alt="instagram icon" />
            </a>
            <a href="https://web.telegram.org" target='_blank'>
              <img src="/footerIcons/Telegram.svg" alt="telegram icon" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=77082748480&text=&type=phone_number&app_absent=0" target='_blank'>
              <img src="/footerIcons/Whatsapp.svg" alt="whatsapp icon" />
            </a>
          </div>
        </footer>
      </div>}
    </>

  );
};

export default Footer;
