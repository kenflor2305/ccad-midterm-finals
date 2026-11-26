import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <main className="relative isolate flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
            <div
                className="pointer-events-none absolute -top-48 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl"
                aria-hidden="true"
            />
            <div className="relative z-10 w-full max-w-[28rem]">
                <div className="flex flex-col gap-8">
                    <header className="flex flex-col items-center gap-5 text-center">
                        <Link
                            href={route('home')}
                            className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg shadow-black/20 transition-colors hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                        >
                            <AppLogoIcon className="size-8 text-white" />
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2.5">
                            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
                            <p className="mx-auto max-w-[24rem] text-sm leading-6 text-zinc-400">{description}</p>
                        </div>
                    </header>

                    <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
                        {children}
                    </section>
                </div>
            </div>
        </main>
    );
}
