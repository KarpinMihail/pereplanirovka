import React, { useState } from 'react';
import SimpleSuccessModal from './SimpleSuccessModal';

export default function Modal({ isOpen, onClose }) {
    const [phone, setPhone] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const formatPhoneNumber = (value) => {
        let cleaned = value.replace(/\D/g, '');
        
        if (cleaned.length > 0) {
            if (cleaned[0] === '8') {
                cleaned = '7' + cleaned.slice(1);
            } else if (cleaned[0] === '9' && cleaned.length <= 10) {
                cleaned = '7' + cleaned;
            }
        }
        
        if (cleaned.length > 11) {
            cleaned = cleaned.slice(0, 11);
        }
        
        let formatted = '';
        if (cleaned.length === 0) {
            formatted = '+7';
        } else if (cleaned.length <= 1) {
            formatted = `+7${cleaned}`;
        } else if (cleaned.length <= 4) {
            formatted = `+7 (${cleaned.slice(1)}`;
        } else if (cleaned.length <= 7) {
            formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
        } else if (cleaned.length <= 9) {
            formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        } else {
            formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
        }
        
        return formatted;
    };

    const isValidPhone = (phone) => {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 11 && (digits[0] === '7' || digits[0] === '8');
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
    };

    // === ОТПРАВКА НА PHP (BEGET) ===
    const sendToBeget = async (userPhone, message) => {
        try {
            const response = await fetch('/send-mail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: userPhone,
                    message: message,
                    subject: 'Запись на консультацию'
                })
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error("Ошибка отправки:", error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isValidPhone(phone)) {
            setErrorMsg("Пожалуйста, введите корректный номер телефона (11 цифр)");
            return;
        }
        
        setIsSending(true);
        
        const rawPhone = phone.replace(/\D/g, '');
        let normalizedPhone = rawPhone;
        if (normalizedPhone.startsWith('8')) {
            normalizedPhone = '+7' + normalizedPhone.slice(1);
        } else if (normalizedPhone.startsWith('7')) {
            normalizedPhone = '+7' + normalizedPhone.slice(1);
        } else {
            normalizedPhone = '+' + normalizedPhone;
        }
        
        const message = `📞 ЗАПИСЬ НА КОНСУЛЬТАЦИЮ 📞\n\nТелефон: ${normalizedPhone}\nДата: ${new Date().toLocaleString('ru-RU')}\nИсточник: Шапка сайта (модальное окно)`;
        
        const sent = await sendToBeget(normalizedPhone, message);
        setIsSending(false);
        
        if (sent) {
            setShowSuccess(true);
            setPhone("");
            onClose();
        } else {
            setErrorMsg("❌ Ошибка отправки. Пожалуйста, позвоните нам: +7 (950) 747-34-34");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                    
                    <h3>Получить консультацию юриста</h3>
                    <p className="modal-subtitle">
                        Укажите свой телефон и наш специалист свяжется с вами в течение 15 минут
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <label>Ваш телефон</label>
                        <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="modal-input"
                            required
                        />
                        
                        <button type="submit" className="modal-submit" disabled={isSending}>
                            {isSending ? "Отправка..." : "Отправить заявку"}
                        </button>
                        
                        <p className="modal-agreement">
                            Нажимая кнопку, вы даете согласие на обработку персональных данных
                        </p>
                    </form>
                </div>
            </div>
            
            <SimpleSuccessModal 
                isOpen={showSuccess} 
                onClose={() => setShowSuccess(false)} 
            />
            
            {errorMsg && (
                <div className="modal-overlay" onClick={() => setErrorMsg("")}>
                    <div className="error-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setErrorMsg("")}>&times;</button>
                        <div className="error-icon">⚠️</div>
                        <h3>Ошибка</h3>
                        <p>{errorMsg}</p>
                        <button className="error-close-btn" onClick={() => setErrorMsg("")}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}