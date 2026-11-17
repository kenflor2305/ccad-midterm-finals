import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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
    label.replace(/<[^>]*>/g, '').replace(/&laquo;/g, '«').replace(/&raquo;/g, '»').replace(/&amp;/g, '&');

function statusClass(status: string, type: 'payment' | 'approval'): string {
    if (type === 'payment') {
        return {
            Paid: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
            Partial: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
            Unpaid: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
        }[status] ?? 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300';
    }

    return {
        Approved: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
        Pending: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
        Rejected: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300',
    }[status] ?? 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300';
}

export default function AdoptionIndex({ adoptions }: AdoptionIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adoptions" />

            <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Shelter management</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Adoptions</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Review adoption requests, animal details, and payment status.</p>
                    </div>
                    <Button asChild>
                        <Link href={route('adoptions.create')}>
                            <Plus aria-hidden="true" />
                            Create adoption
                        </Link>
                    </Button>
                </header>

                <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-muted/40 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="px-5 py-3">Adopter</th>
                                    <th className="px-5 py-3">Animal</th>
                                    <th className="whitespace-nowrap px-5 py-4">Adoption Date</th>
                                    <th className="px-5 py-4 text-right">Fee</th>
                                    <th className="px-5 py-4">Payment</th>
                                    <th className="px-5 py-4">Approval</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {adoptions.data.map((adoption) => (
                                    <tr key={adoption.id} className="transition-colors hover:bg-muted/30">
                                        <td className="whitespace-nowrap px-5 py-4 font-medium">{adoption.adopter?.name ?? 'Unknown adopter'}</td>
                                        <td className="min-w-52 px-5 py-4">
                                            <div className="font-medium">{adoption.shelter_animal?.pet_name ?? 'Unknown animal'}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {adoption.shelter_animal?.animal_type} · {adoption.shelter_animal?.microchip_id}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{adoption.adoption_date ?? '—'}</td>
                                        <td className="whitespace-nowrap px-5 py-4 text-right font-medium tabular-nums">${Number(adoption.adoption_fee).toFixed(2)}</td>
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
                                {adoptions.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-14 text-center">
                                            <p className="font-medium">No adoption records yet</p>
                                            <p className="mt-1 text-sm text-muted-foreground">Create an adoption to see it listed here.</p>
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
