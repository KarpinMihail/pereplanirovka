import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Колонка 1: Информация о компании */}
                    <div className="footer-col">
                        <div className="footer-logo-wrapper">
                            <img 
                                src="/images/kadastrovye-raboty-pod-klyuch.png.webp" 
                                alt="Логотип"
                                className="footer-logo-img"
                            />
                            <h4>Перепланировка и кадастр</h4>
                        </div>
                        <p>Кадастровый инженер Мария Карпина</p>
                        <p>Работаем с 2016 года, вхожу в Топ-5 кадастровых инженеров Челябинской области</p>
                    </div>

                    {/* Колонка 2: Адрес и режим работы */}
                    <div className="footer-col">
                        <h4>Контакты и адрес</h4>
                        <p>📍 Челябинск, ул. Энгельса 44д, офис 815, 8-й этаж</p>
                        <p>📅 понедельник - пятница: 10:00 - 18:00</p>
                        <p>📅 суббота - воскресенье: выходной</p>
                        <p>📞 <a href="tel:+79507473434">+7 (950) 747-34-34</a></p>
                    </div>

                    {/* Колонка 3: Соцсети и ОГРН */}
                    <div className="footer-col">
                        <h4>Свяжитесь с нами</h4>
                        <div className="footer-social">
                            <a 
                                href="https://t.me/Mariya_kadastr74" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Telegram"
                            >
                                <span className="social-icon">📱</span> Telegram
                            </a>
                            <a 
                                href="https://vk.com/kadastr74top" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="ВКонтакте"
                            >
                                <span className="social-icon">📘</span> ВКонтакте
                            </a>
                        </div>
                        <p className="ogrn">ОГРН 318745600232249</p>
                    </div>
                </div>

                {/* Юридические ссылки */}
                <div className="footer-links">
                    <a href="https://uralzemproekt.ru/politica.html" target="_blank" rel="noopener noreferrer" className="footer-link">
                        Политика конфиденциальности
                    </a>
                    <a href="https://uralzemproekt.ru/polzovatelskoe-soglashenie/" target="_blank" rel="noopener noreferrer" className="footer-link">
                        Пользовательское соглашение
                    </a>
                </div>

                {/* Копирайт */}
                <div className="footer-bottom">
                    <p>© 2016-2026, ИП Карпина М.Л. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}