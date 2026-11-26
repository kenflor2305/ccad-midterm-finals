import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-7" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2.5">
                        <Label htmlFor="email" className="text-sm font-medium text-zinc-200">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            disabled={processing}
                            className="h-12 rounded-xl border-white/10 bg-zinc-950/70 px-4 text-base text-white shadow-inner shadow-black/10 placeholder:text-zinc-600 focus-visible:border-teal-400/70 focus-visible:ring-teal-400/30 md:text-sm"
                        />
                        <InputError message={errors.email} className="text-rose-400" />
                    </div>

                    <div className="grid gap-2.5">
                        <Label htmlFor="password" className="text-sm font-medium text-zinc-200">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                disabled={processing}
                                className="h-12 rounded-xl border-white/10 bg-zinc-950/70 px-4 pr-12 text-base text-white shadow-inner shadow-black/10 placeholder:text-zinc-600 focus-visible:border-teal-400/70 focus-visible:ring-teal-400/30 md:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-4 text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal-300 disabled:pointer-events-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                aria-pressed={showPassword}
                                disabled={processing}
                                onClick={() => setShowPassword((visible) => !visible)}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        <InputError message={errors.password} className="text-rose-400" />
                    </div>

                    <div className="flex min-h-6 items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked === true)}
                                className="size-4 rounded border-white/20 bg-zinc-950 focus-visible:ring-teal-400/50 focus-visible:ring-offset-zinc-900 data-[state=checked]:border-teal-400 data-[state=checked]:bg-teal-400 data-[state=checked]:text-zinc-950"
                            />
                            <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-zinc-300">
                                Remember me
                            </Label>
                        </div>
                        {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="shrink-0 text-right text-sm font-medium text-teal-300 no-underline hover:text-teal-200 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                            >
                                Forgot password?
                            </TextLink>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-1 h-12 w-full rounded-xl bg-teal-400 text-base font-semibold text-zinc-950 shadow-lg shadow-teal-950/30 transition-all hover:bg-teal-300 hover:shadow-teal-900/30 focus-visible:ring-teal-300 focus-visible:ring-offset-zinc-900"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="size-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="border-t border-white/10 pt-5 text-center text-sm text-zinc-400">
                    Don't have an account?{' '}
                    <TextLink
                        href={route('register')}
                        className="font-medium text-teal-300 no-underline hover:text-teal-200 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                    >
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && (
                <div
                    role="status"
                    className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-center text-sm font-medium text-emerald-300"
                >
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
