<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('asmed_bookings', function (Blueprint $table) {
            $table->string('iin')->nullable()->after('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('asmed_bookings', function (Blueprint $table) {
            $table->dropColumn('iin');
        });
    }
};
