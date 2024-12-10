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
import { Product } from './Products';

export interface OrderType {
    id: number;
    user_id: number;
    product_id: number;
    product?: Product;
    specifications: string;
    //
    quantity: number;
    order_deadline_date?: string;
    order_deadline_time: string;
    pickup_type: 'Pickup' | 'Delivery';
    status: 'Pending' | 'Completed' | 'Cancelled';
}

export default function Orders({ orders }: { orders: OrderType[] }) {
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
                            <TableCell>{item.product?.name}</TableCell>
                            <TableCell>{item.specifications}</TableCell>
                            <TableCell className="min-w-24">
                                {item.order_deadline_date || '--'}
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
