import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, ChevronsUpDown, HeartHandshake } from 'lucide-react';
import { useMemo, useState, type FormEventHandler } from 'react';

interface AnimalOption {
    id: number;
    pet_name: string;
    animal_type: string;
    microchip_id: string;
    spay_neuter_status: string;
}

interface CreateAdoptionProps {
    animals: AnimalOption[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adoptions', href: '/adoptions' },
    { title: 'Create adoption', href: '/adoptions/create' },
];

export default function CreateAdoption({ animals }: CreateAdoptionProps) {
    const { data, setData, post, processing, errors } = useForm({
        adopter_name: '',
        adopter_phone: '',
        adopter_address: '',
        shelter_animal_id: '',
        adoption_date: '',
        adoption_fee: '0',
        payment_status: 'Unpaid',
        approval_status: 'Pending',
    });
    const [animalQuery, setAnimalQuery] = useState('');
    const selectedAnimal = animals.find((animal) => String(animal.id) === data.shelter_animal_id) ?? null;
    const filteredAnimals = useMemo(() => {
        const query = animalQuery.trim().toLocaleLowerCase();

        if (!query) {
            return animals;
        }

        return animals.filter((animal) =>
            `${animal.pet_name} ${animal.animal_type} ${animal.microchip_id}`.toLocaleLowerCase().includes(query),
        );
    }, [animalQuery, animals]);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('adoptions.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Adoption" />

            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Shelter management</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Create adoption</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Record an adopter, animal, and adoption details.</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={route('adoptions.index')}>
                            <ArrowLeft aria-hidden="true" />
                            Back to adoptions
                        </Link>
                    </Button>
                </header>

                <form onSubmit={submit} className="space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader className="border-b bg-muted/20">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-md bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300">
                                    <HeartHandshake className="size-5" aria-hidden="true" />
                                </span>
                                <div>
                                    <CardTitle className="text-base">Adopter information</CardTitle>
                                    <CardDescription className="mt-1">Enter the contact details for the person adopting this animal.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="adopter_name">Adopter Name</Label>
                                <Input
                                    id="adopter_name"
                                    value={data.adopter_name}
                                    onChange={(event) => setData('adopter_name', event.target.value)}
                                    required
                                    placeholder="Full name"
                                />
                                <InputError message={errors.adopter_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="adopter_phone">Adopter Phone</Label>
                                <Input
                                    id="adopter_phone"
                                    type="tel"
                                    value={data.adopter_phone}
                                    onChange={(event) => setData('adopter_phone', event.target.value)}
                                    placeholder="Phone number"
                                />
                                <InputError message={errors.adopter_phone} />
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="adopter_address">Adopter Address</Label>
                                <textarea
                                    id="adopter_address"
                                    value={data.adopter_address}
                                    onChange={(event) => setData('adopter_address', event.target.value)}
                                    rows={3}
                                    placeholder="Street address"
                                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.adopter_address} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="border-b bg-muted/20">
                            <CardTitle className="text-base">Adoption details</CardTitle>
                            <CardDescription>Select the animal and record the request status and fee.</CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="shelter_animal_id">Animal</Label>
                                <Combobox
                                    value={selectedAnimal}
                                    onChange={(animal: AnimalOption | null) => {
                                        setData('shelter_animal_id', animal ? String(animal.id) : '');
                                        setAnimalQuery('');
                                    }}
                                    onClose={() => setAnimalQuery('')}
                                >
                                    <div className="relative">
                                        <ComboboxInput
                                            id="shelter_animal_id"
                                            displayValue={(animal: AnimalOption | null) =>
                                                animal ? `${animal.pet_name} (${animal.animal_type}) - ${animal.microchip_id}` : ''
                                            }
                                            onChange={(event) => setAnimalQuery(event.target.value)}
                                            placeholder="Select an animal"
                                            required
                                            autoComplete="off"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                        <ComboboxButton
                                            aria-label="Show animals"
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                                        >
                                            <ChevronsUpDown className="size-4" aria-hidden="true" />
                                        </ComboboxButton>
                                        <ComboboxOptions
                                            anchor="bottom"
                                            className="z-50 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md empty:invisible"
                                        >
                                            {filteredAnimals.map((animal) => (
                                                <ComboboxOption
                                                    key={animal.id}
                                                    value={animal}
                                                    className="group flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm data-[focus]:bg-accent data-[focus]:text-accent-foreground"
                                                >
                                                    <span>
                                                        {animal.pet_name} ({animal.animal_type}) - {animal.microchip_id}
                                                    </span>
                                                    <Check className="invisible size-4 group-data-[selected]:visible" aria-hidden="true" />
                                                </ComboboxOption>
                                            ))}
                                            {filteredAnimals.length === 0 && (
                                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                                    {animals.length === 0 ? 'No shelter animals found.' : 'No matching animals.'}
                                                </div>
                                            )}
                                        </ComboboxOptions>
                                    </div>
                                </Combobox>
                                <InputError message={errors.shelter_animal_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="adoption_date">Adoption Date</Label>
                                <Input
                                    id="adoption_date"
                                    type="date"
                                    value={data.adoption_date}
                                    onChange={(event) => setData('adoption_date', event.target.value)}
                                />
                                <InputError message={errors.adoption_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="adoption_fee">Adoption Fee</Label>
                                <Input
                                    id="adoption_fee"
                                    type="number"
                                    min="0"
                                    max="999999.99"
                                    step="0.01"
                                    value={data.adoption_fee}
                                    onChange={(event) => setData('adoption_fee', event.target.value)}
                                    required
                                />
                                <InputError message={errors.adoption_fee} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="payment_status">Payment Status</Label>
                                <select
                                    id="payment_status"
                                    value={data.payment_status}
                                    onChange={(event) => setData('payment_status', event.target.value)}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Paid">Paid</option>
                                </select>
                                <InputError message={errors.payment_status} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="approval_status">Approval Status</Label>
                                <select
                                    id="approval_status"
                                    value={data.approval_status}
                                    onChange={(event) => setData('approval_status', event.target.value)}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <InputError message={errors.approval_status} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
                        <Button variant="outline" type="button" asChild>
                            <Link href={route('adoptions.index')}>Back to Adoptions</Link>
                        </Button>
                        <Button type="submit" disabled={processing || animals.length === 0} className="min-w-36">
                            {processing ? 'Saving…' : 'Save Adoption'}
                        </Button>
                    </div>
                </form>
            </main>
        </AppLayout>
    );
}
