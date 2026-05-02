import React, { useState } from 'react';
import Modal from './Modal';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const scrollToQuiz = () => {
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo-section">
                        <div className="logo-wrapper">
                            <img 
                                src="/images/kadastrovye-raboty-pod-klyuch.png.webp" 
                                alt="Логотип"
                                className="logo-img"
                            />
                            <span className="logo-text">Перепланировка и кадастр</span>
                        </div>
                        <button 
                            className="free-consult-header clickable"
                            onClick={scrollToQuiz}
                        >
                            консультация бесплатная
                        </button>
                        <div className="social-icons">
                            <a href="https://t.me/kadastr74_bot" className="social-icon-link telegram-link">
                                <img src="/images/logo_telegram.svg" alt="Telegram" className="social-icon-img" />
                            </a>
                            <a href="https://vk.com/kadastr74top" className="social-icon-link vk-link">
                                <img src="/images/logo_vk.svg" alt="ВКонтакте" className="social-icon-img" />
                            </a>
                        </div>
                    </div>
                    <div className="contact-block">
                        <a href="tel:+79507473434" className="phone">+7 (950) 747-34-33</a>
                        <button className="btn-consult" onClick={() => setIsModalOpen(true)}>
                            Записаться на консультацию
                        </button>
                    </div>
                </div>
            </header>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}