import React, { useState, useRef, useEffect } from 'react';

// Массив с парами фотографий (без адресов) — УДАЛИЛ "3-комнатную квартиру"
const projects = [
    {
        id: 1,
        before: "/images/Б Каширных 87А было.jpg",
        after: "/images/Б Каширных 87А стало.jpg",
        title: "1-комнатная квартира",
        description: "Объединение ванной и туалета + перепланировка коридора"
    },
    {
        id: 2,
        before: "/images/Бажова 50а было.jpg",
        after: "/images/Бажова 50а стало.jpg",
        title: "2-комнатная квартира",
        description: "Снос несущей стены, расширение гостиной"
    },
    {
        id: 3,
        before: "/images/Героя Яковлева Манхетен было.jpg",
        after: "/images/Героя Яковлева Манхетен стало.jpg",
        title: "Квартира-студия",
        description: "Перепланировка студии в двухкомнатную"
    },
    {
        id: 4,
        before: "/images/Елькина 45 было.jpg",
        after: "/images/Елькина 45 стало.jpg",
        title: "Квартира в новостройке",
        description: "Объединение кухни с гостиной"
    },
    {
        id: 5,
        before: "/images/Кирова 21 было.jpg",
        after: "/images/Кирова 21 стало.jpg",
        title: "4-комнатная квартира",
        description: "Зонирование, перенос перегородок"
    }
];

export default function BeforeAfter() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projects[activeIndex];
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    // Переключение между проектами
    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
        setSliderPosition(50);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
        setSliderPosition(50);
    };

    // Выбор проекта по вкладке
    const handleProjectChange = (index) => {
        setActiveIndex(index);
        setSliderPosition(50);
    };

    // Управление слайдером через клик на подписи ДО/ПОСЛЕ
    const showBefore = () => {
        setSliderPosition(0);
    };

    const showAfter = () => {
        setSliderPosition(100);
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let percent = (x / rect.width) * 100;
        percent = Math.min(Math.max(percent, 0), 100);
        setSliderPosition(percent);
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        let percent = (x / rect.width) * 100;
        percent = Math.min(Math.max(percent, 0), 100);
        setSliderPosition(percent);
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <section className="beforeafter-section">
            <div className="container">
                <h2>Реальные примеры наших работ</h2>
                <p className="section-subtitle">
                    Перемещайте ползунок или нажимайте на надписи «ДО» и «ПОСЛЕ», чтобы сравнить результат
                </p>

                {/* Вкладки с проектами */}
                <div className="projects-tabs">
                    {projects.map((project, idx) => (
                        <button
                            key={project.id}
                            className={`project-tab ${activeIndex === idx ? 'active' : ''}`}
                            onClick={() => handleProjectChange(idx)}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>

                {/* Интерактивный слайдер с активными подписями ДО/ПОСЛЕ */}
                <div 
                    className="beforeafter-slider-container"
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onMouseLeave={() => isDragging.current = false}
                >
                    <div className="beforeafter-wrapper">
                        {/* Фото ПОСЛЕ (правая часть) */}
                        <div className="after-image">
                            <img src={activeProject.after} alt="После перепланировки" draggable={false} />
                        </div>
                        
                        {/* Фото ДО (левая часть, обрезается через clip-path) */}
                        <div 
                            className="before-image"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <img src={activeProject.before} alt="До перепланировки" draggable={false} />
                        </div>
                        
                        {/* Ползунок */}
                        <div 
                            className="slider-handle"
                            style={{ left: `${sliderPosition}%` }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleMouseDown}
                        >
                            <div className="slider-line"></div>
                            <div className="slider-circle">
                                <span className="slider-arrow">◀</span>
                                <span className="slider-arrow">▶</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Подписи ДО и ПОСЛЕ — активные кнопки */}
                    <div className="beforeafter-labels">
                        <button 
                            className={`label-before ${sliderPosition === 0 ? 'active' : ''}`}
                            onClick={showBefore}
                        >
                            ДО
                        </button>
                        <button 
                            className={`label-after ${sliderPosition === 100 ? 'active' : ''}`}
                            onClick={showAfter}
                        >
                            ПОСЛЕ
                        </button>
                    </div>
                </div>

                {/* Кнопки навигации между проектами (под слайдером) */}
                <div className="beforeafter-navigation">
                    <button className="nav-prev" onClick={handlePrev}>
                        ← Назад
                    </button>
                    <span className="nav-counter">
                        {activeIndex + 1} / {projects.length}
                    </span>
                    <button className="nav-next" onClick={handleNext}>
                        Далее →
                    </button>
                </div>
            </div>
        </section>
    );
}