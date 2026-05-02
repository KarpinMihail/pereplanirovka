import React from 'react';

const advantages = [
    {
        title: "Для каждого типа помещений — своя процедура",
        desc: "Квартира, нежилое помещение, частный дом — подберем оптимальный путь согласования"
    },
    {
        title: "Анализируем материал стен бесплатно",
        desc: "От материала стен зависит возможность узаконивания — проверим до заключения договора"
    },
    {
        title: "Нюансы ипотеки",
        desc: "Предупредим, какие банки берут плату за согласие, какие дольше оформляют"
    },
    {
        title: "Разные сроки и стоимость",
        desc: "Согласование и узаконивание — разные процессы, подберем оптимальный вариант"
    }
];

export default function Advantages() {
    return (
        <section className="advantages-section">
            <div className="container">
                <h2>Почему выбирают нас</h2>
                <div className="advantages-grid">
                    {advantages.map((item, idx) => (
                        <div key={idx} className="advantage-card">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}