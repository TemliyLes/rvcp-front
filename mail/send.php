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




// Данные

$name = trim((string)$data['name']);

$phone = trim((string)$data['phone']);

$city = trim((string)$data['city']);

$email = trim((string)$data['email']);

$area = trim((string)$data['area']);

$description = trim((string)$data['description']);





// Подключаем конфиг

$config = require __DIR__ . '/config.php';




// Создаём письмо

$mail = new PHPMailer(true);



try {


    // SMTP Debug

    $mail->SMTPDebug = 0;

    $mail->Debugoutput = function($str, $level) {

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
        $config['to_email'],
        $config['to_name']
    );



    // Ответ

    $mail->addReplyTo(
        $email,
        $name
    );



    // Письмо

    $mail->isHTML(true);



    $mail->Subject = 'Nova zadost z webu';



    $mail->Body = "

    <h2>Nova zadost z webu</h2>

    <p>
        <b>Jmeno:</b><br>
        {$name}
    </p>


    <p>
        <b>Telefon:</b><br>
        {$phone}
    </p>


    <p>
        <b>Mesto realizace praci:</b><br>
        {$city}
    </p>


    <p>
        <b>E-mail:</b><br>
        {$email}
    </p>


    <p>
        <b>Plocha:</b><br>
        {$area} m²
    </p>


    <p>
        <b>Popis:</b><br>
        {$description}
    </p>

    ";




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
