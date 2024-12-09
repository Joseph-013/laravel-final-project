import HeaderSearch from '@/Components/HeaderSearch';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function ManageProducts({ products }) {
    return (
        <AdminLayout>
            <Head title="Manage Orders" />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">All Products</h1>
                <HeaderSearch
                    className="max-w-96"
                    inputProps={{ placeholder: 'Search Products...' }}
                    handleSearch={() => null}
                />
            </div>
            <Table>
                <TableCaption>
                    List of all offered products and services.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </AdminLayout>
    );
}
