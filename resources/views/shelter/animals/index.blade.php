<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shelter Animals</title>
</head>
<body>
    <h1>Shelter Animals</h1>

    <a href="{{ route('shelter-animals.create') }}">Create animal</a>

    @if (session('success'))
        <p>{{ session('success') }}</p>
    @endif

    <table>
        <thead>
            <tr>
                <th>Animal Type</th>
                <th>Pet Name</th>
                <th>Microchip ID</th>
                <th>Intake Date</th>
                <th>Spay/Neuter</th>
                <th>Adoptions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($animals as $animal)
                <tr>
                    <td>{{ $animal->animal_type }}</td>
                    <td>{{ $animal->pet_name }}</td>
                    <td>{{ $animal->microchip_id }}</td>
                    <td>{{ $animal->intake_date?->format('Y-m-d') }}</td>
                    <td>{{ $animal->spay_neuter_status }}</td>
                    <td>{{ $animal->adoptions->count() }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $animals->links() }}
</body>
</html>
