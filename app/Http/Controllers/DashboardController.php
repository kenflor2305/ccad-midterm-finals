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
            ->with(['adopter', 'shelterAnimal']) //SALA NEED FUTHER OPTIMIZATION
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

        // OPTIMIZED: Consolidated aggregate queries using conditional aggregation
        $userStats = User::query()
            ->selectRaw('
                count(*) as total_users,
                sum(case when email_verified_at is not null then 1 else 0 end) as verified_users,
                sum(case when created_at between ? and ? then 1 else 0 end) as new_users_this_month
            ', [now()->startOfMonth(), now()->endOfMonth()])
            ->first();

        $shelterStats = ShelterAnimal::query()
            ->selectRaw('count(*) as total_animals')
            ->first();

        $adoptionStats = Adoption::query()
            ->selectRaw('
                sum(case when approval_status = ? then 1 else 0 end) as pending_approvals,
                sum(case when approval_status = ? then 1 else 0 end) as approved_adoptions,
                sum(adoption_fee) as total_fees
            ', ['Pending', 'Approved'])
            ->first();

        return Inertia::render('dashboard', [
            'stats' => [
                'users' => (int) ($userStats->total_users ?? 0),
                'verifiedUsers' => (int) ($userStats->verified_users ?? 0),
                'newUsersThisMonth' => (int) ($userStats->new_users_this_month ?? 0),
            ],
            'shelterStats' => [
                'totalAnimals' => (int) ($shelterStats->total_animals ?? 0),
                'pendingApprovals' => (int) ($adoptionStats->pending_approvals ?? 0),
                'approvedAdoptions' => (int) ($adoptionStats->approved_adoptions ?? 0),
                'totalFees' => (float) ($adoptionStats->total_fees ?? 0),
            ],
            'recentAdoptions' => $recentAdoptions,
            'recentActivity' => $recentActivity,
        ]);
    }
}