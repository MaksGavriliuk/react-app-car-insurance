import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Подключаем внешний CSS-файл для стилей

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            Наверх
        </button>
    );
}