import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ShelterAnimal {
    id: number;
    animal_type: string;
    pet_name: string;
    microchip_id: string;
    intake_date: string;
    spay_neuter_status: string;
    adoptions_count: number;
}

interface ShelterAnimalsIndexProps {
    success?: string | null;
    animals: {
        data: ShelterAnimal[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Shelter Animals', href: '/shelter-animals' }];
const intakeDateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
});

const formatIntakeDate = (value: string) => {
    const parts = intakeDateFormatter.formatToParts(new Date(value));
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)!.value;

    return `${part('month')}, ${part('day')}, ${part('year')} – ${part('hour')}:${part('minute')} ${part('dayPeriod')}`;
};

const paginationLabel = (label: string) =>
    label
        .replace(/<[^>]*>/g, '')
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&amp;/g, '&');

export default function ShelterAnimalsIndex({ animals, success }: ShelterAnimalsIndexProps) {
    const [query, setQuery] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const visibleAnimals = useMemo(() => {
        const search = query.trim().toLocaleLowerCase();

        if (!search) return animals.data;

        return animals.data.filter((animal) =>
            [animal.pet_name, animal.animal_type, animal.microchip_id, animal.spay_neuter_status].some((value) =>
                value.toLocaleLowerCase().includes(search),
            ),
        );
    }, [animals.data, query]);

    const deleteAnimal = (animal: ShelterAnimal) => {
        const linkedAdoptions = animal.adoptions_count
            ? ` This will also permanently delete ${animal.adoptions_count} linked adoption record${animal.adoptions_count === 1 ? '' : 's'}.`
            : '';

        if (!window.confirm(`Delete ${animal.pet_name}?${linkedAdoptions} This action cannot be undone.`)) {
            return;
        }

        setDeletingId(animal.id);
        router.delete(route('shelter-animals.destroy', animal.id), {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shelter Animals" />

            <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <header className="relative overflow-hidden rounded-2xl border border-teal-900/10 bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900 px-6 py-7 text-white shadow-lg shadow-teal-950/10 md:px-8">
                    <div
                        className="pointer-events-none absolute -top-20 right-8 size-48 rounded-full border-[28px] border-white/5"
                        aria-hidden="true"
                    />
                    <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-medium tracking-[0.16em] text-teal-200 uppercase">Shelter management</p>
                            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Shelter Animals</h1>
                            <p className="mt-2 max-w-xl text-sm text-teal-100">Manage animal profiles, microchips, and care status.</p>
                        </div>
                        <Button asChild className="bg-white text-teal-950 hover:bg-teal-50">
                            <Link href={route('shelter-animals.create')}>
                                <Plus aria-hidden="true" />
                                Add animal
                            </Link>
                        </Button>
                    </div>
                </header>

                {success && (
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-800 dark:text-emerald-300"
                    >
                        <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
                        {success}
                    </div>
                )}

                <section className="bg-card overflow-hidden rounded-xl border shadow-sm">
                    <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Animal records</h2>
                            <p className="text-muted-foreground mt-1 text-xs">{animals.data.length} records on this page</p>
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
                                aria-label="Search animals on this page"
                                className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border pr-3 pl-9 text-sm shadow-xs transition outline-none focus-visible:ring-2"
                            />
                        </label>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/40 text-muted-foreground border-b text-xs font-semibold tracking-wide uppercase">
                                <tr>
                                    <th className="px-5 py-4">Animal</th>
                                    <th className="px-5 py-4">Microchip</th>
                                    <th className="px-5 py-4 whitespace-nowrap">Intake Date</th>
                                    <th className="px-5 py-4">Spay/Neuter</th>
                                    <th className="px-5 py-4 text-right">Adoptions</th>
                                    <th className="w-28 px-4 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {visibleAnimals.map((animal) => (
                                    <tr key={animal.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-medium">{animal.pet_name}</p>
                                            <p className="text-muted-foreground text-xs">{animal.animal_type}</p>
                                        </td>
                                        <td className="px-5 py-4 font-mono text-xs">{animal.microchip_id}</td>
                                        <td className="text-muted-foreground px-5 py-4 whitespace-nowrap">{formatIntakeDate(animal.intake_date)}</td>
                                        <td className="px-5 py-4">
                                            <Badge variant="outline">{animal.spay_neuter_status}</Badge>
                                        </td>
                                        <td className="px-5 py-4 text-right tabular-nums">{animal.adoptions_count}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-9 text-sky-600 hover:bg-sky-500/10 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
                                                >
                                                    <Link
                                                        href={route('shelter-animals.edit', animal.id)}
                                                        aria-label={`Edit ${animal.pet_name}`}
                                                        title={`Edit ${animal.pet_name}`}
                                                    >
                                                        <Pencil aria-hidden="true" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-9 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200"
                                                    aria-label={`Delete ${animal.pet_name}`}
                                                    title={`Delete ${animal.pet_name}`}
                                                    disabled={deletingId === animal.id}
                                                    onClick={() => deleteAnimal(animal)}
                                                >
                                                    <Trash2 aria-hidden="true" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {visibleAnimals.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-14 text-center">
                                            <p className="font-medium">
                                                {animals.data.length === 0 ? 'No shelter animals yet' : 'No matching animals'}
                                            </p>
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                {animals.data.length === 0
                                                    ? 'Add an animal to start tracking shelter records.'
                                                    : 'Try a different search term.'}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {animals.links.length > 3 && (
                        <nav aria-label="Pagination" className="flex flex-wrap gap-2 border-t p-4">
                            {animals.links.map((link, index) => (
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
