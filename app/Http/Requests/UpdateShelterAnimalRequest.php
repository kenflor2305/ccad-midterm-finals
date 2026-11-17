<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateShelterAnimalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $animalId = $this->route('shelter_animal') ?? $this->route('id');

        return [
            'animal_type' => ['sometimes', 'required', 'string', 'max:100'],
            'pet_name' => ['sometimes', 'required', 'string', 'max:150'],
            'microchip_id' => ['sometimes', 'required', 'string', 'max:50', Rule::unique('shelter_animals', 'microchip_id')->ignore($animalId)],
            'intake_date' => ['sometimes', 'required', 'date'],
            'spay_neuter_status' => ['sometimes', 'required', Rule::in(['Pending', 'Completed', 'Not Required'])],
        ];
    }

    public function messages(): array
    {
        return [
            'animal_type.required' => 'The animal type is required.',
            'pet_name.required' => 'The pet name is required.',
            'microchip_id.unique' => 'This microchip ID already exists in the shelter system.',
            'spay_neuter_status.in' => 'Spay/neuter status must be Pending, Completed, or Not Required.',
        ];
    }
}
