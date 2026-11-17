<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Adoption</title>
</head>
<body>
    <h1>Create Adoption</h1>

    <form method="POST" action="{{ route('adoptions.store') }}">
        @csrf

        <div>
            <label for="adopter_id">Adopter</label>
            <select id="adopter_id" name="adopter_id">
                <option value="">Create new adopter</option>
                @foreach ($adopters as $adopter)
                    <option value="{{ $adopter->id }}" {{ old('adopter_id') == $adopter->id ? 'selected' : '' }}>{{ $adopter->name }}</option>
                @endforeach
            </select>
        </div>

        <div>
            <label for="adopter_name">Adopter Name</label>
            <input id="adopter_name" name="adopter_name" type="text" value="{{ old('adopter_name') }}">
        </div>

        <div>
            <label for="adopter_phone">Adopter Phone</label>
            <input id="adopter_phone" name="adopter_phone" type="tel" value="{{ old('adopter_phone') }}">
        </div>

        <div>
            <label for="adopter_address">Adopter Address</label>
            <textarea id="adopter_address" name="adopter_address">{{ old('adopter_address') }}</textarea>
        </div>

        <div>
            <label for="shelter_animal_id">Animal</label>
            <select id="shelter_animal_id" name="shelter_animal_id" required>
                @foreach ($animals as $animal)
                    <option value="{{ $animal->id }}" {{ old('shelter_animal_id') == $animal->id ? 'selected' : '' }}>{{ $animal->pet_name }} ({{ $animal->animal_type }})</option>
                @endforeach
            </select>
        </div>

        <div>
            <label for="adoption_date">Adoption Date</label>
            <input id="adoption_date" name="adoption_date" type="date" value="{{ old('adoption_date') }}">
        </div>

        <div>
            <label for="adoption_fee">Adoption Fee</label>
            <input id="adoption_fee" name="adoption_fee" type="number" min="0" step="0.01" value="{{ old('adoption_fee', 0) }}">
        </div>

        <div>
            <label for="payment_status">Payment Status</label>
            <select id="payment_status" name="payment_status" required>
                <option value="Unpaid" {{ old('payment_status') === 'Unpaid' ? 'selected' : '' }}>Unpaid</option>
                <option value="Partial" {{ old('payment_status') === 'Partial' ? 'selected' : '' }}>Partial</option>
                <option value="Paid" {{ old('payment_status') === 'Paid' ? 'selected' : '' }}>Paid</option>
            </select>
        </div>

        <div>
            <label for="approval_status">Approval Status</label>
            <select id="approval_status" name="approval_status" required>
                <option value="Pending" {{ old('approval_status') === 'Pending' ? 'selected' : '' }}>Pending</option>
                <option value="Approved" {{ old('approval_status') === 'Approved' ? 'selected' : '' }}>Approved</option>
                <option value="Rejected" {{ old('approval_status') === 'Rejected' ? 'selected' : '' }}>Rejected</option>
            </select>
        </div>

        <button type="submit">Save Adoption</button>
    </form>
</body>
</html>
