@if ($getState())
    <p>Оплатите с помощью Kaspi QR:</p>
    <img src="{{ $getState() }}" alt="Kaspi QR" width="200">
@else
    <p>QR-код ещё не сгенерирован</p>
@endif
