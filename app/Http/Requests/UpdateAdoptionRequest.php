<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAdoptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $adoptionId = $this->route('adoption') ?? $this->route('id');

        return [
            'adopter_id' => ['nullable', 'exists:adopters,id'],
            'shelter_animal_id' => ['sometimes', 'required', 'exists:shelter_animals,id'],
            'adoption_date' => ['sometimes', 'nullable', 'date'],
            'adoption_fee' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'payment_status' => ['sometimes', 'required', Rule::in(['Unpaid', 'Partial', 'Paid'])],
            'approval_status' => ['sometimes', 'required', Rule::in(['Pending', 'Approved', 'Rejected'])],
        ];
    }

    public function messages(): array
    {
        return [
            'shelter_animal_id.required' => 'An animal must be selected for the adoption request.',
            'shelter_animal_id.exists' => 'The selected animal does not exist.',
            'approval_status.in' => 'Approval status must be Pending, Approved, or Rejected.',
            'payment_status.in' => 'Payment status must be Unpaid, Partial, or Paid.',
        ];
    }
}
