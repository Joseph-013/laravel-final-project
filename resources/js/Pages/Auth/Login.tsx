import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Line from '@/Components/Line';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
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

    // status = 'Successfully logged out.';

    return (
        <div className="relative min-h-screen">
            <div className="absolute top-0 -z-10 -mt-20 h-full w-full bg-[url('/img/ohsheet_cover_whitebg.png')] bg-cover bg-center opacity-[0.08]"></div>

            <div className="relative min-h-[calc(100vh-200px)]">
                <GuestLayout className="relative">
                    <Head title="Log in" />

                    <form onSubmit={submit}>
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        <div className="relative -mt-20 flex h-screen flex-col items-center justify-center">
                            <div className="w-[600px] max-w-[90%] rounded bg-white p-8 shadow-none md:shadow-lg">
                                <h1 className="mb-10 text-4xl font-extrabold leading-normal text-primary">
                                    Sign in
                                </h1>
                                {/* <p className="text-sm leading-normal">
                                    Paper, prints, and many more. 🖨️
                                </p> */}
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Log in
                                    </PrimaryButton>
                                </div>
                                <Line variant={'h'} className="my-4" />{' '}
                                <div className="mt-6 flex items-center justify-center">
                                    <Link
                                        href={route('register')}
                                        target="_blank"
                                        className="inline-flex items-center text-center text-sm font-bold text-primary hover:text-primary/80"
                                    >
                                        <span>
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </span>
                                        <span className="ml-2">
                                            You don't have an account?
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </GuestLayout>
            </div>
        </div>
    );
}
