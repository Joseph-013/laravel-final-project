import UserLayout from '@/Layouts/UserLayout';
import { Order } from '@/lib/types/Order';
import { Head } from '@inertiajs/react';
import { DateTime } from 'luxon';

export default function ManageSingularOrder({ order }: { order: Order }) {
    return (
        <>
            <UserLayout>
                <Head title="Manage Order" />
                <div className="container mx-auto space-y-4">
                    <div>
                        <h1 className="text-xl font-bold">Manage Order</h1>
                        <p>Manage a particular order</p>
                    </div>
                    <div className="rounded shadow">
                        <h2 className="text-lg font-bold">User Information</h2>
                        <p>
                            <span className="font-bold">Ordered by: </span>
                            {order.user!.fullname} ({order.user!.email} |{' '}
                            {order.user!.contact_number})
                        </p>
                        <p>
                            <span className="font-bold">Address: </span>
                            {order.user!.default_address}
                        </p>
                    </div>
                    <div className="rounded shadow">
                        <h2 className="text-lg font-bold">
                            Product Information
                        </h2>
                        <p>
                            <span className="font-bold">Name: </span>
                            {order.product!.name}
                        </p>
                        <p>
                            <span className="font-bold">Description: </span>
                            {order.product!.description}
                        </p>
                        <p>
                            <span className="font-bold">Keyword: </span>
                            {order.product!.keyword}
                        </p>
                    </div>
                    <div className="rounded shadow">
                        <h2 className="text-lg font-bold">Order Information</h2>
                        <p>
                            <span className="font-bold">Due: </span>
                            {DateTime.fromJSDate(
                                new Date(order.order_deadline_date),
                            ).toLocaleString(DateTime.DATE_MED)}
                            , {order.order_deadline_time}
                        </p>
                        <p>
                            <span className="font-bold">Quantity: </span>
                            {order.quantity}
                        </p>
                        make status toggle here
                        <p>
                            <span className="font-bold">Pickup Type: </span>
                            {order.pickup_type}
                        </p>
                        {order.pickup_type === 'Delivery' && (
                            <p>
                                <span className="font-bold">Deliver to: </span>
                                {order.address}
                            </p>
                        )}
                        <p>
                            <span className="font-bold">Specifications: </span>
                            {order.specifications}
                        </p>
                    </div>
                </div>
            </UserLayout>
        </>
    );
}
