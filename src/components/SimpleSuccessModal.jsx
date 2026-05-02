import React, { useEffect } from 'react';

export default function SimpleSuccessModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="success-icon">✅</div>
                <h3>Заявка принята!</h3>
                <p className="success-message">
                    Спасибо за обращение! Наш специалист свяжется с вами <strong>в ближайшие 15 минут</strong>.
                </p>
                
                <button className="success-close-btn" onClick={onClose}>
                    Хорошо, спасибо
                </button>
            </div>
        </div>
    );
}