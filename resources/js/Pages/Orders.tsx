import ColorBadge from '@/Components/ColorBadge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/inertia-adjusted/pagination';
import { Button } from '@/Components/ui/button';
import UserLayout from '@/Layouts/UserLayout';
import { Order } from '@/lib/types/Order';
import { Head, Link, usePage } from '@inertiajs/react';
import { DateTime } from 'luxon';

type ManageOrdersProps = {
    orders: Order[];
    currentPage: number;
    lastPage: number;
    prevPageUrl?: string;
    nextPageUrl?: string;
};

export default function ManageOrders(props: ManageOrdersProps) {
    const { orders, currentPage, lastPage, prevPageUrl, nextPageUrl } = props;

    const { url } = usePage();
    const urlParams = new URL(`localhost:8000${url}`).searchParams;
    const currStatusFilter = urlParams.get('status');

    const statusIsPending =
        currStatusFilter && currStatusFilter.toLowerCase() === 'pending';
    const statusIsCompleted =
        currStatusFilter && currStatusFilter.toLowerCase() === 'completed';
    const statusIsCancelled =
        currStatusFilter && currStatusFilter.toLowerCase() === 'cancelled';

    return (
        <UserLayout>
            <Head title="Orders" />
            <div className="overflow-hidden rounded">
                <Link
                    href={
                        statusIsPending ? '/orders' : '/orders?status=Pending'
                    }
                >
                    <Button
                        variant={!statusIsPending ? 'outline' : undefined}
                        className="rounded-none"
                    >
                        Pending
                    </Button>
                </Link>
                <Link
                    href={
                        statusIsCompleted
                            ? '/orders'
                            : '/orders?status=Completed'
                    }
                >
                    <Button
                        variant={!statusIsCompleted ? 'outline' : undefined}
                        className="rounded-none"
                    >
                        Completed
                    </Button>
                </Link>
                <Link
                    href={
                        statusIsCancelled
                            ? '/orders'
                            : '/orders?status=Cancelled'
                    }
                >
                    <Button
                        variant={!statusIsCancelled ? 'outline' : undefined}
                        className="rounded-none"
                    >
                        Cancelled
                    </Button>
                </Link>
            </div>
            <div className="space-y-2 p-2">
                {orders.length > 0 ? (
                    orders.map((currentOrder) => (
                        <OrderListItem
                            order={currentOrder}
                            key={currentOrder.id}
                        />
                    ))
                ) : (
                    <p className="text-center">
                        There are currently no orders.
                    </p>
                )}
            </div>
            {orders.length > 0 && (
                <>
                    <Pagination className="items-center justify-end">
                        <div>{`Page ${currentPage} of ${lastPage}`}</div>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href={prevPageUrl ?? ''} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href={nextPageUrl ?? ''} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </UserLayout>
    );
}

function OrderListItem({ order }: { order: Order }) {
    const colorMap = {
        Cart: 'sky',
        Pending: 'orange',
        Completed: 'green',
        Cancelled: 'red',
    };

    return (
        <Link href={`/orders/${order.id}`} className="m-0 block p-0">
            <div className="space-y-1 rounded p-3 shadow-lg">
                <div className="flex items-center justify-center">
                    <div
                        className={`mt-1 w-fit rounded-md bg-sky-100 px-2 py-1 text-sm font-bold text-sky-600`}
                    >
                        #{order.id}
                    </div>
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
                    <div className="ml-auto font-bold text-red-500">
                        Due:{' '}
                        {DateTime.fromJSDate(
                            new Date(order.order_deadline_date),
                        ).toLocaleString(DateTime.DATE_MED)}
                        , {order.order_deadline_time}
                    </div>
                </div>
                <div className="flex-grow truncate text-xl font-bold">
                    {order.product!.name}
                </div>
                <p className="truncate">{order.specifications}</p>
                <p className="text-sm">{order.pickup_type}</p>
                {order.pickup_type === 'Delivery' && (
                    <p className="text-sm italic text-muted-foreground">
                        {order.address}
                    </p>
                )}
            </div>
        </Link>
    );
}
