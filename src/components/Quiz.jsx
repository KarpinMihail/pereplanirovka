import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

// === ВОПРОСЫ (8 штук) ===
const questions = [
    {
        text: "Выберите тип помещения",
        options: ["Квартира в многоквартирном доме", "Нежилое помещение (офис/магазин)", "Частный дом", "Другое"],
        expertTip: "Для каждого типа помещений существует своя процедура согласования и узаконивания перепланировки."
    },
    {
        text: "Какого типа плита в доме/квартире?",
        options: ["Газовая плита", "Электрическая плита", "Не знаю / Другое"],
        expertTip: "Требования к планировке могут отличаться в зависимости от того, какая у вас плита."
    },
    {
        text: "У вас есть ипотека?",
        options: ["Да, ипотека", "Нет ипотеки"],
        hasBankInput: true,
        expertTip: "У некоторых банков выдача согласия на перепланировку — платная услуга, некоторые банки дольше по времени оформляют согласия. Мы предупредим вас, какие конкретно нюансы у вашего банка."
    },
    {
        text: "Укажите общую площадь помещения (м²)",
        isNumberInput: true,
        placeholder: "Например: 45",
        expertTip: "Эта информация содержится в выписке из ЕГРН, свидетельстве о праве, техническом паспорте."
    },
    {
        text: "Перепланировка уже выполнена или только планируется?",
        options: ["Уже выполнена (нужно узаконить)", "Только планируется (нужно согласовать)", "И то, и другое"],
        expertTip: "Мы предлагаем услугу согласования или узаконивания перепланировки, в зависимости от этапа, на котором находится объект. Они отличаются по срокам и стоимости."
    },
    {
        text: "Что конкретно было сделано или планируется?",
        options: [
            "Снос/перенос стен",
            "Объединение ванной и туалета",
            "Расширение ванной комнаты",
            "Пробивка/закладка проёмов",
            "Изменение площади комнат",
            "Свой вариант"
        ],
        allowCustom: true,
        expertTip: "Некоторые изменения проще согласовать, некоторые нет, поэтому нам важно знать, что конкретно было сделано или планируется сделать, чтобы правильно оценить объем работ."
    },
    {
        text: "На каком этаже находится помещение?",
        options: ["1 этаж", "2 этаж", "3-5 этаж", "6 и выше", "Подвал/цоколь"],
        expertTip: "Некоторые перепланировки можно узаконить только на первом или втором этаже."
    },
    {
        text: "Какой материал стен?",
        options: ["Кирпич", "Панель/блок", "Монолит", "Дерево", "Не знаю / Другое"],
        expertTip: "От материала стен зависит сам факт возможности узаконивания перепланировки, мы анализируем это бесплатно до заключения договора."
    }
];

// === НАСТРОЙКИ EMAIL ===
// const YOUR_EMAIL = "mariya-karpina@yandex.ru";

export default function Quiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [bankName, setBankName] = useState("");
    const [customAnswer, setCustomAnswer] = useState("");
    const [phone, setPhone] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [tempNumberValue, setTempNumberValue] = useState("");
    const [tempBankValue, setTempBankValue] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // === ФУНКЦИИ ДЛЯ ТЕЛЕФОНА ===
    const formatPhoneNumber = (value) => {
        let cleaned = value.replace(/\D/g, '');
        if (cleaned.length > 0) {
            if (cleaned[0] === '8') cleaned = '7' + cleaned.slice(1);
            else if (cleaned[0] === '9' && cleaned.length <= 10) cleaned = '7' + cleaned;
        }
        if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
        let formatted = '';
        if (cleaned.length === 0) formatted = '+7';
        else if (cleaned.length <= 1) formatted = `+7${cleaned}`;
        else if (cleaned.length <= 4) formatted = `+7 (${cleaned.slice(1)}`;
        else if (cleaned.length <= 7) formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
        else if (cleaned.length <= 9) formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        else formatted = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
        return formatted;
    };

    const isValidPhone = (phone) => {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 11 && (digits[0] === '7' || digits[0] === '8');
    };

    // === ОТПРАВКА НА EMAIL ===
    const sendToBeget = async (userPhone, message) => {
        try {
            const response = await fetch('/send-mail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: userPhone,
                    message: message,
                    subject: 'Новая заявка на перепланировку'
                })
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error("Ошибка отправки:", error);
            return false;
        }
    };

    // === НАВИГАЦИЯ ===
    const goToNextStep = () => {
        if (step + 1 <= questions.length) setStep(step + 1);
    };

    const goToPrevStep = () => {
        if (step > 0) {
            setStep(step - 1);
            setTempNumberValue("");
            setTempBankValue("");
        }
    };

    // === ОБРАБОТЧИКИ ОТВЕТОВ ===
    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[step] = answer;
        setAnswers(newAnswers);
        goToNextStep();
    };

    const handleNumberConfirm = () => {
        if (tempNumberValue) {
            const newAnswers = [...answers];
            newAnswers[step] = tempNumberValue;
            setAnswers(newAnswers);
            setTempNumberValue("");
            goToNextStep();
        } else {
            setErrorMsg("Пожалуйста, введите площадь помещения");
        }
    };

    const handleBankConfirm = () => {
        const bank = tempBankValue || "Не указан";
        const newAnswers = [...answers];
        newAnswers[step] = "Да, ипотека";
        setAnswers(newAnswers);
        setBankName(bank);
        setTempBankValue("");
        goToNextStep();
    };

    const handleCustomConfirm = () => {
        if (customAnswer.trim()) {
            const newAnswers = [...answers];
            newAnswers[step] = customAnswer.trim();
            setAnswers(newAnswers);
            setCustomAnswer("");
            goToNextStep();
        } else {
            setErrorMsg("Пожалуйста, напишите свой вариант");
        }
    };

    const handlePhoneSubmit = async () => {
        const rawPhone = phone.replace(/\D/g, '');
        let normalizedPhone = rawPhone;
        if (normalizedPhone.startsWith('8')) normalizedPhone = '+7' + normalizedPhone.slice(1);
        else if (normalizedPhone.startsWith('7')) normalizedPhone = '+7' + normalizedPhone.slice(1);
        else normalizedPhone = '+' + normalizedPhone;

        if (!isValidPhone(phone)) {
            setErrorMsg("Пожалуйста, введите корректный номер телефона (11 цифр)");
            return;
        }

        setIsSending(true);
        const customText = (answers[5] === "Свой вариант" && customAnswer) ? customAnswer : "";
        const bank = (answers[2] === "Да, ипотека") ? bankName : "";

        const message = `🏠 НОВАЯ ЗАЯВКА НА ПЕРЕПЛАНИРОВКУ 🏠\n\n` +
            `1️⃣ Тип помещения: ${answers[0] || "—"}\n` +
            `2️⃣ Тип плиты: ${answers[1] || "—"}\n` +
            `3️⃣ Ипотека: ${answers[2] || "—"}${bank ? ` (Банк: ${bank})` : ""}\n` +
            `4️⃣ Площадь: ${answers[3] || "—"} м²\n` +
            `5️⃣ Этап работ: ${answers[4] || "—"}\n` +
            `6️⃣ Что сделано/планируется: ${answers[5] || "—"}${customText ? ` (Детали: ${customText})` : ""}\n` +
            `7️⃣ Этаж: ${answers[6] || "—"}\n` +
            `8️⃣ Материал стен: ${answers[7] || "—"}\n\n` +
            `📞 Телефон для связи: ${normalizedPhone}\n` +
            `🕐 Дата: ${new Date().toLocaleString('ru-RU')}`;

        const sent = await sendToBeget(normalizedPhone, message);
        setIsSending(false);

        if (sent) {
            setShowSuccess(true);
            setStep(0);
            setAnswers([]);
            setPhone("");
            setBankName("");
            setCustomAnswer("");
        } else {
            setErrorMsg("❌ Ошибка отправки. Пожалуйста, позвоните нам: +7 (950) 747-34-34");
        }
    };

    // === ОТРИСОВКА ВОПРОСОВ (левый блок) ===
    const renderQuestion = () => {
        const q = questions[step];
        const currentAnswer = answers[step];

        if (q.isNumberInput) {
            return (
                <div className="quiz-card">
                    <p className="quiz-question">{q.text}</p>
                    <input
                        type="number"
                        placeholder={q.placeholder}
                        value={tempNumberValue}
                        onChange={(e) => setTempNumberValue(e.target.value)}
                        className="quiz-input"
                    />
                    <div className="quiz-nav-buttons">
                        <button onClick={goToPrevStep} className="btn-nav btn-prev">← Назад</button>
                        <button onClick={handleNumberConfirm} className="btn-nav btn-next">Далее →</button>
                    </div>
                </div>
            );
        }

        if (q.allowCustom) {
            return (
                <div className="quiz-card">
                    <p className="quiz-question">{q.text}</p>
                    <div className="quiz-options">
                        {q.options.map(opt => (
                            <button key={opt} onClick={() => handleAnswer(opt)} className={currentAnswer === opt ? "selected" : ""}>
                                {opt}
                            </button>
                        ))}
                    </div>
                    <div className="quiz-custom-block">
                        <input
                            type="text"
                            placeholder="Или напишите свой вариант"
                            value={customAnswer}
                            onChange={(e) => setCustomAnswer(e.target.value)}
                            className="quiz-input"
                        />
                        <button onClick={handleCustomConfirm} className="btn btn-secondary">Отправить свой вариант</button>
                    </div>
                    <div className="quiz-nav-buttons">
                        <button onClick={goToPrevStep} className="btn-nav btn-prev">← Назад</button>
                    </div>
                </div>
            );
        }

        if (q.hasBankInput && currentAnswer === "Да, ипотека" && !bankName) {
            return (
                <div className="quiz-card">
                    <p className="quiz-question">Укажите название банка</p>
                    <input
                        type="text"
                        placeholder="Например: Сбербанк"
                        value={tempBankValue}
                        onChange={(e) => setTempBankValue(e.target.value)}
                        className="quiz-input"
                    />
                    <div className="quiz-nav-buttons">
                        <button onClick={goToPrevStep} className="btn-nav btn-prev">← Назад</button>
                        <button onClick={handleBankConfirm} className="btn-nav btn-next">Далее →</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="quiz-card">
                <p className="quiz-question">{q.text}</p>
                <div className="quiz-options">
                    {q.options.map(opt => (
                        <button key={opt} onClick={() => handleAnswer(opt)} className={currentAnswer === opt ? "selected" : ""}>
                            {opt}
                        </button>
                    ))}
                </div>
                <div className="quiz-nav-buttons">
                    <button onClick={goToPrevStep} className="btn-nav btn-prev">← Назад</button>
                </div>
            </div>
        );
    };

    // === ЭКРАН ВВОДА ТЕЛЕФОНА (левый блок) ===
    const renderPhoneScreen = () => {
        const handlePhoneChange = (e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setPhone(formatted);
        };
        const isPhoneValid = isValidPhone(phone);

        return (
            <div className="quiz-card">
                <p className="quiz-question">📞 Остался последний шаг!</p>
                <p>Введите ваш номер телефона, чтобы получить расчёт и подарки:</p>
                <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`quiz-input ${phone && !isPhoneValid ? 'quiz-input-error' : ''}`}
                    maxLength={18}
                />
                {phone && !isPhoneValid && <div className="quiz-input-error-message">⚠️ Введите полный номер телефона (11 цифр)</div>}
                <div className="quiz-nav-buttons">
                    <button onClick={goToPrevStep} className="btn-nav btn-prev">← Назад</button>
                    <button className={`btn-nav btn-next btn-submit ${!isPhoneValid ? 'btn-disabled' : ''}`} onClick={handlePhoneSubmit} disabled={isSending || !isPhoneValid}>
                        {isSending ? "Отправка..." : "Получить расчёт →"}
                    </button>
                </div>
                <small className="quiz-agreement">Нажимая кнопку, вы даете согласие на обработку персональных данных</small>
            </div>
        );
    };

    const progress = ((step + 1) / (questions.length + 1)) * 100;
    const currentQuestionData = step < questions.length ? questions[step] : null;

    return (
        <>
            <section id="quiz" className="quiz-section-modern">
                <div className="container">
                    <div className="quiz-two-columns">
                        {/* ЛЕВАЯ КОЛОНКА — вопросы */}
                        <div className="quiz-left">
                            <div className="quiz-progress">
                                <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="quiz-step-counter">
                                {step < questions.length ? `Вопрос ${step + 1} из ${questions.length}` : "Завершение"}
                            </div>
                            {step < questions.length ? renderQuestion() : renderPhoneScreen()}
                        </div>

                        {/* ПРАВАЯ КОЛОНКА — только эксперт (бонусы убраны) */}
                        <div className="quiz-right">
                            <div className="expert-card">
                                <div className="expert-avatar">
                                    {/* Увеличенное фото без круга */}
                                    <img src="/images/30258560056805687_8eba.jpg" alt="Мария Карпина" />
                                </div>
                                <h4>Мария Карпина</h4>
                                <p className="expert-title">Кадастровый инженер, топ-5 в Челябинской области</p>
                                <div className="expert-tip">
                                    <span className="tip-icon">💡</span>
                                    <p>{currentQuestionData ? currentQuestionData.expertTip : "Заполните данные и получите подарки"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
            {errorMsg && (
                <div className="modal-overlay" onClick={() => setErrorMsg("")}>
                    <div className="error-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setErrorMsg("")}>&times;</button>
                        <div className="error-icon">⚠️</div>
                        <h3>Ошибка</h3>
                        <p>{errorMsg}</p>
                        <button className="error-close-btn" onClick={() => setErrorMsg("")}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
}