import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './HeaderAdminPanel.css';

const HeaderAdminPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error: any) {
            console.error('Sign out error:', error.message);
        }
    };

    const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setProfileOpen(!profileOpen);
    };

    return (
        <div className="header__admin-panel">
            <div className="container__admin">
                <div className="header__container">
                    <a href="#" className="header__admin-title">QPICK</a>
                    <div className='iconPositionDiv'>
                        <Link
                            to="/profile"
                            className="profile"
                            onClick={handleProfileClick}
                        >
                            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.4536 18.5699C21.5302 18.7998 21.5888 19.0974 21.6249 19.4581C21.661 19.8187 21.679 19.5302 21.679 19.8909C21.679 20.2515 21.652 20.5942 21.6024 20.9188C21.5483 21.2434 21.4671 21.4868 21.3634 21.6536C21.2868 21.7618 21.0659 21.8745 20.7052 22.0008C20.3445 22.127 16.5801 23.2 11.2872 23.2C6.44978 23.2 2.28406 22.4155 1.62133 22.2668C0.958606 22.118 0.56187 21.9918 0.422111 21.8881C0.250794 21.7618 0.12456 21.3876 0.0434094 20.761C-0.037741 20.1298 -0.00618255 19.972 0.147102 18.9892C0.241777 18.4211 0.471703 17.9883 0.83688 17.6998C1.20657 17.4068 1.64388 17.1768 2.13979 17.01C2.64022 16.8387 4.95752 16.0407 5.4895 15.901C6.02149 15.7612 6.48585 15.5628 6.88259 15.3014C7.20719 15.103 7.45515 14.9091 7.63097 14.7243C7.8068 14.5394 7.93303 14.3546 8.00066 14.1698C8.06828 13.9849 8.10435 13.7956 8.10435 13.5927C8.10435 13.3943 8.09533 13.1779 8.08181 12.9435C8.05025 12.5738 7.93303 12.2898 7.72565 12.0914C7.51826 11.893 7.28834 11.6857 7.02234 11.4693C6.89611 11.3611 6.79242 11.2123 6.69774 11.0184C6.60307 10.8246 6.52192 10.6307 6.44528 10.4323C6.36863 10.2024 6.29199 9.96347 6.21535 9.72002C6.10715 9.68846 5.99895 9.63887 5.89075 9.55772C5.79607 9.48107 5.69689 9.37287 5.58869 9.23311C5.48049 9.09335 5.39032 8.89499 5.30917 8.6335C5.23253 8.37653 5.20548 8.13758 5.23253 7.9302C5.25507 7.72281 5.29564 7.54248 5.35876 7.3892C5.41737 7.21788 5.51205 7.06009 5.63828 6.90229C5.62475 6.32071 5.6518 5.73463 5.73295 5.14854C5.79156 4.65713 5.90427 4.13416 6.06657 3.57963C6.22887 3.02511 6.46331 2.52468 6.76988 2.08286C7.06292 1.66809 7.38752 1.32546 7.74819 1.05496C8.10886 0.784454 8.47404 0.572561 8.84372 0.419277C9.21341 0.265993 9.58309 0.162301 9.96179 0.0946755C10.336 0.0360668 10.7012 0 11.0573 0C11.4991 0 11.9319 0.0541003 12.3377 0.162301C12.7434 0.270501 13.1222 0.405752 13.4783 0.57707C13.83 0.748387 14.1501 0.93323 14.4206 1.14061C14.7001 1.348 14.921 1.55989 15.0923 1.77629C15.4755 2.2677 15.764 2.80871 15.9579 3.3993C16.1518 3.9899 16.287 4.54442 16.3591 5.06739C16.4538 5.68053 16.4899 6.29817 16.4764 6.91131C16.5846 6.96992 16.6702 7.06459 16.7288 7.19083C16.7874 7.29903 16.8415 7.43428 16.8776 7.6056C16.9137 7.77691 16.9182 7.97979 16.8866 8.22775C16.8415 8.55235 16.7649 8.80482 16.6702 8.99868C16.5665 9.19254 16.4583 9.34131 16.3366 9.44951C16.1968 9.57575 16.0526 9.6569 15.8993 9.70198C15.8407 9.94543 15.7686 10.1889 15.6919 10.4143C15.6153 10.6127 15.5251 10.811 15.4304 11.0004C15.3267 11.1942 15.2185 11.343 15.0968 11.4512C14.9571 11.5775 14.8308 11.6766 14.7046 11.7623C14.5783 11.8435 14.4747 11.9336 14.38 12.0238C14.2853 12.1185 14.2087 12.2267 14.1501 12.3574C14.0914 12.4881 14.0419 12.6459 14.0103 12.8308C13.9652 13.0607 13.9517 13.2951 13.9652 13.5341C13.9787 13.7685 14.0419 14.012 14.1501 14.2464C14.2583 14.4808 14.4341 14.7108 14.682 14.9272C14.9255 15.1436 15.2591 15.3329 15.6739 15.5042C16.0571 15.6575 16.4809 15.7928 16.9317 15.9055C17.3871 16.0227 19.2129 16.8072 19.6322 16.9695C20.0515 17.1318 20.4302 17.3346 20.7593 17.5781C21.0794 17.8486 21.3138 18.1687 21.4536 18.5699ZM11.2106 21.7032C11.2872 21.7032 11.4045 21.6536 11.5668 21.5545C11.7291 21.4508 11.8869 21.3381 12.0401 21.1983C12.1934 21.0585 12.3287 20.9188 12.4414 20.7835C12.5586 20.6438 12.6127 20.5401 12.6127 20.4589C12.6127 20.3642 12.5902 20.2065 12.5451 19.972C12.5 19.7421 12.4414 19.4851 12.3828 19.2146C12.3242 18.9351 12.2565 18.6646 12.1979 18.3941C12.1393 18.1236 12.0807 17.9072 12.0356 17.7359C12.1889 17.6096 12.3197 17.4789 12.4279 17.3346C12.5361 17.1859 12.5902 17.0371 12.5902 16.8838C12.5902 16.7576 12.5496 16.6358 12.4639 16.5051C12.3828 16.3743 12.2836 16.2661 12.1754 16.1715C12.0492 16.0633 11.9229 15.9551 11.7832 15.8469H10.6335C10.4803 15.9551 10.3495 16.0633 10.2413 16.1715C10.1466 16.2661 10.0655 16.3698 9.98884 16.4961C9.9122 16.6223 9.87163 16.7395 9.87163 16.8658C9.87163 16.9604 9.92573 17.0822 10.0429 17.2354C10.1602 17.3887 10.2999 17.5375 10.4667 17.6728C10.4216 17.8125 10.3585 18.0109 10.2819 18.2724C10.2052 18.5293 10.1331 18.8044 10.0655 19.0929C9.99786 19.3769 9.93474 19.6474 9.88064 19.8999C9.82654 20.1524 9.804 20.3372 9.804 20.4634C9.804 20.5401 9.8581 20.6483 9.97532 20.788C10.0925 20.9278 10.2278 21.0675 10.3901 21.2028C10.5524 21.3426 10.7102 21.4598 10.8635 21.559C11.0213 21.6491 11.1385 21.7032 11.2106 21.7032Z" fill="#838383" />
                            </svg>
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
            </div>
        </div>
    );
}

export default HeaderAdminPanel;
