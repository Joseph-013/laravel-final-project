import ColorBadge from '@/Components/ColorBadge';
import UserLayout from '@/Layouts/UserLayout';
import { Order } from '@/lib/types/Order';
import { Head, Link } from '@inertiajs/react';

export default function ManageOrders({ orders }: { orders: Order[] }) {
    const colorMap: Record<
        'Cart' | 'Pending' | 'Completed' | 'Cancelled',
        'sky' | 'orange' | 'green' | 'red'
    > = {
        Cart: 'sky',
        Pending: 'orange',
        Completed: 'green',
        Cancelled: 'red',
    };

    return (
        <UserLayout>
            <Head title="Orders" />
            <div className="space-y-2 p-2">
                {orders.map((order) => (
                    <Link
                        href={`/orders/${order.id}`}
                        className="space-y-2 p-2 shadow-lg"
                    >
                        <p>ID: {order.id}</p>
                        <p>Name: {order.product!.name}</p>
                        <p>Specifications: {order.specifications}</p>
                        <p>Address: {order.address}</p>
                        <p>Date: {order.order_deadline_date.toISOString()}</p>
                        <p>Time: {order.order_deadline_time}</p>
                        <p>Pickup: {order.pickup_type}</p>
                        <div>
                            Status: {order.status}
                            <ColorBadge color={colorMap[order.status]}>
                                {order.status}
                            </ColorBadge>
                        </div>
                    </Link>
                ))}
            </div>
        </UserLayout>
    );
}
