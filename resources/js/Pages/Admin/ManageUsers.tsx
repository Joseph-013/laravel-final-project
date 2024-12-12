import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  TrashIcon, 
  EyeIcon,
  UserPlusIcon,
  UserCheckIcon,
  UserXIcon 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import ConfirmDialog from '@/Components/ConfirmDialog';
import CustomPagination from '@/Components/CustomPagination';
import HeaderSearch from '@/Components/HeaderSearch';

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
    queryParameters: Record<string, string | number | boolean | string[] | number[] | undefined>;
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
            }
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
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                                {activeTab === 'Users' ? 'All Users' : 'Banned Users'}
                            </h1>
                            <p className="text-gray-500">
                                {activeTab === 'Users' 
                                    ? 'Manage and monitor active users' 
                                    : 'View and manage banned users'}
                            </p>
                        </div>
                        <HeaderSearch
                            handleSearch={(text) => handleSearch(
                                activeTab === 'Users' ? 'searchUsers' : 'searchBannedUsers', 
                                text
                            )}
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
                            <div className="text-center py-16 bg-gray-50 rounded-lg">
                                <EyeIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                                <p className="text-xl text-gray-600">
                                    No active users found.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {paginatedUsers.data.map((user) => (
                                        <div 
                                            key={user.id} 
                                            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
                                        >
                                            <div className="p-4 flex items-center">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={user.profilePicture}
                                                        alt={user.fullname}
                                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                                                        <UserPlusIcon className="text-gray-500" />
                                                    </div>
                                                )}
                                                <div className='h-28'>
                                                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                                                        {user.fullname}
                                                    </h2>
                                                    <p className="text-gray-600 text-sm">
                                                        @{user.username}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t p-4">
                                                <ConfirmDialog
                                                    trigger={
                                                        <button className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 px-3 py-2 rounded-md transition-colors">
                                                            <TrashIcon className="w-4 h-4" />
                                                            Ban User
                                                        </button>
                                                    }
                                                    title="Confirm Ban"
                                                    description="Are you sure you want to ban this user? They will lose account access."
                                                    accept="Ban User"
                                                    cancel="Cancel"
                                                    onclick={() => handleBanUser(user.id)}
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
                            <div className="text-center py-16 bg-gray-50 rounded-lg">
                                <EyeIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                                <p className="text-xl text-gray-600">
                                    No banned users found.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {paginatedBannedUsers.data.map((user) => (
                                        <div 
                                            key={user.id} 
                                            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
                                        >
                                            <div className="p-4 flex items-center">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={user.profilePicture}
                                                        alt={user.fullname}
                                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                                                        <UserXIcon className="text-gray-500" />
                                                    </div>
                                                )}
                                                <div className='h-28'>
                                                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                                                        {user.fullname}
                                                    </h2>
                                                    <p className="text-gray-600 text-sm">
                                                        @{user.username}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t p-4">
                                                <ConfirmDialog
                                                    trigger={
                                                        <button className="w-full flex items-center justify-center gap-2 text-emerald-500 hover:bg-emerald-500/10 px-3 py-2 rounded-md transition-colors">
                                                            <UserCheckIcon className="w-4 h-4" />
                                                            Unban User
                                                        </button>
                                                    }
                                                    title="Confirm Unban"
                                                    description="Are you sure you want to unban this user? They will regain account access."
                                                    accept="Unban User"
                                                    cancel="Cancel"
                                                    onclick={() => handleUnbanUser(user.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <CustomPagination page={paginatedBannedUsers} />
                                </div>
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}