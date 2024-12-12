import ConfirmDialog from '@/Components/ConfirmDialog';
import CustomPagination from '@/Components/CustomPagination';
import HeaderSearch from '@/Components/HeaderSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    EyeIcon,
    TrashIcon,
    UserCheckIcon,
    UserPlusIcon,
    UserXIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    profilePicture?: string;
}

interface ManageUsersProps {
    paginatedUsers: {
        data: User[];
        current_page: number;
        last_page: number;
    };
    paginatedBannedUsers: {
        data: User[];
        current_page: number;
        last_page: number;
    };
    queryParameters: Record<
        string,
        string | number | boolean | string[] | number[] | undefined
    >;
}

export default function ManageUsers({
    paginatedUsers,
    paginatedBannedUsers,
    queryParameters,
}: ManageUsersProps) {
    queryParameters = queryParameters || {};
    const [activeTab, setActiveTab] = useState('Users');

    const handleBanUser = (id: number) => {
        router.delete(route('admin.banUser', id), {
            onSuccess: () => {
                toast.success('User Banned Successfully!');
            },
            onError: () => {
                toast.error('Error Banning User.');
            },
            preserveScroll: true,
        });
    };

    const handleUnbanUser = (id: number) => {
        router.patch(
            route('admin.unbanUser', id),
            {},
            {
                onSuccess: () => {
                    toast.success('User Unbanned Successfully!');
                },
                onError: () => {
                    toast.error('Error Unbanning User.');
                },
                preserveScroll: true,
            },
        );
    };

    function handleSearch(param: string, text: string) {
        if (text) queryParameters[param] = text;
        else delete queryParameters[param];

        router.get(route('admin.users'), queryParameters, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout>
            <Head title="Manage Users" />
            <div className="container mx-auto px-4 py-8">
                <Tabs
                    defaultValue="Users"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="mb-2 text-4xl font-extrabold text-gray-800">
                                {activeTab === 'Users'
                                    ? 'All Users'
                                    : 'Banned Users'}
                            </h1>
                            <p className="text-gray-500">
                                {activeTab === 'Users'
                                    ? 'Manage and monitor active users'
                                    : 'View and manage banned users'}
                            </p>
                        </div>
                        <HeaderSearch
                            handleSearch={(text) =>
                                handleSearch(
                                    activeTab === 'Users'
                                        ? 'searchUsers'
                                        : 'searchBannedUsers',
                                    text,
                                )
                            }
                            className="w-full max-w-md"
                            inputProps={{
                                placeholder: `Search ${activeTab} Users`,
                            }}
                        />
                    </div>

                    <TabsList className="mb-4">
                        <TabsTrigger value="Users">
                            <UserCheckIcon className="mr-2 h-4 w-4" />
                            Active Users
                        </TabsTrigger>
                        <TabsTrigger value="Banned">
                            <UserXIcon className="mr-2 h-4 w-4" />
                            Banned Users
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="Users">
                        {paginatedUsers.data.length === 0 ? (
                            <div className="rounded-lg bg-gray-50 py-16 text-center">
                                <EyeIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                                <p className="text-xl text-gray-600">
                                    No active users found.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {paginatedUsers.data.map((user) => (
                                        <div
                                            key={user.id}
                                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-center p-4">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={
                                                            user.profilePicture
                                                        }
                                                        alt={user.fullname}
                                                        className="mr-4 h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                        <UserPlusIcon className="text-gray-500" />
                                                    </div>
                                                )}
                                                <div className="h-28">
                                                    <h2 className="mb-1 text-xl font-bold text-gray-800">
                                                        {user.fullname}
                                                    </h2>
                                                    <p className="text-sm text-gray-600">
                                                        @{user.username}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t p-4">
                                                <ConfirmDialog
                                                    trigger={
                                                        <button className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-red-500 transition-colors hover:bg-red-500/10">
                                                            <TrashIcon className="h-4 w-4" />
                                                            Ban User
                                                        </button>
                                                    }
                                                    title="Confirm Ban"
                                                    description="Are you sure you want to ban this user? They will lose account access."
                                                    accept="Ban User"
                                                    cancel="Cancel"
                                                    onclick={() =>
                                                        handleBanUser(user.id)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <CustomPagination page={paginatedUsers} />
                                </div>
                            </>
                        )}
                    </TabsContent>

                    <TabsContent value="Banned">
                        {paginatedBannedUsers.data.length === 0 ? (
                            <div className="rounded-lg bg-gray-50 py-16 text-center">
                                <EyeIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                                <p className="text-xl text-gray-600">
                                    No banned users found.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {paginatedBannedUsers.data.map((user) => (
                                        <div
                                            key={user.id}
                                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-center p-4">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={
                                                            user.profilePicture
                                                        }
                                                        alt={user.fullname}
                                                        className="mr-4 h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                        <UserXIcon className="text-gray-500" />
                                                    </div>
                                                )}
                                                <div className="h-28">
                                                    <h2 className="mb-1 text-xl font-bold text-gray-800">
                                                        {user.fullname}
                                                    </h2>
                                                    <p className="text-sm text-gray-600">
                                                        @{user.username}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t p-4">
                                                <ConfirmDialog
                                                    trigger={
                                                        <button className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-emerald-500 transition-colors hover:bg-emerald-500/10">
                                                            <UserCheckIcon className="h-4 w-4" />
                                                            Unban User
                                                        </button>
                                                    }
                                                    title="Confirm Unban"
                                                    description="Are you sure you want to unban this user? They will regain account access."
                                                    accept="Unban User"
                                                    cancel="Cancel"
                                                    onclick={() =>
                                                        handleUnbanUser(user.id)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <CustomPagination
                                        page={paginatedBannedUsers}
                                    />
                                </div>
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
