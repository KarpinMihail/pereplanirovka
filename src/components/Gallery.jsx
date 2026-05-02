import React, { useState } from 'react';

// Замените URL на свои реальные изображения
const images = [
    {
        url: "https://via.placeholder.com/400x300/2e7d32/white?text=Перепланировка+1",
        title: "Объединение ванной и туалета",
        description: "Квартира на Ленина, 45"
    },
    {
        url: "https://via.placeholder.com/400x300/00897b/white?text=Перепланировка+2",
        title: "Снос несущей стены",
        description: "ЖК «Алые паруса»"
    },
    {
        url: "https://via.placeholder.com/400x300/ff9800/white?text=Перепланировка+3",
        title: "Расширение кухни-гостиной",
        description: "Дом на Северо-Западе"
    },
    {
        url: "https://via.placeholder.com/400x300/2e7d32/white?text=Перепланировка+4",
        title: "Перепланировка офиса",
        description: "Бизнес-центр «Форум»"
    },
    {
        url: "https://via.placeholder.com/400x300/00897b/white?text=Перепланировка+5",
        title: "Заземление и электромонтаж",
        description: "Проект электроснабжения"
    },
    {
        url: "https://via.placeholder.com/400x300/ff9800/white?text=Перепланировка+6",
        title: "Узаконивание лоджии",
        description: "Улица Труда, 12"
    }
];

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="section">
            <div className="container">
                <h2>Примеры наших работ</h2>
                <p style={{ textAlign: "center", marginBottom: "40px", color: "#666" }}>
                    Реальные проекты наших клиентов — все перепланировки узаконены
                </p>
                
                <div className="gallery-grid">
                    {images.map((img, idx) => (
                        <div 
                            key={idx} 
                            className="gallery-item"
                            onClick={() => setSelectedImage(img)}
                        >
                            <img src={img.url} alt={img.title} />
                            <div className="gallery-overlay">
                                <h3>{img.title}</h3>
                                <p>{img.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Модальное окно при клике на изображение */}
                {selectedImage && (
                    <div className="modal" onClick={() => setSelectedImage(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="modal-close" onClick={() => setSelectedImage(null)}>&times;</span>
                            <img src={selectedImage.url} alt={selectedImage.title} />
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}