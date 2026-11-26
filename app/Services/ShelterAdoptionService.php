<?php

namespace App\Services;

use App\Models\Adoption;
use App\Models\Adopter;
use App\Models\ShelterAnimal;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ShelterAdoptionService
{
    public function sanitizeText(?string $value): string //CORRECT
    {
        return trim(preg_replace('/\s+/', ' ', (string) ($value ?? '')));
    }

    public function sanitizePhoneNumber(?string $phone): string // CORRECT
    {
        if ($phone === null || trim($phone) === '') {
            return '';
        }

        $digits = preg_replace('/\D+/', '', $phone);

        if ($digits === null || $digits === '') {
            return $this->sanitizeText($phone);
        }

        if (strlen($digits) === 10) {
            return sprintf('(%s) %s-%s', substr($digits, 0, 3), substr($digits, 3, 3), substr($digits, 6, 4));
        }

        if (strlen($digits) === 11 && str_starts_with($digits, '1')) {
            return sprintf('(%s) %s-%s', substr($digits, 1, 3), substr($digits, 4, 3), substr($digits, 7, 4));
        }

        return $this->sanitizeText($phone);
    }

    public function normalizeMicrochipId(?string $microchipId): string
    {
        return strtoupper(trim((string) ($microchipId ?? '')));
    }

    public function createShelterAnimal(array $data): ShelterAnimal
    {
        return DB::transaction(function () use ($data) {
            return ShelterAnimal::create([
                'animal_type' => $this->sanitizeText($data['animal_type'] ?? null),
                'pet_name' => $this->sanitizeText($data['pet_name'] ?? null),
                'microchip_id' => $this->normalizeMicrochipId($data['microchip_id'] ?? null),
                'intake_date' => $data['intake_date'] ?? null,
                'spay_neuter_status' => strtoupper($this->sanitizeText($data['spay_neuter_status'] ?? 'Pending')), // USE Str::of()
            ]);
        });
    }

    public function updateShelterAnimal(ShelterAnimal $animal, array $data): ShelterAnimal
    {
        return DB::transaction(function () use ($animal, $data) {
            $animal->fill([
                'animal_type' => $this->sanitizeText($data['animal_type'] ?? $animal->animal_type),
                'pet_name' => $this->sanitizeText($data['pet_name'] ?? $animal->pet_name),
                'microchip_id' => $this->normalizeMicrochipId($data['microchip_id'] ?? $animal->microchip_id),
                'intake_date' => $data['intake_date'] ?? $animal->intake_date,
                'spay_neuter_status' => strtoupper($this->sanitizeText($data['spay_neuter_status'] ?? $animal->spay_neuter_status)),
            ]);

            $animal->save();

            return $animal->fresh();
        });
    }

    public function createAdoption(array $data): Adoption
    {
        return DB::transaction(function () use ($data) {
            if (! empty($data['adopter_id'])) {
                $adopter = Adopter::findOrFail($data['adopter_id']);
            } else {
                $adopter = Adopter::firstOrCreate([
                    'name' => $this->sanitizeText($data['adopter_name'] ?? null),
                    'phone' => $this->sanitizePhoneNumber($data['adopter_phone'] ?? null),
                ], [
                    'address' => $this->sanitizeText($data['adopter_address'] ?? null),
                ]);
            }

            $animal = ShelterAnimal::findOrFail($data['shelter_animal_id']);

            if (($data['approval_status'] ?? 'Pending') === 'Approved' && strtoupper($animal->spay_neuter_status) !== 'COMPLETED') {
                throw ValidationException::withMessages([
                    'approval_status' => ['Animal must have a Completed spay/neuter status before approval can be granted.'],
                ]);
            }

            $paymentStatus = $data['payment_status'] ?? 'Unpaid';

            if (($data['adoption_fee'] ?? 0) > 0 && $paymentStatus === 'Unpaid') {
                $paymentStatus = 'Paid';
            }

            return Adoption::create([
                'adopter_id' => $adopter->id,
                'shelter_animal_id' => $animal->id,
                'adoption_date' => $data['adoption_date'] ?? null,
                'adoption_fee' => (float) ($data['adoption_fee'] ?? 0),
                'payment_status' => $paymentStatus,
                'approval_status' => $data['approval_status'] ?? 'Pending',
            ]);
        });
    }

    public function updateAdoption(Adoption $adoption, array $data): Adoption
    {
        return DB::transaction(function () use ($adoption, $data) {
            $adoption->fill([
                'adoption_date' => $data['adoption_date'] ?? $adoption->adoption_date,
                'adoption_fee' => (float) ($data['adoption_fee'] ?? $adoption->adoption_fee),
                'payment_status' => $data['payment_status'] ?? $adoption->payment_status,
                'approval_status' => $data['approval_status'] ?? $adoption->approval_status,
            ]);

            if (($adoption->approval_status ?? 'Pending') === 'Approved') {
                $animal = $adoption->shelterAnimal;

                if ($animal && strtoupper($animal->spay_neuter_status) !== 'COMPLETED') {
                    throw ValidationException::withMessages([
                        'approval_status' => ['Animal must have a Completed spay/neuter status before approval can be granted.'],
                    ]);
                }
            }

            if ($adoption->adoption_fee > 0 && $adoption->payment_status === 'Unpaid') {
                $adoption->payment_status = 'Paid';
            }

            $adoption->save();

            return $adoption->fresh(['adopter', 'shelterAnimal']);
        });
    }
}
