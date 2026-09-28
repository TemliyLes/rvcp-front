<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


header('Content-Type: application/json; charset=UTF-8');


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);

    exit;
}


// Получаем JSON

$data = json_decode(
    file_get_contents('php://input'),
    true
);


// Заглушка для теста

if (!is_array($data)) {
    $data = [];
}


$data = array_merge(
    [
        "name" => "Test User",
        "phone" => "+421 900 123 456",
        "city" => "Praha",
        "email" => "seinistdasseinnigcht@gmail.com",
        "area" => "85",
        "description" => "Testovací zpráva z formuláře",
    ],
    $data
);


// Данные формы

$name = trim((string)$data['name']);
$phone = trim((string)$data['phone']);
$city = trim((string)$data['city']);
$email = trim((string)$data['email']);
$area = trim((string)$data['area']);
$description = trim((string)$data['description']);


// Экранируем данные для HTML-письма

$nameHtml = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$phoneHtml = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$cityHtml = htmlspecialchars($city, ENT_QUOTES, 'UTF-8');
$emailHtml = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$areaHtml = htmlspecialchars($area, ENT_QUOTES, 'UTF-8');
$descriptionHtml = nl2br(
    htmlspecialchars($description, ENT_QUOTES, 'UTF-8')
);


// Подключаем SMTP-конфиг

$config = require __DIR__ . '/config.php';


// Куда отправляем заявки

$toEmail = 'pixcreativesk@gmail.com';
$toName = 'Creative Pix';


// Создаём письмо

$mail = new PHPMailer(true);


try {

    // SMTP Debug

    $mail->SMTPDebug = 0;

    $mail->Debugoutput = function ($str, $level) {

        echo json_encode([
            "debug" => $str
        ]);

    };


    // SMTP настройки

    $mail->isSMTP();

    $mail->Host = $config['host'];

    $mail->SMTPAuth = true;

    $mail->Username = $config['username'];

    $mail->Password = $config['password'];

    $mail->Port = $config['port'];

    $mail->CharSet = 'UTF-8';


    if ($config['port'] == 465) {

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

    } else {

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    }


    // От кого

    $mail->setFrom(
        $config['from_email'],
        $config['from_name']
    );


    // Кому

    $mail->addAddress(
        $toEmail,
        $toName
    );


    // Куда отправлять ответ

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $mail->addReplyTo(
            $email,
            $name
        );

    }


    // Письмо

    $mail->isHTML(true);

    $mail->Subject = 'Nova zadost z webu';


    $mail->Body = "

        <h2>Nova zadost z webu</h2>

        <p>
            <b>Jmeno:</b><br>
            {$nameHtml}
        </p>

        <p>
            <b>Telefon:</b><br>
            {$phoneHtml}
        </p>

        <p>
            <b>Mesto realizace praci:</b><br>
            {$cityHtml}
        </p>

        <p>
            <b>E-mail:</b><br>
            {$emailHtml}
        </p>

        <p>
            <b>Plocha:</b><br>
            {$areaHtml} m²
        </p>

        <p>
            <b>Popis:</b><br>
            {$descriptionHtml}
        </p>

    ";


    $mail->AltBody =
        "Nova zadost z webu\n\n" .
        "Jmeno: {$name}\n" .
        "Telefon: {$phone}\n" .
        "Mesto realizace praci: {$city}\n" .
        "E-mail: {$email}\n" .
        "Plocha: {$area} m²\n" .
        "Popis: {$description}";


    $mail->send();


    echo json_encode([
        'success' => true,
        'message' => 'Mail sent'
    ]);


} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'smtp_error' => $mail->ErrorInfo
    ]);

}
