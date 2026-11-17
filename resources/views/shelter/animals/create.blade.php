<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Shelter Animal</title>
</head>
<body>
    <h1>Create Shelter Animal</h1>

    <form method="POST" action="{{ route('shelter-animals.store') }}">
        @csrf

        <div>
            <label for="animal_type">Animal Type</label>
            <input id="animal_type" name="animal_type" type="text" required value="{{ old('animal_type') }}">
        </div>

        <div>
            <label for="pet_name">Pet Name</label>
            <input id="pet_name" name="pet_name" type="text" required value="{{ old('pet_name') }}">
        </div>

        <div>
            <label for="microchip_id">Microchip ID</label>
            <input id="microchip_id" name="microchip_id" type="text" required value="{{ old('microchip_id') }}">
        </div>

        <div>
            <label for="intake_date">Intake Date</label>
            <input id="intake_date" name="intake_date" type="date" required value="{{ old('intake_date') }}">
        </div>

        <div>
            <label for="spay_neuter_status">Spay/Neuter Status</label>
            <select id="spay_neuter_status" name="spay_neuter_status" required>
                <option value="Pending" {{ old('spay_neuter_status') === 'Pending' ? 'selected' : '' }}>Pending</option>
                <option value="Completed" {{ old('spay_neuter_status') === 'Completed' ? 'selected' : '' }}>Completed</option>
                <option value="Not Required" {{ old('spay_neuter_status') === 'Not Required' ? 'selected' : '' }}>Not Required</option>
            </select>
        </div>

        <button type="submit">Save Animal</button>
    </form>
</body>
</html>
