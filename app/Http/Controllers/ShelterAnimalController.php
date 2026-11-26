<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShelterAnimalRequest;
use App\Http\Requests\UpdateShelterAnimalRequest;
use App\Models\ShelterAnimal;
use App\Services\ShelterAdoptionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ShelterAnimalController extends Controller
{
    public function __construct(protected ShelterAdoptionService $service)
    {
    }

    public function index(): Response
    {
        $animals = ShelterAnimal::withCount('adoptions')->latest()->paginate(15);

        return Inertia::render('shelter-animals/index', [
            'animals' => $animals,
            'success' => session('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('shelter-animals/create');
    }

    public function store(StoreShelterAnimalRequest $request): RedirectResponse
    {
        $this->service->createShelterAnimal($request->validated());

        return redirect()->route('shelter-animals.index')->with('success', 'Shelter animal was created successfully.');
    }

    public function edit(string $id): Response
    {
        $animal = ShelterAnimal::findOrFail($id);

        return Inertia::render('shelter-animals/create', [
            'animal' => [
                'id' => $animal->id,
                'animal_type' => $animal->animal_type,
                'pet_name' => $animal->pet_name,
                'microchip_id' => $animal->microchip_id,
                'intake_date' => $animal->intake_date->toDateString(),
                'spay_neuter_status' => $animal->spay_neuter_status,
            ],
        ]);
    }

    public function update(UpdateShelterAnimalRequest $request, string $id): RedirectResponse
    {
        $animal = ShelterAnimal::findOrFail($id);
        $this->service->updateShelterAnimal($animal, $request->validated());

        return redirect()->route('shelter-animals.index')->with('success', 'Shelter animal was updated successfully.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $animal = ShelterAnimal::findOrFail($id);
        $animal->delete();

        return redirect()->route('shelter-animals.index')->with('success', 'Shelter animal was deleted successfully.');
    }
}
