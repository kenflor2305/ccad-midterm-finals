<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use App\Models\ShelterAnimal;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $recentActivity = collect([
            ['label' => 'Account created', 'date' => $user->created_at],
            [
                'label' => 'Profile updated',
                'date' => $user->updated_at?->gt($user->created_at) ? $user->updated_at : null,
            ],
            ['label' => 'Email verified', 'date' => $user->email_verified_at],
        ])
            ->filter(fn (array $activity) => $activity['date'] !== null)
            ->sortByDesc('date')
            ->values();

        $recentAdoptions = Adoption::query()
            ->with(['adopter', 'shelterAnimal'])
            ->latest('adoption_date')
            ->take(5)
            ->get()
            ->map(fn (Adoption $adoption) => [
                'id' => $adoption->id,
                'pet_name' => $adoption->shelterAnimal?->pet_name ?? 'Unknown animal',
                'adopter_name' => $adoption->adopter?->name ?? 'Unknown adopter',
                'approval_status' => $adoption->approval_status,
                'fee' => $adoption->adoption_fee,
                'adoption_date' => $adoption->adoption_date?->toDateString(),
            ])
            ->values();

        return Inertia::render('dashboard', [
            'stats' => [
                'users' => User::query()->count(),
                'verifiedUsers' => User::query()->whereNotNull('email_verified_at')->count(),
                'newUsersThisMonth' => User::query()
                    ->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])
                    ->count(),
            ],
            'shelterStats' => [
                'totalAnimals' => ShelterAnimal::query()->count(),
                'pendingApprovals' => Adoption::query()->where('approval_status', 'Pending')->count(),
                'approvedAdoptions' => Adoption::query()->where('approval_status', 'Approved')->count(),
                'totalFees' => (float) Adoption::query()->sum('adoption_fee'),
            ],
            'recentAdoptions' => $recentAdoptions,
            'recentActivity' => $recentActivity,
        ]);
    }
}