<?php

namespace Tests\Feature;

use App\Models\Adopter;
use App\Models\Adoption;
use App\Models\ShelterAnimal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ShelterAnimalManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_an_animal_edit_form(): void
    {
        $this->actingAs(User::factory()->create());

        $animal = ShelterAnimal::create([
            'animal_type' => 'Dog',
            'pet_name' => 'Milo',
            'microchip_id' => 'DOG-123',
            'intake_date' => '2026-11-01',
            'spay_neuter_status' => 'Completed',
        ]);

        $this->get(route('shelter-animals.edit', $animal))
            ->assertInertia(fn (Assert $page) => $page
                ->component('shelter-animals/create')
                ->where('animal.id', $animal->id)
                ->where('animal.pet_name', 'Milo')
                ->where('animal.intake_date', '2026-11-01'));
    }

    public function test_authenticated_users_can_update_an_animal(): void
    {
        $this->actingAs(User::factory()->create());

        $animal = ShelterAnimal::create([
            'animal_type' => 'Dog',
            'pet_name' => 'Milo',
            'microchip_id' => 'DOG-123',
            'intake_date' => '2026-11-01',
            'spay_neuter_status' => 'Pending',
        ]);

        $this->put(route('shelter-animals.update', $animal), [
            'animal_type' => 'Dog',
            'pet_name' => 'Milo Rose',
            'microchip_id' => 'DOG-123',
            'intake_date' => '2026-11-01',
            'spay_neuter_status' => 'Completed',
        ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('shelter-animals.index'));

        $this->assertDatabaseHas('shelter_animals', [
            'id' => $animal->id,
            'pet_name' => 'Milo Rose',
            'spay_neuter_status' => 'COMPLETED',
        ]);
    }

    public function test_deleting_an_animal_removes_it_and_flashes_a_success_message(): void
    {
        $this->actingAs(User::factory()->create());

        $adopter = Adopter::create([
            'name' => 'Jamie Rivera',
            'phone' => '(555) 123-4567',
            'address' => '10 Main Street',
        ]);
        $animal = ShelterAnimal::create([
            'animal_type' => 'Dog',
            'pet_name' => 'Milo',
            'microchip_id' => 'DOG-123',
            'intake_date' => '2026-11-01',
            'spay_neuter_status' => 'Completed',
        ]);
        $adoption = Adoption::create([
            'adopter_id' => $adopter->id,
            'shelter_animal_id' => $animal->id,
            'adoption_fee' => 50,
            'payment_status' => 'Paid',
            'approval_status' => 'Approved',
        ]);

        $message = 'Shelter animal was deleted successfully.';

        $this->delete(route('shelter-animals.destroy', $animal))
            ->assertRedirect(route('shelter-animals.index'))
            ->assertSessionHas('success', $message);

        $this->assertDatabaseMissing('shelter_animals', ['id' => $animal->id]);
        $this->assertDatabaseMissing('adoptions', ['id' => $adoption->id]);

        $this->get(route('shelter-animals.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('shelter-animals/index')
                ->where('success', $message));
    }
}
