import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import UserLayout from '@/Layouts/UserLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="relative min-h-screen">
            <div className="absolute top-0 -z-10 -mt-20 h-full w-full bg-[url('/img/ohsheet_cover_whitebg.png')] bg-cover bg-center opacity-[0.08]"></div>

            <div className="relative min-h-[calc(100vh-200px)]">
                <UserLayout>
                    <Head title="Forgot Password" />

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="relative -mt-20 flex h-screen flex-col items-center justify-center">
                            <div className="w-[600px] max-w-[90%] rounded bg-white p-8 shadow-none md:shadow-lg">
                                <h1 className="mb-10 text-3xl font-extrabold leading-normal text-primary">
                                    Forget Password
                                </h1>
                                <div className="mb-4 text-sm text-gray-600">
                                    Forgot your password? No problem. Just let
                                    us know your email address and we will email
                                    you a password reset link that will allow
                                    you to choose a new one.
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Email Password Reset Link
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
