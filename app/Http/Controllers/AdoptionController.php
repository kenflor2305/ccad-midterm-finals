<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdoptionRequest;
use App\Http\Requests\UpdateAdoptionRequest;
use App\Models\Adoption;
use App\Models\ShelterAnimal;
use App\Services\ShelterAdoptionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdoptionController extends Controller
{
    public function __construct(protected ShelterAdoptionService $service)
    {
    }

    public function index(): Response
    {
        $adoptions = Adoption::with(['adopter', 'shelterAnimal'])->latest()->paginate(15);

        return Inertia::render('adoptions/index', [
            'adoptions' => $adoptions,
        ]);
    }

    public function create(): Response
    {
        $animals = ShelterAnimal::query()
            ->select(['id', 'pet_name', 'animal_type', 'microchip_id'])
            ->orderBy('pet_name')
            ->get();

        return Inertia::render('adoptions/create', [
            'animals' => $animals,
        ]);
    }

    public function store(StoreAdoptionRequest $request): RedirectResponse
    {
        $this->service->createAdoption($request->validated());

        return redirect()->route('adoptions.index')->with('success', 'Adoption was created successfully.');
    }

    public function update(UpdateAdoptionRequest $request, string $id): RedirectResponse
    {
        $adoption = Adoption::findOrFail($id);
        $this->service->updateAdoption($adoption, $request->validated());

        return redirect()->route('adoptions.index')->with('success', 'Adoption was updated successfully.');
    }
}
