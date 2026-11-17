<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adoptions</title>
</head>
<body>
    <h1>Adoptions</h1>

    <a href="{{ route('adoptions.create') }}">Create adoption</a>

    @if (session('success'))
        <p>{{ session('success') }}</p>
    @endif

    <table>
        <thead>
            <tr>
                <th>Adopter</th>
                <th>Animal</th>
                <th>Adoption Date</th>
                <th>Fee</th>
                <th>Payment</th>
                <th>Approval</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($adoptions as $adoption)
                <tr>
                    <td>{{ $adoption->adopter?->name }}</td>
                    <td>{{ $adoption->shelterAnimal?->pet_name }}</td>
                    <td>{{ $adoption->adoption_date?->format('Y-m-d') }}</td>
                    <td>${{ number_format((float) $adoption->adoption_fee, 2) }}</td>
                    <td>{{ $adoption->payment_status }}</td>
                    <td>{{ $adoption->approval_status }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $adoptions->links() }}
</body>
</html>
