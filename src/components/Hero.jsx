import React, { useState, useEffect } from 'react';

// Только те картинки, которые вы оставляете
const sliderImages = [
    "/images/30258560056805687_8eba.jpg",
    "/images/30258560056805790_f68d.jpg",
    "/images/30258560056805795_224f.jpg",
    "/images/30258560056805809_756a.jpg",
    "/images/1775642409573.jpg"
];

export default function Hero() {
    const scrollToQuiz = () => {
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    };

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-grid">
                    {/* Левая часть с текстом */}
                    <div>
                        <h1>Согласуем перепланировку любой сложности со 100% гарантией результата</h1>
                        <ul className="features-list">
                            <li>Запрос документов и общение с БТИ берем на себя</li>
                            <li>Бесплатная доработка документов для повторного рассмотрения в Администрации</li>
                            <li>Поэтапная оплата и отчетность о работе</li>
                            <li>Без нервов и вашего участия</li>
                        </ul>
                        <button className="btn" onClick={scrollToQuiz}>
                            Узнать стоимость и получить консультацию
                        </button>
                    </div>

                    {/* Правая часть со слайдером */}
                    <div className="hero-right-block">
                        <div className="hero-image-large">
                            <img 
                                src={sliderImages[currentIndex]} 
                                alt="Примеры работ кадастрового инженера"
                                className="hero-img"
                            />
                            {sliderImages.length > 1 && (
                                <>
                                    <button className="slider-arrow-left" onClick={goToPrev}>❮</button>
                                    <button className="slider-arrow-right" onClick={goToNext}>❯</button>
                                    <div className="slider-dots">
                                        {sliderImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                                                onClick={() => setCurrentIndex(idx)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}