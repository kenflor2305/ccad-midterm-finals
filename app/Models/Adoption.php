<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Adoption extends Model
{
    use HasFactory;

    protected $fillable = [
        'adopter_id',
        'shelter_animal_id',
        'adoption_date',
        'adoption_fee',
        'payment_status',
        'approval_status',
    ];

    protected $casts = [
        'adoption_date' => 'date',
        'adoption_fee' => 'decimal:2',
    ];

    public function adopter(): BelongsTo
    {
        return $this->belongsTo(Adopter::class);
    }

    public function shelterAnimal(): BelongsTo
    {
        return $this->belongsTo(ShelterAnimal::class, 'shelter_animal_id');
    }
}
