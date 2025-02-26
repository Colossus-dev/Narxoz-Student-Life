<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Добавляем поле `price` в таблицу `rooms`
        Schema::table('rooms', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->default(0)->after('occupied');
        });

        // Добавляем `payment_status` и `contract_signed` в таблицу `booking_requests`
        Schema::table('booking_requests', function (Blueprint $table) {
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending')->after('status');
            $table->boolean('contract_signed')->default(false)->after('payment_status');
        });
    }

    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('price');
        });

        Schema::table('booking_requests', function (Blueprint $table) {
            $table->dropColumn('payment_status');
            $table->dropColumn('contract_signed');
        });
    }
};
