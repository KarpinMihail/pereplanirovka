import React from 'react';

const bonuses = [
    { icon: "🚚", title: "Бесплатная доставка", desc: "Доставим документы до любого адреса в пределах города" },
    { icon: "📋", title: "Чек-лист", desc: "Как правильно узаконить перепланировку?" },
    { icon: "💰", title: "Скидка 10%", desc: "при заказе двух объектов" }
];

export default function Bonus() {
    return (
        <section className="bonus-section">
            <div className="container">
                <h2>После ответов на вопросы вы получите</h2>
                <div className="bonus-grid">
                    {bonuses.map((item, idx) => (
                        <div key={idx} className="bonus-card">
                            <div className="bonus-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}