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
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import UserLayout from '@/Layouts/UserLayout';
import { Order, OrderStatus } from '@/lib/types/Order';
import { Head, useForm } from '@inertiajs/react';
import { DateTime } from 'luxon';
import { useState } from 'react';

export default function ManageSingularOrder({
    order,
    success,
}: {
    order: Order;
    success?: string;
}) {
    const {
        data,
        setData,
        patch,
        isDirty,
        delete: destroy,
    } = useForm<Pick<Order, 'status'>>({
        status: order.status,
    });

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSubmit = () => {
        patch(route('admin.orders.updateStatus', order.id));
    };

    const handleDelete = () => {
        destroy(route('admin.orders.destroy', order.id));
    };

    return (
        <>
            <UserLayout>
                <Head title="Manage Order" />
                <div className="container mx-auto">
                    <div className="flex">
                        <div className="flex-grow">
                            <h1 className="text-xl font-bold">
                                {success ? success : `Manage Order`}
                            </h1>
                            <p>Manage a particular order</p>
                        </div>
                        <div>
                            <AlertDialog>
                                <Button variant={'destructive'} asChild>
                                    <AlertDialogTrigger>
                                        Delete
                                    </AlertDialogTrigger>
                                </Button>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete Confirmation
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this
                                            order? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <Button
                                            variant={'destructive'}
                                            type="button"
                                            onClick={handleDelete}
                                            asChild
                                        >
                                            <AlertDialogAction>
                                                Delete
                                            </AlertDialogAction>
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
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
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData({
                                            status: value as OrderStatus,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="Completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="Cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {isDirty && (
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Update
                                    </Button>
                                )}
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
                            <div>
                                <h3 className="text-md mb-2 font-bold">
                                    Pictures
                                </h3>
                                {order.files && order.files.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                            {order.files.map((file) => (
                                                <div
                                                    key={file.id}
                                                    className="relative aspect-square cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            file.filename,
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={file.filename}
                                                        alt="Order attachment"
                                                        className="h-full w-full rounded-lg object-cover transition-opacity hover:opacity-90"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <Dialog
                                            open={!!selectedImage}
                                            onOpenChange={() =>
                                                setSelectedImage(null)
                                            }
                                        >
                                            <DialogContent className="h-fit max-h-[95vh] w-fit max-w-[95vw] p-2 sm:p-4">
                                                {selectedImage && (
                                                    <div className="relative flex h-full w-full items-center justify-center">
                                                        <img
                                                            src={selectedImage}
                                                            alt="Order attachment"
                                                            className="max-h-[85vh] max-w-full rounded-lg object-contain"
                                                        />
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </>
                                ) : (
                                    <p className="italic text-gray-500">
                                        No images attached
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        </>
    );
}
