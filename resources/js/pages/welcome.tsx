import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, HeartHandshake, PawPrint, ShieldCheck } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
                <div className="pointer-events-none absolute -top-56 left-1/3 size-[36rem] rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute right-0 bottom-0 size-[28rem] rounded-full bg-amber-400/5 blur-3xl" aria-hidden="true" />

                <header className="relative z-10 mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-4 py-5 sm:px-8">
                    <Link
                        href={route('home')}
                        className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                    >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 text-teal-950 shadow-lg shadow-teal-950/30">
                            <PawPrint className="size-5" aria-hidden="true" />
                        </span>
                        <span className="truncate text-sm font-semibold tracking-tight sm:text-base">Shelter Animal Adoption</span>
                    </Link>

                    <nav aria-label="Account" className="flex shrink-0 items-center gap-2 sm:gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                            >
                                Dashboard <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                                >
                                    Get started <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-[80rem] items-center gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-16">
                    <section className="max-w-[42rem]">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-medium text-teal-200">
                            <HeartHandshake className="size-4" aria-hidden="true" />A better journey from shelter to home
                        </div>
                        <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Every animal deserves a <span className="text-teal-300">loving home.</span>
                        </h1>
                        <p className="mt-6 max-w-[38rem] text-base leading-7 text-zinc-400 sm:text-lg">
                            Keep animal profiles, care details, and adoption requests organized in one welcoming place—so your team can focus on
                            helping pets find their people.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-teal-300 to-emerald-400 px-5 text-sm font-semibold text-zinc-950 shadow-lg shadow-teal-950/30 transition-all hover:-translate-y-0.5 hover:from-teal-200 hover:to-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200"
                                >
                                    Open dashboard <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-teal-300 to-emerald-400 px-5 text-sm font-semibold text-zinc-950 shadow-lg shadow-teal-950/30 transition-all hover:-translate-y-0.5 hover:from-teal-200 hover:to-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200"
                                >
                                    Create your account <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            )}
                            <div className="inline-flex items-center gap-2 px-2 text-sm text-zinc-400">
                                <ShieldCheck className="size-4 text-emerald-300" aria-hidden="true" />
                                Thoughtful care, clearly organized
                            </div>
                        </div>
                    </section>

                    <aside className="relative mx-auto w-full max-w-[34rem]">
                        <div
                            className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-400/15 via-transparent to-amber-300/10 blur-2xl"
                            aria-hidden="true"
                        />
                        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-900/70 p-5 shadow-2xl shadow-black/40 sm:p-7">
                            <div className="absolute -top-10 -right-8 text-teal-300/10" aria-hidden="true">
                                <PawPrint className="size-48" />
                            </div>
                            <div className="relative">
                                <p className="text-xs font-semibold tracking-[0.16em] text-teal-200 uppercase">Made for compassionate care</p>
                                <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">One connected shelter workspace</h2>
                                <p className="mt-2 max-w-[26rem] text-sm leading-6 text-zinc-400">
                                    From an animal’s first record to their adoption day, keep every important detail close at hand.
                                </p>

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4">
                                        <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-amber-300/15 text-amber-200">
                                            <PawPrint className="size-5" aria-hidden="true" />
                                        </span>
                                        <p className="text-sm font-semibold text-white">Animal care</p>
                                        <p className="mt-1 text-xs leading-5 text-zinc-400">Profiles, intake, and care status</p>
                                    </div>
                                    <div className="rounded-2xl border border-rose-300/15 bg-rose-300/[0.06] p-4">
                                        <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-rose-300/15 text-rose-200">
                                            <HeartHandshake className="size-5" aria-hidden="true" />
                                        </span>
                                        <p className="text-sm font-semibold text-white">Adoption journey</p>
                                        <p className="mt-1 text-xs leading-5 text-zinc-400">Requests, approvals, and fees</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    );
}
