<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAdoptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'adopter_name' => ['required', 'string', 'max:150'],
            'adopter_phone' => ['nullable', 'string', 'max:30'],
            'adopter_address' => ['nullable', 'string', 'max:255'],
            'shelter_animal_id' => ['required', 'exists:shelter_animals,id'],
            'adoption_date' => ['nullable', 'date'],
            'adoption_fee' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'payment_status' => ['required', Rule::in(['Unpaid', 'Partial', 'Paid'])],
            'approval_status' => ['required', Rule::in(['Pending', 'Approved', 'Rejected'])],
        ];
    }

    public function messages(): array
    {
        return [
            'adopter_name.required' => 'The adopter name is required.',
            'shelter_animal_id.required' => 'An animal must be selected for the adoption request.',
            'shelter_animal_id.exists' => 'The selected animal does not exist.',
            'approval_status.in' => 'Approval status must be Pending, Approved, or Rejected.',
            'payment_status.in' => 'Payment status must be Unpaid, Partial, or Paid.',
        ];
    }
}
