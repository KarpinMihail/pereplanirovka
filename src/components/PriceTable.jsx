import React from 'react';

const prices = [
    { service: "Узаконивание перепланировки", days: "от 10 дней", price: "от 10 000 ₽" },
    { service: "Межевание земельного участка", days: "от 5 дней", price: "от 8 000 ₽" },
    { service: "Технический план дома", days: "от 7 дней", price: "от 12 000 ₽" },
    { service: "Акт обследования", days: "от 3 дней", price: "от 5 000 ₽" }
];

export default function PriceTable() {
    return (
        <section className="section">
            <div className="container">
                <h2>Стоимость услуг</h2>
                <div className="discount-banner">
                    🎁 Скидка 10% при заказе двух объектов до 30 апреля 2026
                </div>
                <div className="price-table-wrapper">
                    <table className="price-table">
                        <thead>
                            <tr><th>Услуга</th><th>Срок</th><th>Цена</th></tr>
                        </thead>
                        <tbody>
                            {prices.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.service}</td>
                                    <td>{item.days}</td>
                                    <td><strong>{item.price}</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}