import ColorBadge from '@/Components/ColorBadge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import UserLayout from '@/Layouts/UserLayout';
import { Order } from '@/lib/types/Order';
import { Head, useForm } from '@inertiajs/react';
import { DateTime } from 'luxon';

export default function ViewOrder({
    order,
    success,
}: {
    order: Order;
    success?: string;
}) {
    const { data, setData, patch } = useForm<Pick<Order, 'status'>>({
        status: order.status,
    });

    const colorMap = {
        Cart: 'sky',
        Pending: 'orange',
        Completed: 'green',
        Cancelled: 'red',
    };

    const handleCancel = () => {
        patch(route('orders.cancel', order.id));
    };

    return (
        <>
            <UserLayout>
                <Head title="Manage Order" />
                <div className="container mx-auto">
                    <div className="flex">
                        <div className="flex-grow">
                            <h1 className="text-xl font-bold">Your Order</h1>
                            <p>View details about your order</p>
                        </div>
                        {order.status !== 'Cancelled' &&
                            order.status !== 'Completed' && (
                                <div>
                                    <AlertDialog>
                                        <Button variant={'destructive'} asChild>
                                            <AlertDialogTrigger>
                                                Cancel
                                            </AlertDialogTrigger>
                                        </Button>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Cancel Confirmation
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to
                                                    cancel this order? This
                                                    action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    No
                                                </AlertDialogCancel>
                                                <Button
                                                    variant={'destructive'}
                                                    type="button"
                                                    onClick={handleCancel}
                                                    asChild
                                                >
                                                    <AlertDialogAction>
                                                        Cancel Order
                                                    </AlertDialogAction>
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                    </div>

                    <div className="space-y-4 rounded p-3 outline outline-1 outline-gray-200">
                        <div>
                            <h2 className="text-lg font-bold">
                                User Information
                            </h2>
                            <p>
                                <span className="font-bold">Ordered by: </span>
                                {
                                    order.user!.fullname
                                } ({order.user!.email} |{' '}
                                {order.user!.contact_number})
                            </p>
                            <p>
                                <span className="font-bold">Address: </span>
                                {order.user!.default_address}
                            </p>
                        </div>

                        <hr />

                        <div>
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

                        <hr />

                        <div>
                            <h2 className="text-lg font-bold">
                                Order Information
                            </h2>
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

                            <div className="space-y-1">
                                <span className="font-bold">Status: </span>
                                <ColorBadge
                                    color={
                                        colorMap[order.status] as
                                            | 'sky'
                                            | 'orange'
                                            | 'green'
                                            | 'red'
                                    }
                                >
                                    {order.status}
                                </ColorBadge>
                            </div>

                            <p>
                                <span className="font-bold">Pickup Type: </span>
                                {order.pickup_type}
                            </p>
                            {order.pickup_type === 'Delivery' && (
                                <p>
                                    <span className="font-bold">
                                        Deliver to:{' '}
                                    </span>
                                    {order.address}
                                </p>
                            )}
                            <p>
                                <span className="font-bold">
                                    Specifications:{' '}
                                </span>
                                {order.specifications}
                            </p>
                        </div>
                    </div>
                </div>
            </UserLayout>
        </>
    );
}
