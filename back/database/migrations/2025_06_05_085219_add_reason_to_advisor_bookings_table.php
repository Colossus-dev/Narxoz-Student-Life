<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/XXXX_add_reason_to_advisor_bookings_table.php
    public function up()
    {
        Schema::table('advisor_bookings', function (Blueprint $table) {
            $table->string('reason')->nullable();
        });
    }

    public function down()
    {
        Schema::table('advisor_bookings', function (Blueprint $table) {
            $table->dropColumn('reason');
        });
    }

};
