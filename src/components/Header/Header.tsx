import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import NavigationMenu from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { firebase } from '../../firebase/firebase';
import styles from './Header.module.css';


interface HeaderProps {
    favoritedCount: number;
    isMobile:boolean;
}

const Header: React.FC<HeaderProps> = ({ favoritedCount, isMobile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleBack = () => {
        window.history.back(); // Go back in history
    };

    const handleSignOut = async () => {
        try {
            // Sign out the user
            await firebase.auth().signOut();
            // Navigate to login page or any other appropriate page
            navigate('/login');
        } catch (error: any) {
            // Handle sign out error
            console.error('Sign out error:', error.message);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            {isMobile && location.pathname !== '/' && (
                <button className={styles.backButton} onClick={handleBack}><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.99949 9L11 16.0003L9.00026 18L0 9L9.00026 0L11 1.99969L3.99949 9Z" fill="#101010" />
                </svg> Back</button>
            )}
            {isMobile && location.pathname === '/' && (
                <div className={styles.logo}><Link to='/' className='logoLink'>QPICK</Link></div>
            )}

            {/* Other header content */}
            {!isMobile &&
                <>
                    <div className={styles.logoAndNav}>
                        <div className={styles.logo}><Link to='/' className='logoLink'>QPICK</Link></div>
                        <nav>
                            <button
                                onClick={() => setNavOpen(!navOpen)}
                                className="nav-toggle"
                                aria-expanded={navOpen}
                            > <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.14286 2.1V18.9H12.8571V2.1H2.14286ZM1.07143 0H13.9286C14.2127 0 14.4853 0.110625 14.6862 0.307538C14.8871 0.504451 15 0.771523 15 1.05V19.95C15 20.2285 14.8871 20.4955 14.6862 20.6925C14.4853 20.8894 14.2127 21 13.9286 21H1.07143C0.787268 21 0.514746 20.8894 0.313814 20.6925C0.112883 20.4955 0 20.2285 0 19.95V1.05C0 0.771523 0.112883 0.504451 0.313814 0.307538C0.514746 0.110625 0.787268 0 1.07143 0ZM7.5 15.75C7.78416 15.75 8.05668 15.8606 8.25761 16.0575C8.45855 16.2545 8.57143 16.5215 8.57143 16.8C8.57143 17.0785 8.45855 17.3455 8.25761 17.5425C8.05668 17.7394 7.78416 17.85 7.5 17.85C7.21584 17.85 6.94332 17.7394 6.74239 17.5425C6.54145 17.3455 6.42857 17.0785 6.42857 16.8C6.42857 16.5215 6.54145 16.2545 6.74239 16.0575C6.94332 15.8606 7.21584 15.75 7.5 15.75V15.75Z" fill="#838383" />
                                </svg>
                                Выбрать модель телефона
                                {navOpen === true ?

                                    <svg width="8" height="5" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.37114e-07L10 5.25031L8.33255 7L5 3.49938L1.66745 7L-1.52963e-07 5.25031L5 4.37114e-07Z" fill="#1C1C27" /></svg>
                                    :
                                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L0 1.24978L1.33396 0L4 2.50044L6.66604 0L8 1.24978L4 5Z" fill="#101010" /></svg>

                                }
                                {/* &#9776; Menu icon */}
                            </button>
                            {navOpen ? <NavigationMenu isMobile={isMobile} /> : ''}
                        </nav>
                    </div>

                    <div className={styles.icons}>
                        <div className='iconPositionDiv'>
                            <Link to="/wishlist"
                                className="wishlist"


                            ><svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0009 1.65429C13.5848 -0.627558 17.5777 -0.551821 20.0669 1.90098C22.5551 4.35486 22.6409 8.2629 20.3265 10.812L10.9987 20L1.67308 10.812C-0.641281 8.2629 -0.554383 4.34837 1.93267 1.90098C4.42412 -0.548575 8.40935 -0.630804 11.0009 1.65429ZM18.5094 3.42979C16.8594 1.80469 14.1974 1.73869 12.4705 3.26425L11.002 4.56044L9.53243 3.26533C7.79996 1.73761 5.14351 1.80469 3.48914 3.43195C1.85017 5.04407 1.76767 7.62455 3.27795 9.32971L10.9998 16.937L18.7217 9.3308C20.233 7.62455 20.1505 5.04732 18.5094 3.42979Z" fill="#838383" /></svg>
                                {/* Heart icon */}
                                {favoritedCount > 0 && <span className="badge"><p>{favoritedCount}</p></span>}
                            </Link>
                        </div>

                        <div className='iconPositionDiv'>
                            <Link to="/cart"
                                className="cart"
                            >
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.60005 6.04602L0 2.50536L1.57079 0.959999L5.16972 4.50176H22.0898C22.2629 4.50175 22.4335 4.54153 22.5881 4.61792C22.7427 4.69432 22.8771 4.80522 22.9804 4.94177C23.0837 5.07832 23.1531 5.23674 23.1832 5.40439C23.2132 5.57203 23.203 5.74426 23.1533 5.90732L20.4891 14.6443C20.4205 14.8694 20.28 15.0667 20.0885 15.207C19.8969 15.3473 19.6644 15.423 19.4256 15.423H5.82024V17.6073H18.0313V19.7915H4.71014C4.41573 19.7915 4.13337 19.6764 3.92519 19.4716C3.717 19.2668 3.60005 18.989 3.60005 18.6994V6.04602ZM5.82024 6.68601V13.2388H18.5997L20.5979 6.68601H5.82024ZM5.26519 24.16C4.82357 24.16 4.40003 23.9874 4.08776 23.6802C3.77548 23.373 3.60005 22.9563 3.60005 22.5218C3.60005 22.0873 3.77548 21.6707 4.08776 21.3634C4.40003 21.0562 4.82357 20.8836 5.26519 20.8836C5.70682 20.8836 6.13035 21.0562 6.44263 21.3634C6.7549 21.6707 6.93034 22.0873 6.93034 22.5218C6.93034 22.9563 6.7549 23.373 6.44263 23.6802C6.13035 23.9874 5.70682 24.16 5.26519 24.16ZM18.5864 24.16C18.1447 24.16 17.7212 23.9874 17.4089 23.6802C17.0966 23.373 16.9212 22.9563 16.9212 22.5218C16.9212 22.0873 17.0966 21.6707 17.4089 21.3634C17.7212 21.0562 18.1447 20.8836 18.5864 20.8836C19.028 20.8836 19.4515 21.0562 19.7638 21.3634C20.0761 21.6707 20.2515 22.0873 20.2515 22.5218C20.2515 22.9563 20.0761 23.373 19.7638 23.6802C19.4515 23.9874 19.028 24.16 18.5864 24.16Z" fill="#838383" /></svg>
                                {/* Shopping cart icon */}

                                {cartCount > 0 && <span className="badge">{cartCount}</span>}
                            </Link>
                        </div>

                        <div className='iconPositionDiv'>
                            <Link to="/profile"
                                className="profile"
                                onClick={() => setProfileOpen(!profileOpen)}
                            >
                                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4536 18.5699C21.5302 18.7998 21.5888 19.0974 21.6249 19.4581C21.661 19.8187 21.679 19.5302 21.679 19.8909C21.679 20.2515 21.652 20.5942 21.6024 20.9188C21.5483 21.2434 21.4671 21.4868 21.3634 21.6536C21.2868 21.7618 21.0659 21.8745 20.7052 22.0008C20.3445 22.127 16.5801 23.2 11.2872 23.2C6.44978 23.2 2.28406 22.4155 1.62133 22.2668C0.958606 22.118 0.56187 21.9918 0.422111 21.8881C0.250794 21.7618 0.12456 21.3876 0.0434094 20.761C-0.037741 20.1298 -0.00618255 19.972 0.147102 18.9892C0.241777 18.4211 0.471703 17.9883 0.83688 17.6998C1.20657 17.4068 1.64388 17.1768 2.13979 17.01C2.64022 16.8387 4.95752 16.0407 5.4895 15.901C6.02149 15.7612 6.48585 15.5628 6.88259 15.3014C7.20719 15.103 7.45515 14.9091 7.63097 14.7243C7.8068 14.5394 7.93303 14.3546 8.00066 14.1698C8.06828 13.9849 8.10435 13.7956 8.10435 13.5927C8.10435 13.3943 8.09533 13.1779 8.08181 12.9435C8.05025 12.5738 7.93303 12.2898 7.72565 12.0914C7.51826 11.893 7.28834 11.6857 7.02234 11.4693C6.89611 11.3611 6.79242 11.2123 6.69774 11.0184C6.60307 10.8246 6.52192 10.6307 6.44528 10.4323C6.36863 10.2024 6.29199 9.96347 6.21535 9.72002C6.10715 9.68846 5.99895 9.63887 5.89075 9.55772C5.79607 9.48107 5.69689 9.37287 5.58869 9.23311C5.48049 9.09335 5.39032 8.89499 5.30917 8.6335C5.23253 8.37653 5.20548 8.13758 5.23253 7.9302C5.25507 7.72281 5.29564 7.54248 5.35876 7.3892C5.41737 7.21788 5.51205 7.06009 5.63828 6.90229C5.62475 6.32071 5.6518 5.73463 5.73295 5.14854C5.79156 4.65713 5.90427 4.13416 6.06657 3.57963C6.22887 3.02511 6.46331 2.52468 6.76988 2.08286C7.06292 1.66809 7.38752 1.32546 7.74819 1.05496C8.10886 0.784454 8.47404 0.572561 8.84372 0.419277C9.21341 0.265993 9.58309 0.162301 9.96179 0.0946755C10.336 0.0360668 10.7012 0 11.0573 0C11.4991 0 11.9319 0.0541003 12.3377 0.162301C12.7434 0.270501 13.1222 0.405752 13.4783 0.57707C13.83 0.748387 14.1501 0.93323 14.4206 1.14061C14.7001 1.348 14.921 1.55989 15.0923 1.77629C15.4755 2.2677 15.764 2.80871 15.9579 3.3993C16.1518 3.9899 16.287 4.54442 16.3591 5.06739C16.4538 5.68053 16.4899 6.29817 16.4764 6.91131C16.5846 6.96992 16.6702 7.06459 16.7288 7.19083C16.7874 7.29903 16.8415 7.43428 16.8776 7.6056C16.9137 7.77691 16.9182 7.97979 16.8866 8.22775C16.8415 8.55235 16.7649 8.80482 16.6702 8.99868C16.5665 9.19254 16.4583 9.34131 16.3366 9.44951C16.1968 9.57575 16.0526 9.6569 15.8993 9.70198C15.8407 9.94543 15.7686 10.1889 15.6919 10.4143C15.6153 10.6127 15.5251 10.811 15.4304 11.0004C15.3267 11.1942 15.2185 11.343 15.0968 11.4512C14.9571 11.5775 14.8308 11.6766 14.7046 11.7623C14.5783 11.8435 14.4747 11.9336 14.38 12.0238C14.2853 12.1185 14.2087 12.2267 14.1501 12.3574C14.0914 12.4881 14.0419 12.6459 14.0103 12.8308C13.9652 13.0607 13.9517 13.2951 13.9652 13.5341C13.9787 13.7685 14.0419 14.012 14.1501 14.2464C14.2583 14.4808 14.4341 14.7108 14.682 14.9272C14.9255 15.1436 15.2591 15.3329 15.6739 15.5042C16.0571 15.6575 16.4809 15.7928 16.9317 15.9055C17.3871 16.0227 19.2129 16.8072 19.6322 16.9695C20.0515 17.1318 20.4302 17.3346 20.7593 17.5781C21.0794 17.8486 21.3138 18.1687 21.4536 18.5699ZM11.2106 21.7032C11.2872 21.7032 11.4045 21.6536 11.5668 21.5545C11.7291 21.4508 11.8869 21.3381 12.0401 21.1983C12.1934 21.0585 12.3287 20.9188 12.4414 20.7835C12.5586 20.6438 12.6127 20.5401 12.6127 20.4589C12.6127 20.3642 12.5902 20.2065 12.5451 19.972C12.5 19.7421 12.4414 19.4851 12.3828 19.2146C12.3242 18.9351 12.2565 18.6646 12.1979 18.3941C12.1393 18.1236 12.0807 17.9072 12.0356 17.7359C12.1889 17.6096 12.3197 17.4789 12.4279 17.3346C12.5361 17.1859 12.5902 17.0371 12.5902 16.8838C12.5902 16.7576 12.5496 16.6358 12.4639 16.5051C12.3828 16.3743 12.2836 16.2661 12.1754 16.1715C12.0492 16.0633 11.9229 15.9551 11.7832 15.8469H10.6335C10.4803 15.9551 10.3495 16.0633 10.2413 16.1715C10.1466 16.2661 10.0655 16.3698 9.98884 16.4961C9.9122 16.6223 9.87163 16.7395 9.87163 16.8658C9.87163 16.9604 9.92573 17.0822 10.0429 17.2354C10.1602 17.3887 10.2999 17.5375 10.4667 17.6728C10.4216 17.8125 10.3585 18.0109 10.2819 18.2724C10.2052 18.5293 10.1331 18.8044 10.0655 19.0929C9.99786 19.3769 9.93474 19.6474 9.88064 19.8999C9.82654 20.1524 9.804 20.3372 9.804 20.4634C9.804 20.5401 9.8581 20.6483 9.97532 20.788C10.0925 20.9278 10.2278 21.0675 10.3901 21.2028C10.5524 21.3426 10.7102 21.4598 10.8635 21.559C11.0213 21.6491 11.1385 21.7032 11.2106 21.7032Z" fill="#838383" /></svg>
                                {/* Person icon */}
                            </Link>
                        </div>

                        {profileOpen && isLoggedIn && (
                            <div className="profile-dropdown">
                                <button className='profile-dropdown-btn-3' onClick={handleSignOut}>Выход</button>
                            </div>
                        )}
                        {profileOpen && !isLoggedIn && (
                            <div className="profile-dropdown">
                                <button className='profile-dropdown-btn-1'><Link to="/login">Войти</Link></button>
                                <button className='profile-dropdown-btn-2'><Link to="/register">Регистрация</Link></button>
                            </div>

                        )}

                    </div>
                </>}
            {isMobile &&
                <>
                    <div className={styles.burger_menu} onClick={toggleMenu}>
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H20V2.25H0V0ZM0 7.875H20V10.125H0V7.875ZM0 15.75H20V18H0V15.75Z" fill="#838383" />
                        </svg>
                    </div>
                    {isMenuOpen &&

                        <nav className={styles.menu}>
                            <ul>
                                <li>
                                    <button
                                        onClick={() => setNavOpen(!navOpen)}
                                        className="nav-toggle"
                                        id='nav-toggle_mobile'
                                        aria-expanded={navOpen}
                                    > <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.14286 2.1V18.9H12.8571V2.1H2.14286ZM1.07143 0H13.9286C14.2127 0 14.4853 0.110625 14.6862 0.307538C14.8871 0.504451 15 0.771523 15 1.05V19.95C15 20.2285 14.8871 20.4955 14.6862 20.6925C14.4853 20.8894 14.2127 21 13.9286 21H1.07143C0.787268 21 0.514746 20.8894 0.313814 20.6925C0.112883 20.4955 0 20.2285 0 19.95V1.05C0 0.771523 0.112883 0.504451 0.313814 0.307538C0.514746 0.110625 0.787268 0 1.07143 0ZM7.5 15.75C7.78416 15.75 8.05668 15.8606 8.25761 16.0575C8.45855 16.2544 8.57143 16.5215 8.57143 16.8C8.57143 17.0785 8.45855 17.3455 8.25761 17.5425C8.05668 17.7394 7.78416 17.85 7.5 17.85C7.21584 17.85 6.94332 17.7394 6.74239 17.5425C6.54145 17.3455 6.42857 17.0785 6.42857 16.8C6.42857 16.5215 6.54145 16.2544 6.74239 16.0575C6.94332 15.8606 7.21584 15.75 7.5 15.75Z" fill="#101010" />
                                        </svg>
                                        Выбрать модель телефона
                                        {navOpen === true ?

                                            <svg width="8" height="5" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.37114e-07L10 5.25031L8.33255 7L5 3.49938L1.66745 7L-1.52963e-07 5.25031L5 4.37114e-07Z" fill="#1C1C27" /></svg>
                                            :
                                            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5L0 1.24978L1.33396 0L4 2.50044L6.66604 0L8 1.24978L4 5Z" fill="#101010" /></svg>

                                        }
                                        {/* &#9776; Menu icon */}
                                        
                                    </button>
                                    {navOpen ? <NavigationMenu isMobile={isMobile}/> : ''}
                                </li>
                                <li className={styles.menu_ul_wishlist}>
                                    <Link to='/wishlist'>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.50061 1.15801C9.26233 -0.439291 11.9848 -0.386275 13.682 1.33069C15.3785 3.04841 15.437 5.78403 13.859 7.5684L7.49911 14L1.14073 7.5684C-0.437237 5.78403 -0.377988 3.04386 1.31773 1.33069C3.01645 -0.384003 5.73365 -0.441563 7.50061 1.15801ZM12.62 2.40085C11.495 1.26328 9.68007 1.21708 8.50259 2.28498L7.50136 3.19231L6.49938 2.28573C5.31816 1.21632 3.50694 1.26328 2.37896 2.40237C1.26148 3.53085 1.20523 5.33718 2.23496 6.5308L7.49986 11.8559L12.7648 6.53156C13.7952 5.33718 13.739 3.53312 12.62 2.40085Z" fill="#101010" />
                                        </svg>
                                        Избранное
                                    </Link>
                                </li>
                                <li className={styles.menu_ul_profile}>
                                    <Link to="/profile"
                                        className="profile"
                                        onClick={() => setProfileOpen(!profileOpen)}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.844 12.0064C14.8971 12.1551 14.9376 12.3475 14.9626 12.5806C14.9875 12.8138 15 12.6273 15 12.8605C15 13.0937 14.9813 13.3152 14.947 13.5251C14.9095 13.7349 14.8534 13.8923 14.7816 14.0002C14.7286 14.0702 14.5758 14.143 14.3262 14.2246C14.0767 14.3063 11.472 15 7.8098 15C4.46269 15 1.58037 14.4928 1.12182 14.3966C0.663272 14.3004 0.388766 14.2188 0.292065 14.1518C0.173528 14.0702 0.0861846 13.8282 0.0300355 13.423C-0.0261135 13.015 -0.00427779 12.9129 0.101782 12.2775C0.167289 11.9102 0.326378 11.6304 0.579049 11.4438C0.834839 11.2544 1.13742 11.1057 1.48055 10.9979C1.82681 10.8871 3.43017 10.3712 3.79826 10.2808C4.16635 10.1904 4.48765 10.0622 4.76215 9.89312C4.98675 9.76487 5.15832 9.63953 5.27997 9.52002C5.40163 9.40051 5.48897 9.281 5.53576 9.16148C5.58255 9.04197 5.60751 8.91955 5.60751 8.78838C5.60751 8.66012 5.60127 8.52021 5.59191 8.36864C5.57008 8.12962 5.48897 7.94598 5.34548 7.81772C5.20199 7.68947 5.0429 7.55538 4.85886 7.41547C4.77151 7.34551 4.69977 7.24932 4.63426 7.12398C4.56875 6.99864 4.5126 6.8733 4.45957 6.74504C4.40654 6.59639 4.35351 6.4419 4.30048 6.28449C4.22562 6.26409 4.15075 6.23202 4.07589 6.17956C4.01038 6.13 3.94175 6.06005 3.86689 5.96969C3.79202 5.87932 3.72964 5.75107 3.67349 5.58201C3.62046 5.41586 3.60174 5.26137 3.62046 5.12728C3.63605 4.9932 3.66413 4.8766 3.7078 4.7775C3.74835 4.66673 3.81386 4.56471 3.9012 4.46269C3.89184 4.08667 3.91056 3.70773 3.96671 3.3288C4.00726 3.01108 4.08525 2.67295 4.19754 2.31442C4.30984 1.95589 4.47205 1.63234 4.68417 1.34668C4.88693 1.07851 5.11153 0.856976 5.36108 0.682083C5.61063 0.50719 5.8633 0.37019 6.11909 0.271084C6.37488 0.171978 6.63067 0.104936 6.8927 0.0612126C7.15161 0.0233191 7.40428 0 7.65071 0C7.95641 0 8.25587 0.0349786 8.53662 0.104936C8.81736 0.174893 9.07939 0.26234 9.32583 0.373105C9.56914 0.483871 9.79062 0.603381 9.97778 0.737466C10.1712 0.871551 10.324 1.00855 10.4426 1.14846C10.7077 1.46619 10.9074 1.81597 11.0415 2.19782C11.1756 2.57967 11.2692 2.9382 11.3191 3.27633C11.3846 3.67276 11.4096 4.07209 11.4002 4.46852C11.4751 4.50641 11.5344 4.56763 11.5749 4.64924C11.6155 4.7192 11.6529 4.80665 11.6778 4.91741C11.7028 5.02818 11.7059 5.15935 11.6841 5.31967C11.6529 5.52954 11.5999 5.69277 11.5344 5.81811C11.4626 5.94345 11.3877 6.03964 11.3035 6.1096C11.2068 6.19122 11.107 6.24368 11.0009 6.27283C10.9604 6.43024 10.9105 6.58764 10.8574 6.73339C10.8044 6.86164 10.742 6.9899 10.6765 7.11232C10.6048 7.23766 10.5299 7.33385 10.4457 7.40381C10.349 7.48543 10.2616 7.54955 10.1743 7.60494C10.087 7.6574 10.0152 7.7157 9.9497 7.774C9.8842 7.83521 9.83117 7.90517 9.79062 7.9897C9.75006 8.07423 9.71575 8.17625 9.69391 8.29576C9.66272 8.44442 9.65336 8.596 9.66272 8.75049C9.67208 8.90206 9.71575 9.05946 9.79062 9.21104C9.86548 9.36261 9.98714 9.51127 10.1587 9.65119C10.3272 9.7911 10.558 9.91352 10.845 10.0243C11.1101 10.1234 11.4033 10.2108 11.7153 10.2837C12.0303 10.3595 13.2937 10.8667 13.5838 10.9716C13.8739 11.0766 14.1359 11.2077 14.3636 11.3651C14.5851 11.54 14.7473 11.747 14.844 12.0064ZM7.75677 14.0323C7.8098 14.0323 7.89091 14.0002 8.0032 13.9361C8.1155 13.869 8.22468 13.7962 8.33074 13.7058C8.4368 13.6154 8.53038 13.5251 8.60837 13.4376C8.68947 13.3473 8.7269 13.2802 8.7269 13.2277C8.7269 13.1665 8.7113 13.0645 8.68011 12.9129C8.64892 12.7643 8.60837 12.5981 8.56781 12.4232C8.52726 12.2425 8.48047 12.0676 8.43992 11.8927C8.39937 11.7178 8.35881 11.5779 8.32762 11.4672C8.43368 11.3855 8.52414 11.301 8.59901 11.2077C8.67387 11.1115 8.71131 11.0154 8.71131 10.9162C8.71131 10.8346 8.68323 10.7559 8.62396 10.6714C8.56781 10.5869 8.49919 10.5169 8.42432 10.4557C8.33698 10.3857 8.24964 10.3158 8.15293 10.2458H7.35749C7.25143 10.3158 7.16097 10.3857 7.0861 10.4557C7.02059 10.5169 6.96445 10.5839 6.91142 10.6656C6.85839 10.7472 6.83031 10.823 6.83031 10.9046C6.83031 10.9658 6.86774 11.0445 6.94885 11.1436C7.02995 11.2427 7.12665 11.3389 7.24207 11.4264C7.21088 11.5167 7.16721 11.645 7.11418 11.814C7.06115 11.9802 7.01124 12.158 6.96445 12.3445C6.91765 12.5282 6.87398 12.7031 6.83655 12.8663C6.79912 13.0295 6.78352 13.149 6.78352 13.2307C6.78352 13.2802 6.82095 13.3502 6.90206 13.4405C6.98316 13.5309 7.07674 13.6213 7.18904 13.7087C7.30134 13.7991 7.41052 13.8749 7.51658 13.939C7.62576 13.9973 7.70686 14.0323 7.75677 14.0323Z" fill="#101010" />
                                        </svg>
                                        {/* Person icon */}
                                        Profile
                                    </Link>
                                </li>
                                <li className={styles.menu_ul_contacts}>
                                    <Link to='/contacts'>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.305 6.40167C6.08695 7.7754 7.2246 8.91305 8.59833 9.695L9.335 8.66333C9.45346 8.49745 9.62862 8.38073 9.82734 8.33528C10.026 8.28982 10.2345 8.31878 10.4133 8.41667C11.5919 9.06077 12.8935 9.44815 14.2325 9.55333C14.4415 9.56989 14.6365 9.66461 14.7788 9.8186C14.921 9.97259 15 10.1745 15 10.3842V14.1025C15 14.3088 14.9235 14.5078 14.7853 14.661C14.6471 14.8142 14.4569 14.9106 14.2517 14.9317C13.81 14.9775 13.365 15 12.9167 15C5.78333 15 0 9.21667 0 2.08333C0 1.635 0.0225 1.19 0.0683333 0.748333C0.0893788 0.543081 0.18582 0.352934 0.338991 0.214695C0.492163 0.076456 0.691172 -4.44648e-05 0.8975 1.93894e-08H4.61583C4.82547 -2.62654e-05 5.02741 0.0789596 5.1814 0.221209C5.33539 0.363458 5.43011 0.55852 5.44667 0.7675C5.55185 2.10649 5.93923 3.40807 6.58333 4.58667C6.68122 4.76547 6.71018 4.97395 6.66472 5.17266C6.61927 5.37137 6.50255 5.54654 6.33667 5.665L5.305 6.40167ZM3.20333 5.85417L4.78667 4.72333C4.33732 3.75341 4.02946 2.72403 3.8725 1.66667H1.675C1.67 1.805 1.6675 1.94417 1.6675 2.08333C1.66667 8.29667 6.70333 13.3333 12.9167 13.3333C13.0558 13.3333 13.195 13.3308 13.3333 13.325V11.1275C12.276 10.9705 11.2466 10.6627 10.2767 10.2133L9.14583 11.7967C8.69055 11.6198 8.24834 11.4109 7.8225 11.1717L7.77417 11.1442C6.13965 10.2139 4.78607 8.86035 3.85583 7.22583L3.82833 7.1775C3.58909 6.75166 3.38024 6.30945 3.20333 5.85417Z" fill="#101010" />
                                        </svg> Контакты
                                    </Link>
                                </li>
                                <li className={styles.menu_ul_lang}>
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.4915 0C3.7995 0 0 3.808 0 8.5C0 13.192 3.7995 17 8.4915 17C13.192 17 17 13.192 17 8.5C17 3.808 13.192 0 8.4915 0ZM14.382 5.1H11.8745C11.6025 4.0375 11.2115 3.0175 10.7015 2.074C12.2655 2.6095 13.566 3.6975 14.382 5.1ZM8.5 1.734C9.2055 2.754 9.758 3.8845 10.1235 5.1H6.8765C7.242 3.8845 7.7945 2.754 8.5 1.734ZM1.921 10.2C1.785 9.656 1.7 9.0865 1.7 8.5C1.7 7.9135 1.785 7.344 1.921 6.8H4.794C4.726 7.361 4.675 7.922 4.675 8.5C4.675 9.078 4.726 9.639 4.794 10.2H1.921ZM2.618 11.9H5.1255C5.3975 12.9625 5.7885 13.9825 6.2985 14.926C4.7345 14.3905 3.434 13.311 2.618 11.9ZM5.1255 5.1H2.618C3.434 3.689 4.7345 2.6095 6.2985 2.074C5.7885 3.0175 5.3975 4.0375 5.1255 5.1ZM8.5 15.266C7.7945 14.246 7.242 13.1155 6.8765 11.9H10.1235C9.758 13.1155 9.2055 14.246 8.5 15.266ZM10.489 10.2H6.511C6.4345 9.639 6.375 9.078 6.375 8.5C6.375 7.922 6.4345 7.3525 6.511 6.8H10.489C10.5655 7.3525 10.625 7.922 10.625 8.5C10.625 9.078 10.5655 9.639 10.489 10.2ZM10.7015 14.926C11.2115 13.9825 11.6025 12.9625 11.8745 11.9H14.382C13.566 13.3025 12.2655 14.3905 10.7015 14.926ZM12.206 10.2C12.274 9.639 12.325 9.078 12.325 8.5C12.325 7.922 12.274 7.361 12.206 6.8H15.079C15.215 7.344 15.3 7.9135 15.3 8.5C15.3 9.0865 15.215 9.656 15.079 10.2H12.206Z" fill="#101010" />
                                    </svg>
                                    <p>Каз</p>
                                    <p>Рус</p>
                                    <p>Eng</p>
                                </li>
                                <li className={styles.menu_ul_terms}>
                                    <Link to='/uslovie'>
                                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.1667 17H0.833333C0.61232 17 0.400358 16.9104 0.244078 16.751C0.0877973 16.5916 0 16.3754 0 16.15V0.85C0 0.624566 0.0877973 0.408365 0.244078 0.248959C0.400358 0.0895533 0.61232 0 0.833333 0H14.1667C14.3877 0 14.5996 0.0895533 14.7559 0.248959C14.9122 0.408365 15 0.624566 15 0.85V16.15C15 16.3754 14.9122 16.5916 14.7559 16.751C14.5996 16.9104 14.3877 17 14.1667 17ZM13.3333 15.3V1.7H1.66667V15.3H13.3333ZM3.33333 3.4H6.66667V6.8H3.33333V3.4ZM3.33333 8.5H11.6667V10.2H3.33333V8.5ZM3.33333 11.9H11.6667V13.6H3.33333V11.9ZM8.33333 4.25H11.6667V5.95H8.33333V4.25Z" fill="#101010" />
                                        </svg>
                                        Условия сервиса
                                    </Link>
                                </li>
                            </ul>




                            <div >

                            </div>

                        </nav>

                    }
                </>
            }
        </header>
    );
};

export default Header;






