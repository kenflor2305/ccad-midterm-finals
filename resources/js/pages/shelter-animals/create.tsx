import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, PawPrint } from 'lucide-react';
import { type FormEventHandler } from 'react';

interface AnimalFormData {
    id: number;
    animal_type: string;
    pet_name: string;
    microchip_id: string;
    intake_date: string;
    spay_neuter_status: string;
}

export default function CreateShelterAnimal({ animal }: { animal?: AnimalFormData }) {
    const isEditing = Boolean(animal);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Shelter Animals', href: '/shelter-animals' },
        {
            title: isEditing ? 'Edit animal' : 'Add animal',
            href: isEditing ? route('shelter-animals.edit', animal?.id) : route('shelter-animals.create'),
        },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        animal_type: animal?.animal_type ?? '',
        pet_name: animal?.pet_name ?? '',
        microchip_id: animal?.microchip_id ?? '',
        intake_date: animal?.intake_date ?? '',
        spay_neuter_status: animal?.spay_neuter_status ?? 'Pending',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        if (animal) {
            put(route('shelter-animals.update', animal.id));
            return;
        }

        post(route('shelter-animals.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Shelter Animal' : 'Add Shelter Animal'} />

            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
                <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-muted-foreground text-sm font-medium">Shelter management</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                            {isEditing ? 'Edit shelter animal' : 'Add shelter animal'}
                        </h1>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {isEditing ? 'Update this animal profile and care details.' : 'Create an animal profile and record its intake details.'}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={route('shelter-animals.index')}>
                            <ArrowLeft aria-hidden="true" />
                            Back to animals
                        </Link>
                    </Button>
                </header>

                <form onSubmit={submit}>
                    <Card className="shadow-sm">
                        <CardHeader className="bg-muted/20 border-b">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                    <PawPrint className="size-5" aria-hidden="true" />
                                </span>
                                <div>
                                    <CardTitle className="text-base">Animal information</CardTitle>
                                    <CardDescription className="mt-1">Enter the animal's identification and care status.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="pet_name">Pet Name</Label>
                                <Input id="pet_name" value={data.pet_name} onChange={(event) => setData('pet_name', event.target.value)} required />
                                <InputError message={errors.pet_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="animal_type">Animal Type</Label>
                                <Input
                                    id="animal_type"
                                    value={data.animal_type}
                                    onChange={(event) => setData('animal_type', event.target.value)}
                                    required
                                />
                                <InputError message={errors.animal_type} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="microchip_id">Microchip ID</Label>
                                <Input
                                    id="microchip_id"
                                    value={data.microchip_id}
                                    onChange={(event) => setData('microchip_id', event.target.value)}
                                    required
                                />
                                <InputError message={errors.microchip_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="intake_date">Intake Date</Label>
                                <Input
                                    id="intake_date"
                                    type="date"
                                    value={data.intake_date}
                                    onChange={(event) => setData('intake_date', event.target.value)}
                                    required
                                />
                                <InputError message={errors.intake_date} />
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="spay_neuter_status">Spay/Neuter Status</Label>
                                <select
                                    id="spay_neuter_status"
                                    value={data.spay_neuter_status}
                                    onChange={(event) => setData('spay_neuter_status', event.target.value)}
                                    required
                                    className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Not Required">Not Required</option>
                                </select>
                                <InputError message={errors.spay_neuter_status} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
                        <Button variant="outline" type="button" asChild>
                            <Link href={route('shelter-animals.index')}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-36">
                            {processing ? 'Saving…' : isEditing ? 'Save changes' : 'Save Animal'}
                        </Button>
                    </div>
                </form>
            </main>
        </AppLayout>
    );
}
