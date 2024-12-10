import ColorBadge from '@/Components/ColorBadge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { dummyData } from './Cart';

export interface OrderType {
    id?: number;
    product_type: string;
    specifications: string;
    //
    order_deadline_date: string;
    order_deadline_time: string;
    pickup_type: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
}

export default function Orders({ orders }: { orders: OrderType[] }) {
    orders = dummyData;

    const colorMap: Record<
        'Pending' | 'Completed' | 'Cancelled',
        'orange' | 'green' | 'red'
    > = {
        Pending: 'orange',
        Completed: 'green',
        Cancelled: 'red',
    };

    return (
        <UserLayout>
            <Head title="Orders" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product/Service</TableHead>
                        <TableHead>Specifications</TableHead>
                        <TableHead>Deadline Date</TableHead>
                        <TableHead>Deadline Time</TableHead>
                        <TableHead>Pickup Type</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="textsm">
                    {orders.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">
                                {item.id}
                            </TableCell>
                            <TableCell>{item.product_type}</TableCell>
                            <TableCell>{item.specifications}</TableCell>
                            <TableCell className="min-w-24">
                                {item.order_deadline_date}
                            </TableCell>
                            <TableCell>{item.order_deadline_time}</TableCell>
                            <TableCell>{item.pickup_type}</TableCell>
                            <TableCell>
                                <ColorBadge color={colorMap[item.status]}>
                                    {item.status}
                                </ColorBadge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </UserLayout>
    );
}
