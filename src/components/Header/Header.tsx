import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import NavigationMenu from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { firebase } from '../../firebase/firebase';
import styles from './Header.module.css';

interface HeaderProps{
    favoritedCount:number;
}

const Header: React.FC<HeaderProps> = ({favoritedCount}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0)
    // const [wishlistCount, setWishlistCount] = useState(0)

    // useEffect(() => {
    //     // Add Firebase auth state change listener
    //     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //         setIsLoggedIn(!!user); // Update logged-in state based on user object
    //     });

    //     // Cleanup function
    //     return () => {
    //         unsubscribe(); // Unsubscribe from auth state changes when component unmounts
    //     };
    // }, []);
    // useEffect(() => {
    //     // Add Firebase auth state change listener
    //     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //         setIsLoggedIn(!!user); // Update logged-in state based on user object
    //     });

    //     // Fetch cart and wishlist counts from the database
    //     const fetchCounts = async () => {
    //         // Replace the below logic with your data fetching logic
    //         const cartSnapshot = await firebase.firestore().collection('headphones').get();
    //         const wishlistSnapshot = await firebase.firestore().collection('wishlist').get();

    //         setCartCount(cartSnapshot.size);
    //         setWishlistCount(wishlistSnapshot.size);
    //     };

    //     fetchCounts();

    //     // Cleanup function
    //     return () => {
    //         unsubscribe(); // Unsubscribe from auth state changes when component unmounts
    //     };
    // }, []);

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

    return (
        <header className={styles.header}>
            <div className={styles.logoAndNav}>
                <div className={styles.logo}><Link to="/" className='logoLink'>QPICK</Link></div>
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
                    {navOpen ? <NavigationMenu /> : ''}
                </nav>
            </div>
            <div className="icons">
                <div className='iconPositionDiv'>
                    <Link to="/wishlist"
                        className="wishlist"
                        

                    ><svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0009 1.65429C13.5848 -0.627558 17.5777 -0.551821 20.0669 1.90098C22.5551 4.35486 22.6409 8.2629 20.3265 10.812L10.9987 20L1.67308 10.812C-0.641281 8.2629 -0.554383 4.34837 1.93267 1.90098C4.42412 -0.548575 8.40935 -0.630804 11.0009 1.65429ZM18.5094 3.42979C16.8594 1.80469 14.1974 1.73869 12.4705 3.26425L11.002 4.56044L9.53243 3.26533C7.79996 1.73761 5.14351 1.80469 3.48914 3.43195C1.85017 5.04407 1.76767 7.62455 3.27795 9.32971L10.9998 16.937L18.7217 9.3308C20.233 7.62455 20.1505 5.04732 18.5094 3.42979Z" fill="#838383" /></svg>
                        {/* Heart icon */}
                        <span className="badge"><p>{favoritedCount}</p></span>
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
        </header>
    );
};

export default Header;
