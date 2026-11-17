<?php

namespace Tests\Feature;

use App\Models\Adopter;
use App\Models\Adoption;
use App\Models\ShelterAnimal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdoptionPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_the_adoption_index_in_the_inertia_app(): void
    {
        $this->actingAs(User::factory()->create());

        $this->get('/adoptions')->assertInertia(fn (Assert $page) => $page
            ->component('adoptions/index')
            ->has('adoptions.data'));
    }

    public function test_authenticated_users_can_view_the_create_adoption_form_in_the_inertia_app(): void
    {
        $this->actingAs(User::factory()->create());

        $this->get('/adoptions/create')->assertInertia(fn (Assert $page) => $page
            ->component('adoptions/create')
            ->has('animals'));
    }

    public function test_create_page_passes_all_shelter_animals_to_inertia(): void
    {
        $this->actingAs(User::factory()->create());

        $adopter = Adopter::create([
            'name' => 'Jamie Rivera',
            'phone' => '(555) 123-4567',
            'address' => '10 Main Street',
        ]);
        $availableAnimal = ShelterAnimal::create([
            'animal_type' => 'Dog',
            'pet_name' => 'Milo',
            'microchip_id' => 'DOG-123',
            'intake_date' => '2026-11-01',
            'spay_neuter_status' => 'Completed',
        ]);
        $adoptedAnimal = ShelterAnimal::create([
            'animal_type' => 'Cat',
            'pet_name' => 'Luna',
            'microchip_id' => 'CAT-456',
            'intake_date' => '2026-11-02',
            'spay_neuter_status' => 'Completed',
        ]);
        Adoption::create([
            'adopter_id' => $adopter->id,
            'shelter_animal_id' => $adoptedAnimal->id,
            'adoption_fee' => 50,
            'payment_status' => 'Paid',
            'approval_status' => 'Approved',
        ]);

        $this->get('/adoptions/create')->assertInertia(fn (Assert $page) => $page
            ->component('adoptions/create')
            ->has('animals', 2)
            ->where('animals.0.pet_name', 'Luna')
            ->where('animals.0.animal_type', 'Cat')
            ->where('animals.0.microchip_id', 'CAT-456')
            ->where('animals.1.pet_name', 'Milo')
            ->where('animals.1.animal_type', 'Dog')
            ->where('animals.1.microchip_id', 'DOG-123'));
    }
}
