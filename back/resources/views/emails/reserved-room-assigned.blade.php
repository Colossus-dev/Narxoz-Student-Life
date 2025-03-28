<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Перенаправление в резервную комнату</title>
</head>
<body>
<h2>Здравствуйте, {{ $booking->user->name }}!</h2>

<p>Вы были автоматически перенаправлены в резервную комнату, так как основная комната уже была занята.</p>

<p><strong>Новая комната:</strong></p>
<ul>
    <li>Общежитие: {{ $booking->room->dormitory->name }}</li>
    <li>Этаж: {{ $booking->room->floor }}</li>
    <li>Номер комнаты: {{ $booking->room->room_number }}</li>
    <li>Цена: {{ $booking->room->price }} тг</li>
</ul>

<p>Вы можете продолжить оформление вашей брони в системе Narxoz Student Life.</p>

<p>С уважением,<br>Администрация университета</p>
</body>
</html>
