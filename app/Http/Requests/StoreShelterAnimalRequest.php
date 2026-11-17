<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreShelterAnimalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'animal_type' => ['required', 'string', 'max:100'],
            'pet_name' => ['required', 'string', 'max:150'],
            'microchip_id' => ['required', 'string', 'max:50', 'unique:shelter_animals,microchip_id'],
            'intake_date' => ['required', 'date'],
            'spay_neuter_status' => ['required', Rule::in(['Pending', 'Completed', 'Not Required'])],
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
