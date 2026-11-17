<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('adoptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('adopter_id')->constrained()->onDelete('cascade');
            $table->foreignId('shelter_animal_id')->constrained('shelter_animals')->onDelete('cascade');
            $table->date('adoption_date')->nullable();
            $table->decimal('adoption_fee', 10, 2)->default(0.00);
            $table->string('payment_status')->default('Unpaid');
            $table->string('approval_status')->default('Pending');
            $table->timestamps();

            $table->unique(['adopter_id', 'shelter_animal_id']);
            $table->index(['approval_status', 'payment_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('adoptions');
    }
};
