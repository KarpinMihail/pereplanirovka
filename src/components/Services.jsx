import React from 'react';

const servicesList = [
    { icon: "🏠", title: "Узаконить перепланировку", desc: "Квартира, жилой/нежилой дом" },
    { icon: "📐", title: "Межевание участков", desc: "Оформление земли в собственность" },
    { icon: "📄", title: "Технический план", desc: "Для садового или жилого дома" },
    { icon: "✅", title: "Акт обследования", desc: "Для сноса или строительства" }
];

export default function Services() {
    return (
        <section className="section">
            <div className="container">
                <h2>Что мы сделаем для вас</h2>
                <div className="services-grid">
                    {servicesList.map((service, idx) => (
                        <div key={idx} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}