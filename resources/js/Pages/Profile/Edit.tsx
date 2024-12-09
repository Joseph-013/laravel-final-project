import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { InputContainer } from '../OrderForm';

export default function Edit() {
    return (
        <UserLayout>
            <Head title="Profile" />
            <div className="ml-3 mt-1 text-lg font-bold">Update Profile</div>
            <div className="flex w-full justify-center">
                <div className="flex w-full max-w-[720px] flex-col gap-y-4">
                    <InputContainer title="Update Profile"></InputContainer>
                </div>
            </div>

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div> */}
        </UserLayout>
    );
}
