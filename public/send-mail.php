<?php
header('Content-Type: application/json');

// Получаем данные из React
$data = json_decode(file_get_contents('php://input'), true);
$phone = $data['phone'] ?? '';
$message = $data['message'] ?? '';
$subject = $data['subject'] ?? 'Новая заявка с сайта';

// Кому отправляем
$to = 'mariya-karpina@yandex.ru';

// Формируем письмо
$email_message = $message . "\n\n---\nОтправлено с сайта";

// Заголовки
$headers = "From: noreply@uralzemproekt.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// Отправляем
$result = mail($to, $subject, $email_message, $headers);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>