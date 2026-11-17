<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shelter_animals', function (Blueprint $table) {
            $table->id();
            $table->string('animal_type');
            $table->string('pet_name');
            $table->string('microchip_id')->unique();
            $table->date('intake_date');
            $table->string('spay_neuter_status')->default('Pending');
            $table->timestamps();

            $table->index(['animal_type', 'pet_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shelter_animals');
    }
};
