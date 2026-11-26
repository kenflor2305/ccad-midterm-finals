import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    BadgeCheck,
    CalendarDays,
    CircleUserRound,
    HandCoins,
    HeartHandshake,
    PawPrint,
    Plus,
    Sparkles,
    Users,
} from 'lucide-react';

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
            iconClass: 'bg-cyan-400/15 text-cyan-700 ring-1 ring-cyan-400/20 dark:text-cyan-300',
        },
        {
            label: 'Verified accounts',
            value: stats.verifiedUsers,
            note: 'Email addresses confirmed',
            icon: BadgeCheck,
            iconClass: 'bg-emerald-400/15 text-emerald-700 ring-1 ring-emerald-400/20 dark:text-emerald-300',
        },
        {
            label: 'Joined this month',
            value: stats.newUsersThisMonth,
            note: 'New accounts this month',
            icon: CalendarDays,
            iconClass: 'bg-violet-400/15 text-violet-700 ring-1 ring-violet-400/20 dark:text-violet-300',
        },
        {
            label: 'Shelter animals',
            value: shelterStats.totalAnimals,
            note: 'Animals currently tracked',
            icon: PawPrint,
            iconClass: 'bg-amber-400/15 text-amber-700 ring-1 ring-amber-400/20 dark:text-amber-300',
        },
        {
            label: 'Pending approvals',
            value: shelterStats.pendingApprovals,
            note: 'Adoptions awaiting review',
            icon: HeartHandshake,
            iconClass: 'bg-rose-400/15 text-rose-700 ring-1 ring-rose-400/20 dark:text-rose-300',
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
            iconClass: 'bg-sky-400/15 text-sky-700 ring-1 ring-sky-400/20 dark:text-sky-300',
        },
    ];

    const formatDate = (date: string) =>
        new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));

    const formatCardValue = (value: string | number) => (typeof value === 'number' ? value.toLocaleString() : value);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-teal-900 to-emerald-900 px-5 py-6 text-white shadow-xl shadow-teal-950/20 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
                    <div
                        className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full border-[40px] border-white/5"
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -right-12 bottom-0 size-56 rounded-full bg-cyan-300/10 blur-3xl"
                        aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute top-0 left-1/3 size-48 rounded-full bg-violet-400/10 blur-3xl" aria-hidden="true" />
                    <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center lg:gap-12">
                        <div className="min-w-0">
                            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200/20 bg-teal-100/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-teal-100 uppercase">
                                <Sparkles className="size-3.5" aria-hidden="true" />
                                Shelter overview
                            </p>
                            <h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">Welcome back, {firstName}</h1>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-teal-100 sm:text-base">
                                Keep track of animals, adoptions, and shelter activity from one place.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 p-4 shadow-inner shadow-black/10 backdrop-blur-sm sm:p-5">
                            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-teal-200 uppercase">Quick actions</p>
                            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                                <Link
                                    href={route('shelter-animals.create')}
                                    className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-teal-200/20 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 px-4 py-3 text-sm font-medium text-white transition-all hover:border-teal-100/40 hover:from-teal-300/25 hover:to-cyan-300/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <PawPrint className="size-4" aria-hidden="true" />
                                        Add animal
                                    </span>
                                    <ArrowUpRight className="size-4 text-teal-200" aria-hidden="true" />
                                </Link>
                                <Link
                                    href={route('adoptions.create')}
                                    className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-amber-200 to-orange-300 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-md shadow-amber-950/20 transition-all hover:-translate-y-0.5 hover:from-amber-100 hover:to-orange-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Plus className="size-4" aria-hidden="true" />
                                        New adoption
                                    </span>
                                    <ArrowUpRight className="size-4 text-teal-700" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-label="System statistics" className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight">Shelter snapshot</h2>
                        <p className="text-muted-foreground mt-1 text-sm">A quick overview of accounts, animals, and adoptions.</p>
                    </div>
                    <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {cards.map(({ label, value, note, icon: Icon, iconClass }) => (
                            <article
                                key={label}
                                className="bg-card flex min-h-36 flex-col justify-between rounded-2xl border border-white/10 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/30 hover:shadow-lg hover:shadow-teal-950/10 md:p-6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <p className="text-muted-foreground text-sm font-medium">{label}</p>
                                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
                                        <Icon className="size-5" aria-hidden="true" />
                                    </span>
                                </div>
                                <div>
                                    <p className="text-3xl leading-none font-semibold tracking-tight tabular-nums">{formatCardValue(value)}</p>
                                    <p className="text-muted-foreground mt-3 text-xs leading-5">{note}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
                    <div className="space-y-6">
                        <div className="bg-card rounded-xl border p-5 shadow-sm md:p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex size-9 items-center justify-center rounded-md bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                                    <Activity className="size-4" aria-hidden="true" />
                                </span>
                                <div>
                                    <h2 className="font-semibold">Recent activity</h2>
                                    <p className="text-muted-foreground text-sm">Updates from your account</p>
                                </div>
                            </div>
                            <ol className="space-y-5">
                                {recentActivity.length > 0 ? (
                                    recentActivity.map((item) => (
                                        <li key={`${item.label}-${item.date}`} className="flex gap-3">
                                            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal-700 ring-4 ring-teal-100 dark:bg-teal-300 dark:ring-teal-950" />
                                            <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                                <span className="text-sm font-medium">{item.label}</span>
                                                <time className="text-muted-foreground text-sm" dateTime={item.date}>
                                                    {formatDate(item.date)}
                                                </time>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-muted-foreground text-sm">No recent account activity.</li>
                                )}
                            </ol>
                        </div>

                        <div className="bg-card rounded-xl border p-5 shadow-sm md:p-6">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-9 items-center justify-center rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                        <PawPrint className="size-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h2 className="font-semibold">Shelter adoption queue</h2>
                                        <p className="text-muted-foreground text-sm">Latest adoption requests</p>
                                    </div>
                                </div>
                                <Link
                                    href={route('adoptions.index')}
                                    className="text-sm font-medium text-teal-800 hover:underline dark:text-teal-300"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentAdoptions.length > 0 ? (
                                    recentAdoptions.map((adoption) => (
                                        <Link
                                            key={adoption.id}
                                            href={route('adoptions.index')}
                                            className="hover:bg-muted/40 focus-visible:outline-ring flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{adoption.pet_name}</p>
                                                <p className="text-muted-foreground text-xs">{adoption.adopter_name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">
                                                    {new Intl.NumberFormat(undefined, {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        maximumFractionDigits: 0,
                                                    }).format(adoption.fee)}
                                                </p>
                                                <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
                                                    {adoption.approval_status}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">No adoption requests yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="bg-card h-fit rounded-xl border p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-md bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300">
                                <CircleUserRound className="size-4" aria-hidden="true" />
                            </span>
                            <div>
                                <h2 className="font-semibold">Your account</h2>
                                <p className="text-muted-foreground text-sm">Personal information</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-b pb-5">
                            <Avatar className="size-12">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">{auth.user.name}</p>
                                <p className="text-muted-foreground truncate text-sm">{auth.user.email}</p>
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
                        <Link
                            href={route('profile.edit')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-teal-800 hover:underline dark:text-teal-300"
                        >
                            Edit profile <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                    </aside>
                </section>
            </main>
        </AppLayout>
    );
}
