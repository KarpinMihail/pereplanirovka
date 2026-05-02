import React, { useState, useEffect } from 'react';

// Массив с реальными отзывами (из ваших файлов)
const reviews = [
    {
        id: 1,
        image: "/images/отзыв 1.JPG",
        name: "Екатерина Путилова",
        text: "Большое человеческое спасибо Вам за то, что откликнулись на мою просьбу и помогли разобраться с ошибкой. Для меня Ваша помощь была очень ценна, без Вашего профессионализма и участия справиться было бы очень сложно. Спасибо за Ваш труд и неравнодушие! С благодарностью и наилучшими пожеланиями.",
        date: "Февраль 2026",
        rating: 5
    },
    {
        id: 2,
        image: "/images/отзыв 2.JPG",
        name: "Наталья Ф.",
        text: "Заказывали у Марии Леонидовны межевание участка и регистрацию садового дома. Всё сделали быстро, чётко, без лишней беготни. Границы определили, дом поставили на кадастр с первого раза. На связи всегда, поясняют каждый шаг. Результатом довольны, рекомендуем!",
        date: "Апрель 2026",
        rating: 5
    },
    {
        id: 3,
        image: "/images/отзыв 3.JPG",
        name: "Ольга Чигинцева",
        text: "Обращалась к Марии Леонидовне Карпиной для перевода садового строения в жилой дом по адресу: Челябинск, сад «Аэропорт-2». В старых документах значилось «жилое строение без права регистрации», а мне требовался полноценный статус жилого дома. В выписке ЕГРН теперь статус «жилой дом». Если нужно привести документы на недвижимость в порядок или оформить перевод дома — рекомендую без сомнений.",
        date: "Апрель 2026",
        rating: 5
    },
    {
        id: 4,
        image: "/images/отзыв 4.JPG",
        name: "Ирина Гордиенко",
        text: "Большое спасибо Марии Леонидовне за качественную работу. Сначала перевели дом в СНТ в жилой дом. Через некоторое время увеличили площадь дома. Мария Леонидовна оперативно выехала к нам в СНТ на замер дома, подготовила документы, мы их отдали в МФЦ и в течение недели нам зарегистрировали дом. Очень приятно, что всегда можно позвонить и тебе ответят на все вопросы. Обязательно будем вас советовать знакомым.",
        date: "Апрель 2026",
        rating: 5
    },
    {
        id: 5,
        image: "/images/отзыв 5.JPG",
        name: "Валентина Османова",
        text: "Я иногородний клиент, рассматривала покупку таунхауса удалённо. На словах всё казалось идеальным: дом оформлен на продавца, документы «в порядке». Риелтор уверял, что можно смело выходить на сделку. Но интуиция подсказывала перепроверить. Обратилась к Марии Леонидовне – она нашла ошибки в документах, которые могли привести к потере права собственности. Спасибо за профессионализм!",
        date: "Апрель 2026",
        rating: 5
    },
    {
        id: 6,
        image: "/images/отзыв 6.JPG",
        name: "Елена Орлова",
        text: "Заказывали сразу две процедуры для участка в СНТ «Кузнец-3» (Челябинская область, Еткульский муниципальный округ): межевание земельного участка и постановку на кадастровый учёт садового дома. Всё выполнено качественно и в срок. Спасибо большое!",
        date: "Апрель 2026",
        rating: 5
    },
    {
        id: 7,
        image: "/images/отзыв 7.JPG",
        name: "Никита Касьян",
        text: "Заказывали у Марии Леонидовны подготовку документов и регистрацию изменений в ЕГРН по квартире. Результат получили в оговорённые сроки, без замечаний и «беготни» по инстанциям. На связи всегда, на вопросы отвечает по делу. Спасибо!",
        date: "Апрель 2026",
        rating: 5
    },
    {
        id: 8,
        image: "/images/отзыв 8.JPG",
        name: "Елена Щукина",
        text: "Обращалась к Марии Леонидовне для перевода садового дома в жилой по адресу: Челябинск, сад «Аэропорт-2». Процедура казалась запутанной: нужно было подготовить технический план, получить заключение о соответствии дома требованиям... Мария Леонидовна всё сделала профессионально, быстро. Спасибо!",
        date: "Апрель 2026",
        rating: 5
    }
];

export default function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(2);
    const [selectedImage, setSelectedImage] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Определяем, сколько отзывов показывать в зависимости от ширины экрана
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setDisplayCount(1);
            } else {
                setDisplayCount(2);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(reviews.length / displayCount);
    const startIndex = currentIndex * displayCount;
    const visibleReviews = reviews.slice(startIndex, startIndex + displayCount);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    // Обработка свайпа для мобильных устройств
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const diff = touchStart - touchEnd;
        if (diff > 50) {
            goToNext();
        }
        if (diff < -50) {
            goToPrev();
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    // Открытие фото в полный размер
    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    // Закрытие по Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedImage) {
                closeImageModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    // Рендер звёзд рейтинга
    const renderStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    if (reviews.length === 0) return null;

    return (
        <>
            <section className="reviews-section">
                <div className="container">
                    <h2>Отзывы наших клиентов</h2>
                    <p className="section-subtitle">
                        100% реальные благодарности от тех, кому мы помогли узаконить перепланировку
                    </p>

                    {/* Подсказка по управлению */}
                    <div className="reviews-hint">
                        <span className="hint-icon">💡</span>
                        <span>Листайте отзывы стрелками, свайпом по экрану или нажимайте на точки внизу</span>
                        <span className="hint-icon">👉</span>
                    </div>

                    <div 
                        className="reviews-slider"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Стрелка назад */}
                        {totalPages > 1 && (
                            <button className="reviews-arrow reviews-arrow-prev" onClick={goToPrev} aria-label="Предыдущие отзывы">
                                ❮
                            </button>
                        )}

                        {/* Карточки отзывов */}
                        <div className="reviews-grid">
                            {visibleReviews.map((review) => (
                                <div key={review.id} className="review-card">
                                    <div 
                                        className="review-image clickable"
                                        onClick={() => openImageModal(review.image)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && openImageModal(review.image)}
                                    >
                                        <img src={review.image} alt={`Отзыв от ${review.name}`} />
                                        <div className="review-zoom-hint">
                                            <span>🔍</span> Нажмите для увеличения
                                        </div>
                                    </div>
                                    <div className="review-content">
                                        <div className="review-quote">“</div>
                                        <div className="review-stars">{renderStars(review.rating)}</div>
                                        <p className="review-text">{review.text}</p>
                                        <div className="review-author">
                                            <strong>{review.name}</strong>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Стрелка вперёд */}
                        {totalPages > 1 && (
                            <button className="reviews-arrow reviews-arrow-next" onClick={goToNext} aria-label="Следующие отзывы">
                                ❯
                            </button>
                        )}
                    </div>

                    {/* Индикаторы (точки) */}
                    {totalPages > 1 && (
                        <div className="reviews-dots">
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`reviews-dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Перейти к странице ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Призыв оставить отзыв */}
                    <div className="reviews-footer">
                        <p>Мы благодарны каждому клиенту за доверие!</p>
                        <small>Хотите оставить отзыв? Свяжитесь с нами любым удобным способом</small>
                    </div>
                </div>
            </section>

            {/* Модальное окно для увеличенного фото */}
            {selectedImage && (
                <div className="modal-overlay modal-image" onClick={closeImageModal}>
                    <div className="modal-image-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-image-close" onClick={closeImageModal}>&times;</button>
                        <img src={selectedImage} alt="Отзыв клиента (увеличенный вид)" />
                        <div className="modal-image-hint">Нажмите в любом месте или Esc, чтобы закрыть</div>
                    </div>
                </div>
            )}
        </>
    );
}