<!DOCTYPE html>
<html lang="kk">
<head>
    <meta charset="UTF-8">
    <title>Брондау мақұлданды</title>
</head>
<body>
<p>Құрметті {{ $userName }},</p>
<p>Сіздің <strong>{{ $dormitory }}</strong> жатақханасындағы <strong>{{ $roomNumber }}</strong> нөмірлі бөлмені брондау өтінішіңіз мақұлданды.</p>
<p>Келесі қадамдарды орындау үшін жеке кабинетке кіріңіз: төлем жасау және келісімшарт толтыру.</p>
<p>
    <a href="{{ url('/dashboard') }}"
       style="display:inline-block;padding:10px 20px;background-color:#28a745;color:#fff;text-decoration:none;border-radius:5px;">
        Жеке кабинетке өту
    </a>
</p>
<p>Құрметпен,</p>
<p>Жатақхана әкімшілігі</p>
</body>
</html>
