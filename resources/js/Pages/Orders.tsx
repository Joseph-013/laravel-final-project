import ColorBadge, {
    AllowedColors,
    colorClasses,
} from '@/Components/ColorBadge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Product } from './Products';

export interface OrderType {
    id?: number;
    user_id?: number;
    product_id: number;
    product?: Product;
    specifications: string;
    quantity: number;
    address: string;
    order_deadline_date?: string;
    order_deadline_time: string;
    pickup_type?: 'Pickup' | 'Delivery';
    status?: 'Cart' | 'Pending' | 'Completed' | 'Cancelled';
    formatted_created_at?: string;
    formatted_updated_at?: string;
}

export default function Orders({ orders }: { orders: OrderType[] }) {
    const [activeTab, setActiveTab] = useState('Pending');

    return (
        <UserLayout>
            <Head title="Orders" />
            <Tabs
                defaultValue="Pending"
                value={activeTab}
                onValueChange={(tabValue) => setActiveTab(tabValue)}
            >
                <div className="mb-1 flex w-full justify-center pb-2">
                    <TabsList className="gap-x-2 border-[1px] border-gray-300 bg-transparent">
                        <TabsTrigger value="Pending" className="contents">
                            <TabButtonStyle tabName="Pending" />
                        </TabsTrigger>
                        <TabsTrigger value="Completed" className="contents">
                            <TabButtonStyle tabName="Completed" />
                        </TabsTrigger>
                        <TabsTrigger value="Cancelled" className="contents">
                            <TabButtonStyle tabName="Cancelled" />
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="Pending">
                    <OrdersTable status={'Pending'} orders={orders} />
                </TabsContent>
                <TabsContent value="Completed">
                    <OrdersTable status={'Completed'} orders={orders} />
                </TabsContent>
                <TabsContent value="Cancelled">
                    <OrdersTable status={'Cancelled'} orders={orders} />
                </TabsContent>
            </Tabs>
        </UserLayout>
    );

    function TabButtonStyle({
        tabName,
    }: {
        tabName: 'Pending' | 'Completed' | 'Cancelled';
    }) {
        const map = {
            Pending: colorClasses['orange'],
            Completed: colorClasses['green'],
            Cancelled: colorClasses['red'],
        };
        const className =
            tabName === activeTab
                ? `font-bold rounded-md ${map[tabName]}`
                : undefined;
        return <div className={`px-3 py-1 ${className}`}>{tabName}</div>;
    }
}
function OrdersTable({
    status,
    orders,
}: {
    status: 'Pending' | 'Completed' | 'Cancelled';
    orders: OrderType[];
}) {
    const colorMap = {
        Cart: 'sky',
        Pending: 'orange',
        Completed: 'green',
        Cancelled: 'red',
    };

    const timestampMap = {
        Pending: 'Ordered At',
        Completed: 'Completed At',
        Cancelled: 'Cancelled At',
    };

    orders = orders.filter((order) => order.status === status);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product/Service</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Deadline Date</TableHead>
                    <TableHead>Deadline Time</TableHead>
                    <TableHead>Pickup Type</TableHead>
                    <TableHead>{timestampMap[status]}</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="textsm">
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.product?.name}</TableCell>
                        <TableCell>{order.specifications}</TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell className="min-w-24">
                            {order.order_deadline_date || '--'}
                        </TableCell>
                        <TableCell>{order.order_deadline_time}</TableCell>
                        <TableCell>{order.pickup_type}</TableCell>
                        <TableCell>{order.formatted_updated_at}</TableCell>
                        <TableCell>
                            <ColorBadge
                                color={colorMap[order.status!] as AllowedColors}
                            >
                                {order.status}
                            </ColorBadge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
