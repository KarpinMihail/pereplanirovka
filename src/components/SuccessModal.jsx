import React, { useEffect } from 'react';

export default function SuccessModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 10000); // 10 секунд, чтобы человек успел прочитать и кликнуть
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // ВАША ПРЯМАЯ ССЫЛКА НА ЧЕК-ЛИСТ
    const checklistUrl = "https://clck.su/CFcQB";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="success-icon">✅</div>
                <h3>Заявка принята!</h3>
                <p className="success-message">
                    Спасибо за обращение! Наш специалист свяжется с вами <strong>в ближайшие 15 минут</strong>.
                </p>
                
                {/* ПОДАРОК — ССЫЛКА НА ЧЕК-ЛИСТ */}
                <div className="gift-box">
                    <div className="gift-icon">🎁</div>
                    <p className="gift-title">Ваш подарок:</p>
                    <p className="gift-subtitle"><strong>Чек-лист «Как правильно узаконить перепланировку»</strong></p>
                    <a 
                        href={checklistUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="gift-link"
                    >
                        📄 Открыть чек-лист
                    </a>
                    <small className="gift-note">
                        Файл откроется в новой вкладке. Вы можете его сохранить или распечатать.
                    </small>
                </div>
                
                <button className="success-close-btn" onClick={onClose}>
                    Хорошо, спасибо
                </button>
            </div>
        </div>
    );
}