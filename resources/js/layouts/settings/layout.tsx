import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { KeyRound, Sun, UserRound } from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'Profile',
        url: '/settings/profile',
        icon: UserRound,
    },
    {
        title: 'Password',
        url: '/settings/password',
        icon: KeyRound,
    },
    {
        title: 'Appearance',
        url: '/settings/appearance',
        icon: Sun,
    },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const currentPath = usePage().url.split('?')[0];

    return (
        <main className="mx-auto w-full max-w-[80rem] p-4 md:p-8">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="grid min-w-0 gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
                <aside className="min-w-0">
                    <p className="text-muted-foreground mb-3 px-1 text-xs font-semibold tracking-wider uppercase">Account</p>
                    <nav aria-label="Settings" className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                        {sidebarNavItems.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
                                prefetch
                                aria-current={currentPath === item.url ? 'page' : undefined}
                                className={cn(
                                    'text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-ring flex min-h-16 min-w-0 items-center justify-center gap-2 rounded-xl border border-transparent px-2 py-3 text-center text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm lg:min-h-11 lg:justify-start lg:gap-3 lg:px-3 lg:py-2 lg:text-left',
                                    currentPath === item.url && 'border-border bg-accent text-accent-foreground shadow-sm',
                                )}
                            >
                                <item.icon className="size-4 shrink-0" aria-hidden="true" />
                                <span className="truncate">{item.title}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>

                <section className="min-w-0 space-y-6">{children}</section>
            </div>
        </main>
    );
}
