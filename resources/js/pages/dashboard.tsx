import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity, ArrowUpRight, BadgeCheck, CalendarDays, CircleUserRound, HandCoins, HeartHandshake, PawPrint, Users } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';

interface DashboardProps {
    stats: {
        users: number;
        verifiedUsers: number;
        newUsersThisMonth: number;
    };
    shelterStats: {
        totalAnimals: number;
        pendingApprovals: number;
        approvedAdoptions: number;
        totalFees: number;
    };
    recentAdoptions: {
        id: number;
        pet_name: string;
        adopter_name: string;
        approval_status: string;
        fee: number;
        adoption_date: string | null;
    }[];
    recentActivity: { label: string; date: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, shelterStats, recentAdoptions, recentActivity }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const firstName = auth.user.name.trim().split(/\s+/)[0];

    const cards = [
        {
            label: 'Registered accounts',
            value: stats.users,
            note: 'Accounts in the system',
            icon: Users,
            iconClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
        },
        {
            label: 'Verified accounts',
            value: stats.verifiedUsers,
            note: 'Email addresses confirmed',
            icon: BadgeCheck,
            iconClass: 'bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300',
        },
        {
            label: 'Joined this month',
            value: stats.newUsersThisMonth,
            note: 'New accounts this month',
            icon: CalendarDays,
            iconClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
        },
        {
            label: 'Shelter animals',
            value: shelterStats.totalAnimals,
            note: 'Animals currently tracked',
            icon: PawPrint,
            iconClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
        },
        {
            label: 'Pending approvals',
            value: shelterStats.pendingApprovals,
            note: 'Adoptions awaiting review',
            icon: HeartHandshake,
            iconClass: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300',
        },
        {
            label: 'Adoption fees',
            value: new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(shelterStats.totalFees),
            note: 'Total fee value recorded',
            icon: HandCoins,
            iconClass: 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
        },
    ];

    const formatDate = (date: string) =>
        new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));

    const formatCardValue = (value: string | number) => (typeof value === 'number' ? value.toLocaleString() : value);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <section className="flex flex-col justify-between gap-5 rounded-lg bg-teal-950 px-6 py-7 text-white md:flex-row md:items-end md:px-8">
                    <div>
                        <p className="mb-2 text-sm font-medium text-teal-200">Your workspace</p>
                        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Welcome back, {firstName}</h1>
                        <p className="mt-2 max-w-xl text-sm text-teal-100">A clear view of your account and the system, all in one place.</p>
                    </div>
                    <Link
                        href={route('profile.edit')}
                        className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md bg-white px-4 text-sm font-medium text-teal-950 transition-colors hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:self-auto"
                    >
                        Profile settings <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                </section>

                <section aria-label="System statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map(({ label, value, note, icon: Icon, iconClass }) => (
                        <article key={label} className="rounded-lg border bg-card p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                    <p className="mt-3 text-3xl font-semibold tabular-nums">{formatCardValue(value)}</p>
                                </div>
                                <span className={`flex size-10 shrink-0 items-center justify-center rounded-md ${iconClass}`}>
                                    <Icon className="size-5" aria-hidden="true" />
                                </span>
                            </div>
                            <p className="mt-4 text-xs text-muted-foreground">{note}</p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-5 md:p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex size-9 items-center justify-center rounded-md bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                                    <Activity className="size-4" aria-hidden="true" />
                                </span>
                                <div>
                                    <h2 className="font-semibold">Recent activity</h2>
                                    <p className="text-sm text-muted-foreground">Updates from your account</p>
                                </div>
                            </div>
                            <ol className="space-y-5">
                                {recentActivity.map((item) => (
                                    <li key={`${item.label}-${item.date}`} className="flex gap-3">
                                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal-700 ring-4 ring-teal-100 dark:bg-teal-300 dark:ring-teal-950" />
                                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                            <span className="text-sm font-medium">{item.label}</span>
                                            <time className="text-sm text-muted-foreground" dateTime={item.date}>
                                                {formatDate(item.date)}
                                            </time>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="rounded-lg border bg-card p-5 md:p-6">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-9 items-center justify-center rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                        <PawPrint className="size-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h2 className="font-semibold">Shelter adoption queue</h2>
                                        <p className="text-sm text-muted-foreground">Latest adoption requests</p>
                                    </div>
                                </div>
                                <Link href={route('adoptions.index')} className="text-sm font-medium text-teal-800 hover:underline dark:text-teal-300">
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentAdoptions.length > 0 ? (
                                    recentAdoptions.map((adoption) => (
                                        <div key={adoption.id} className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                                            <div>
                                                <p className="text-sm font-medium">{adoption.pet_name}</p>
                                                <p className="text-xs text-muted-foreground">{adoption.adopter_name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(adoption.fee)}</p>
                                                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{adoption.approval_status}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No adoption requests yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="rounded-lg border bg-card p-5 md:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-md bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300">
                                <CircleUserRound className="size-4" aria-hidden="true" />
                            </span>
                            <div>
                                <h2 className="font-semibold">Your account</h2>
                                <p className="text-sm text-muted-foreground">Personal information</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-b pb-5">
                            <Avatar className="size-12">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">{auth.user.name}</p>
                                <p className="truncate text-sm text-muted-foreground">{auth.user.email}</p>
                            </div>
                        </div>
                        <dl className="grid gap-3 py-5 text-sm">
                            <div className="flex justify-between gap-3">
                                <dt className="text-muted-foreground">Email status</dt>
                                <dd className="font-medium">{auth.user.email_verified_at ? 'Verified' : 'Not verified'}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-muted-foreground">Member since</dt>
                                <dd className="text-right font-medium">{formatDate(auth.user.created_at)}</dd>
                            </div>
                        </dl>
                        <Link href={route('profile.edit')} className="inline-flex items-center gap-2 text-sm font-medium text-teal-800 hover:underline dark:text-teal-300">
                            Edit profile <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                    </aside>
                </section>
            </main>
        </AppLayout>
    );
}
