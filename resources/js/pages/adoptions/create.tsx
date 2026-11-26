import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, HeartHandshake } from 'lucide-react';
import { type FormEventHandler } from 'react';

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
                        <p className="text-muted-foreground text-sm font-medium">Shelter management</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Create adoption</h1>
                        <p className="text-muted-foreground mt-2 text-sm">Record an adopter, animal, and adoption details.</p>
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
                        <CardHeader className="bg-muted/20 border-b">
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
                                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-24 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.adopter_address} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="bg-muted/20 border-b">
                            <CardTitle className="text-base">Adoption details</CardTitle>
                            <CardDescription>Select the animal and record the request status and fee.</CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="shelter_animal_id">Animal</Label>
                                <select
                                    id="shelter_animal_id"
                                    value={data.shelter_animal_id}
                                    onChange={(event) => setData('shelter_animal_id', event.target.value)}
                                    required
                                    className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                                >
                                    <option value="" disabled>
                                        Select an animal
                                    </option>
                                    {animals.map((animal) => (
                                        <option key={animal.id} value={animal.id}>
                                            {animal.pet_name} ({animal.animal_type}) - {animal.microchip_id}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.shelter_animal_id} />
                                {animals.length === 0 && (
                                    <div className="bg-muted/20 flex flex-col gap-2 rounded-lg border border-dashed p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-muted-foreground">No shelter animals are available to select yet.</p>
                                        <Link
                                            href={route('shelter-animals.create')}
                                            className="text-primary font-medium underline-offset-4 hover:underline"
                                        >
                                            Add a shelter animal
                                        </Link>
                                    </div>
                                )}
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
                                    className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
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
                                    className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
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
