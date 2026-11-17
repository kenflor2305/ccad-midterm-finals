<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShelterAnimal extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_type',
        'pet_name',
        'microchip_id',
        'intake_date',
        'spay_neuter_status',
    ];

    protected $casts = [
        'intake_date' => 'date',
    ];

    public function adoptions(): HasMany
    {
        return $this->hasMany(Adoption::class);
    }
}
