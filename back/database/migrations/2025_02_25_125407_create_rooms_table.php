<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dormitory_id')->constrained()->onDelete('restrict');
            $table->integer('floor'); // Этаж
            $table->integer('room_number'); // Номер комнаты
            $table->integer('capacity'); // Вместимость комнаты
            $table->integer('occupied')->default(0); // Количество уже занятых мест
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
