<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $this->actingAs($user = User::factory()->create());

        $this->get('/dashboard')->assertOk();
    }

    public function test_dashboard_statistics_are_based_on_user_records()
    {
        $this->actingAs(User::factory()->create());
        User::factory()->unverified()->create();

        $this->get('/dashboard')->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('stats.users', 2)
            ->where('stats.verifiedUsers', 1)
            ->where('stats.newUsersThisMonth', 2)
            ->has('recentActivity'));
    }
}
