import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        fullname: '',
        email: '',
        social_username: '',
        contact_number: '',
        default_address: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative min-h-screen">
            <div className="absolute top-0 -z-10 -mt-20 h-full w-full bg-[url('/img/ohsheet_cover_whitebg.png')] bg-cover bg-center opacity-[0.08]"></div>

            <div className="relative min-h-[calc(100vh-200px)]">
                <UserLayout className="relative">
                    <Head title="Register" />

                    <form onSubmit={submit}>
                        <div className="relative flex flex-col items-center justify-center">
                            <div className="w-[600px] max-w-[90%] rounded bg-white p-8 shadow-none md:shadow-lg">
                                <h1 className="mb-10 text-4xl font-extrabold leading-normal text-primary">
                                    Create Account
                                </h1>{' '}
                                <div className="space-y-2">
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Full Name"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.fullname}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    'fullname',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.fullname}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="username"
                                            value="Username"
                                        />
                                        <TextInput
                                            id="username"
                                            name="username"
                                            value={data.username}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    'username',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.username}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="social_username"
                                            value="Social Username"
                                        />
                                        <TextInput
                                            id="social_username"
                                            name="social_username"
                                            value={data.social_username}
                                            className="mt-1 block w-full"
                                            autoComplete="social_username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    'social_username',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.social_username}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="contact_number"
                                            value="Contact Number"
                                        />
                                        <TextInput
                                            id="contact_number"
                                            name="contact_number"
                                            value={data.contact_number}
                                            className="mt-1 block w-full"
                                            autoComplete="contact_number"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    'contact_number',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.contact_number}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="default_address"
                                            value="Address"
                                        />
                                        <TextInput
                                            id="default_address"
                                            name="default_address"
                                            value={data.default_address}
                                            className="mt-1 block w-full"
                                            autoComplete="default_address"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    'default_address',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.default_address}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
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
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                        />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <Link
                                        href={route('login')}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Already registered?
                                    </Link>

                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Register
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </UserLayout>
            </div>
        </div>
    );
}
