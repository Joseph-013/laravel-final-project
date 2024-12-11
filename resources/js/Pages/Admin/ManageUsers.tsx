import HeaderSearch from '@/Components/HeaderSearch';
import { Button } from '@/Components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';

interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
}

interface PaginatedData<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        next: string | null;
        prev: string | null;
    };
}

interface ManageUsersProps {
    users: PaginatedData<User>;
    bannedUsers: PaginatedData<User>;
}

export default function ManageUsers({ users, bannedUsers }: ManageUsersProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to ban this user?')) {
            router.delete(route('admin.banUser', id), {
                onSuccess: () => toast.success('User Banned Successfully!'),
                onError: () => toast.error('Error Banning User.'),
                preserveScroll: true,
            });
        }
    };

    const handleRetrieve = (id: number) => {
        if (confirm('Are you sure you want to unban this user?')) {
            router.patch(
                route('admin.unbanUser', id),
                {},
                {
                    onSuccess: () =>
                        toast.success('User Unbanned Successfully!'),
                    onError: () => toast.error('Error Unbanning User.'),
                    preserveScroll: true,
                },
            );
        }
    };

    const renderPagination = (links: {
        prev_page_url?: string;
        next_page_url?: string;
    }) => (
        <Pagination>
            <PaginationContent>
                {links.prev_page_url && (
                    <PaginationItem>
                        <PaginationPrevious
                            href={links.prev_page_url}
                            onClick={(e) => {
                                e.preventDefault();
                                // @ts-expect-error": asdkhja sdk a
                                router.get(links.prev_page_url);
                            }}
                        />
                    </PaginationItem>
                )}
                {links.next_page_url && (
                    <PaginationItem>
                        <PaginationNext
                            href={links.next_page_url}
                            onClick={(e) => {
                                e.preventDefault();
                                // @ts-expect-error: error to
                                router.get(links.next_page_url);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );

    return (
        <AdminLayout>
            <Head title="Manage Users" />
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
                                handleSearch={(text) => {}}
                                className="ml-auto w-96"
                            />
                        </div>
                        <Table>
                            <TableCaption>
                                List of all users.
                                {/* <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious />{' '}
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#"></PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination> */}
                                {renderPagination(users)}
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
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.fullname}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    Ban User
                                                </Button>
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
                                handleSearch={(text) => {}}
                                className="ml-auto w-96"
                            />
                        </div>
                        <Table>
                            <TableCaption>
                                {renderPagination(bannedUsers)}
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
                                {bannedUsers.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.fullname}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleRetrieve(user.id)
                                                    }
                                                >
                                                    Unban User
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
