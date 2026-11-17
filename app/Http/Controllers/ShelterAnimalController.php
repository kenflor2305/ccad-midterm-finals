<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShelterAnimalRequest;
use App\Http\Requests\UpdateShelterAnimalRequest;
use App\Models\ShelterAnimal;
use App\Services\ShelterAdoptionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ShelterAnimalController extends Controller
{
    public function __construct(protected ShelterAdoptionService $service)
    {
    }

    public function index(): View
    {
        $animals = ShelterAnimal::with('adoptions')->latest()->paginate(15);

        return view('shelter.animals.index', compact('animals'));
    }

    public function create(): View
    {
        return view('shelter.animals.create');
    }

    public function store(StoreShelterAnimalRequest $request): RedirectResponse
    {
        $this->service->createShelterAnimal($request->validated());

        return redirect()->route('shelter-animals.index')->with('success', 'Shelter animal was created successfully.');
    }

    public function update(UpdateShelterAnimalRequest $request, string $id): RedirectResponse
    {
        $animal = ShelterAnimal::findOrFail($id);
        $this->service->updateShelterAnimal($animal, $request->validated());

        return redirect()->route('shelter-animals.index')->with('success', 'Shelter animal was updated successfully.');
    }
}
