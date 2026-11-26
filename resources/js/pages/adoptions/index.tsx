import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface AdoptionRow {
    id: number;
    adopter: { name: string } | null;
    shelter_animal: { pet_name: string; animal_type: string; microchip_id: string } | null;
    adoption_date: string | null;
    adoption_fee: string | number;
    payment_status: string;
    approval_status: string;
}

interface AdoptionIndexProps {
    adoptions: {
        data: AdoptionRow[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Adoptions', href: '/adoptions' }];
const paginationLabel = (label: string) =>
    label
        .replace(/<[^>]*>/g, '')
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&amp;/g, '&');

function statusClass(status: string, type: 'payment' | 'approval'): string {
    if (type === 'payment') {
        return (
            {
                Paid: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
                Partial: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
                Unpaid: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
            }[status] ?? 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        );
    }

    return (
        {
            Approved: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
            Pending: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
            Rejected: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300',
        }[status] ?? 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
    );
}

export default function AdoptionIndex({ adoptions }: AdoptionIndexProps) {
    const [query, setQuery] = useState('');
    const visibleAdoptions = useMemo(() => {
        const search = query.trim().toLocaleLowerCase();

        if (!search) return adoptions.data;

        return adoptions.data.filter((adoption) =>
            [
                adoption.adopter?.name,
                adoption.shelter_animal?.pet_name,
                adoption.shelter_animal?.animal_type,
                adoption.shelter_animal?.microchip_id,
                adoption.approval_status,
                adoption.payment_status,
            ]
                .filter(Boolean)
                .some((value) => value!.toLocaleLowerCase().includes(search)),
        );
    }, [adoptions.data, query]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adoptions" />

            <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <header className="relative overflow-hidden rounded-2xl border border-teal-900/10 bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900 px-6 py-7 text-white shadow-lg shadow-teal-950/10 md:px-8">
                    <div
                        className="pointer-events-none absolute -top-20 right-8 size-48 rounded-full border-[28px] border-white/5"
                        aria-hidden="true"
                    />
                    <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-medium tracking-[0.16em] text-teal-200 uppercase">Shelter management</p>
                            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Adoptions</h1>
                            <p className="mt-2 max-w-xl text-sm text-teal-100">Review adoption requests, animal details, and payment status.</p>
                        </div>
                        <Button asChild className="bg-white text-teal-950 hover:bg-teal-50">
                            <Link href={route('adoptions.create')}>
                                <Plus aria-hidden="true" />
                                Create adoption
                            </Link>
                        </Button>
                    </div>
                </header>

                <section className="bg-card overflow-hidden rounded-xl border shadow-sm">
                    <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Adoption records</h2>
                            <p className="text-muted-foreground mt-1 text-xs">{adoptions.data.length} records on this page</p>
                        </div>
                        <label className="relative block w-full sm:max-w-xs">
                            <Search
                                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                                aria-hidden="true"
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search current page..."
                                aria-label="Search adoption records on this page"
                                className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border pr-3 pl-9 text-sm shadow-xs transition outline-none focus-visible:ring-2"
                            />
                        </label>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/40 text-muted-foreground border-b text-xs font-semibold tracking-wide uppercase">
                                <tr>
                                    <th className="px-5 py-3">Adopter</th>
                                    <th className="px-5 py-3">Animal</th>
                                    <th className="px-5 py-4 whitespace-nowrap">Adoption Date</th>
                                    <th className="px-5 py-4 text-right">Fee</th>
                                    <th className="px-5 py-4">Payment</th>
                                    <th className="px-5 py-4">Approval</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {visibleAdoptions.map((adoption) => (
                                    <tr key={adoption.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-5 py-4 font-medium whitespace-nowrap">{adoption.adopter?.name ?? 'Unknown adopter'}</td>
                                        <td className="min-w-52 px-5 py-4">
                                            <div className="font-medium">{adoption.shelter_animal?.pet_name ?? 'Unknown animal'}</div>
                                            <div className="text-muted-foreground text-xs">
                                                {adoption.shelter_animal?.animal_type} · {adoption.shelter_animal?.microchip_id}
                                            </div>
                                        </td>
                                        <td className="text-muted-foreground px-5 py-4 whitespace-nowrap">{adoption.adoption_date ?? '—'}</td>
                                        <td className="px-5 py-4 text-right font-medium whitespace-nowrap tabular-nums">
                                            ${Number(adoption.adoption_fee).toFixed(2)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge variant="outline" className={statusClass(adoption.payment_status, 'payment')}>
                                                {adoption.payment_status}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge variant="outline" className={statusClass(adoption.approval_status, 'approval')}>
                                                {adoption.approval_status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {visibleAdoptions.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-14 text-center">
                                            <p className="font-medium">
                                                {adoptions.data.length === 0 ? 'No adoption records yet' : 'No matching adoptions'}
                                            </p>
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                {adoptions.data.length === 0
                                                    ? 'Create an adoption to see it listed here.'
                                                    : 'Try a different search term.'}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {adoptions.links.length > 3 && (
                        <nav aria-label="Pagination" className="flex flex-wrap gap-2 border-t p-4">
                            {adoptions.links.map((link, index) => (
                                <Button
                                    key={`${index}-${link.label}`}
                                    asChild={Boolean(link.url)}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                >
                                    {link.url ? <Link href={link.url}>{paginationLabel(link.label)}</Link> : paginationLabel(link.label)}
                                </Button>
                            ))}
                        </nav>
                    )}
                </section>
            </main>
        </AppLayout>
    );
}
