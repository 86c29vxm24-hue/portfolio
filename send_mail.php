<?php

declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// IMPORTANT: Replace with your real mailbox address.
$siteEmail = 'Yalcin_fatih@web.de';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

if ($siteEmail === 'DEINE_EMAIL_HIER' || !filter_var($siteEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server email is not configured']);
    exit;
}

$rawJson = file_get_contents('php://input');
$params = json_decode($rawJson, false);

if (json_last_error() !== JSON_ERROR_NONE || !is_object($params)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

$email = isset($params->email) ? trim((string) $params->email) : '';
$name = isset($params->name) ? trim((string) $params->name) : '';
$userMessage = isset($params->message) ? trim((string) $params->message) : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $name === '' || $userMessage === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input data']);
    exit;
}

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

$subject = 'Website Contact Form';
$mailBody = "<strong>Name:</strong> {$safeName}<br><strong>Email:</strong> {$safeEmail}<br><br><strong>Message:</strong><br>{$safeMessage}";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Website Kontakt <' . $siteEmail . '>',
    'Reply-To: ' . $email,
    'Return-Path: ' . $siteEmail,
];

$success = mail(
    $siteEmail,
    $subject,
    $mailBody,
    implode("\r\n", $headers),
    '-f ' . $siteEmail
);

if (!$success) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail delivery failed']);
    exit;
}

echo json_encode(['success' => true]);
