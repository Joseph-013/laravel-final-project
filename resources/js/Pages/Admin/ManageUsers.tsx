import ConfirmDialog from '@/Components/ConfirmDialog';
import CustomPagination from '@/Components/CustomPagination';
import HeaderSearch from '@/Components/HeaderSearch';
import { Button } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';

//   interface Product {
//     id: number;
//     name: string;
//     description:string;
//     keyword: string;
//     active: boolean;
//     image_file: string | null;
//   }

interface ManageProductsProps {
    // users: User[];
    // bannedUsers: User[];
    paginatedUsers: User[];
    paginatedBannedUsers: User[];

    queryParameters: Record<
        string,
        string | number | boolean | string[] | number[] | undefined
    >;
}

// type AllowedManageProductProps = keyof ManageProductsProps;

export default function ManageUsers({
    // users,
    // bannedUsers,
    paginatedUsers,
    paginatedBannedUsers,
    queryParameters,
}: ManageProductsProps) {
    queryParameters = queryParameters || {};

    const handleDelete = (id: number) => {
        router.delete(route('admin.banUser', id), {
            onSuccess: () => {
                toast.success('User Banned Successfully!');
            },
            onError: () => {
                toast.error('Error Banning User.');
            },
            preserveScroll: true, // Ensures the scroll position is maintained
        });
    };

    const handleRetrieve = (id: number) => {
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

    //     const handleEdit = (product: Product) => {
    //       setSelectedProduct(product);
    //     };

    // const handleUserSearch = (text: string) => {
    //     if (text) queryParameters['searchUsers'] = text;
    //     else delete queryParameters['searchUsers'];
    //     handleSearch();
    // };

    // const handleBannedUserSearch = (text: string) => {
    //     if (text) queryParameters['searchBannedUsers'] = text;
    //     else delete queryParameters['searchBannedUsers'];
    //     handleSearch();
    // };

    function handleSearch(param: string, text: string) {
        if (text) queryParameters[param] = text;
        else delete queryParameters[param];

        router.get(route('admin.users'), queryParameters, {
            preserveState: true,
            preserveScroll: true,
        });

        console.log('queryParameters', queryParameters);
    }

    return (
        <AdminLayout>
            <Head title="Manage Products" />
            <div className="flex items-center justify-between">
                <Tabs defaultValue="Users" className="w-full">
                    <TabsList>
                        <TabsTrigger value="Users">All Users</TabsTrigger>
                        <TabsTrigger value="Banned">Banned Users</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Users">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-extrabold text-primary">
                                All Users
                            </h1>
                            <HeaderSearch
                                handleSearch={(text) =>
                                    handleSearch('searchUsers', text)
                                }
                                className="ml-auto w-96"
                                inputProps={{
                                    placeholder: 'Search Users',
                                }}
                            />
                        </div>
                        <Table>
                            <TableCaption>
                                <CustomPagination page={paginatedUsers} />
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedUsers.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.username}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.fullname}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <ConfirmDialog
                                                    trigger={
                                                        <Button
                                                            variant="destructive"
                                                            className="bg-red-500 text-white hover:bg-red-600"
                                                        >
                                                            Ban User
                                                        </Button>
                                                    }
                                                    title={`Confirm Ban?`}
                                                    description="The user will be banned and will not be able to access their account."
                                                    accept="Confirm"
                                                    onclick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                ></ConfirmDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="Banned">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-extrabold text-primary">
                                Banned Users
                            </h1>
                            <HeaderSearch
                                handleSearch={(text) =>
                                    handleSearch('searchBannedUsers', text)
                                }
                                className="ml-auto w-96"
                                inputProps={{
                                    placeholder: 'Search Banned Users',
                                }}
                            />
                        </div>
                        <Table>
                            <TableCaption>
                                <CustomPagination page={paginatedBannedUsers} />
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedBannedUsers.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.username}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.fullname}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <ConfirmDialog
                                                    trigger={
                                                        <Button
                                                            variant="destructive"
                                                            className="bg-emerald-500 text-white hover:bg-emerald-600"
                                                        >
                                                            Unban User
                                                        </Button>
                                                    }
                                                    title={`Confirm Unban?`}
                                                    description="The user will be banned and will not be able to access their account."
                                                    accept="Confirm"
                                                    onclick={() =>
                                                        handleRetrieve(user.id)
                                                    }
                                                ></ConfirmDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </div>

            {/* <ControlContainer>
                <CreateProductDialog />
            </ControlContainer> */}

            {/* {selectedProduct && (
          <EditProductDialog
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )} */}
        </AdminLayout>
    );
}
