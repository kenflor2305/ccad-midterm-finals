import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Upload } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const avatarInput = useRef<HTMLInputElement>(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <section className="bg-card min-w-0 rounded-2xl border p-5 shadow-sm sm:p-7">
                    <div className="mb-7 border-b pb-5">
                        <HeadingSmall title="Profile information" description="Update your name and email address" />
                    </div>

                    <form onSubmit={submit} className="space-y-7">
                        <div className="bg-muted/20 flex flex-col gap-4 rounded-xl border border-dashed p-4 sm:flex-row sm:items-center sm:p-5">
                            <Avatar className="border-background size-20 border-2 shadow-md">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="text-lg font-semibold">{getInitials(auth.user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1 space-y-2">
                                <div>
                                    <Label htmlFor="avatar" className="text-sm font-medium">
                                        Profile photo
                                    </Label>
                                    <p id="avatar-help" className="text-muted-foreground mt-1 text-sm">
                                        Choose a clear photo. JPG, PNG, or GIF up to 2 MB.
                                    </p>
                                </div>
                                <Input
                                    ref={avatarInput}
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setData('avatar', event.target.files?.[0] ?? null)}
                                    className="sr-only"
                                    aria-describedby="avatar-help"
                                />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-lg"
                                        disabled={processing}
                                        onClick={() => avatarInput.current?.click()}
                                    >
                                        <Upload aria-hidden="true" />
                                        Choose photo
                                    </Button>
                                    {data.avatar && <span className="text-muted-foreground max-w-full truncate text-xs">{data.avatar.name}</span>}
                                </div>
                                <InputError message={errors.avatar} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="h-11 w-full rounded-lg"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="h-11 w-full rounded-lg"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="font-medium underline underline-offset-4 hover:text-amber-600 dark:hover:text-amber-100"
                                    >
                                        Resend verification email
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div role="status" className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} className="min-w-32 rounded-lg">
                                {processing && <LoaderCircle className="size-4 animate-spin" />}
                                Save changes
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p role="status" className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    Saved
                                </p>
                            </Transition>
                        </div>
                    </form>
                </section>

                <section className="bg-card min-w-0 rounded-2xl border p-5 shadow-sm sm:p-7">
                    <DeleteUser />
                </section>
            </SettingsLayout>
        </AppLayout>
    );
}
