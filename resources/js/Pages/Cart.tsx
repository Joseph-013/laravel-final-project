import ColorBadge from '@/Components/ColorBadge';
import ControlContainer from '@/Components/ControlContainer';
import Line from '@/Components/Line';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import {
    IconCircleMinus,
    IconExternalLink,
    IconSend,
} from '@tabler/icons-react';
import React from 'react';
import { toast } from 'sonner';
import { OrderType } from './Admin/Orders';

export interface OrderFile {
    id: number;
    filename: string;
    fileUrl?: string;
}

interface CartType extends OrderType {
    files: OrderFile[];
    status: 'Cart';
    authorized: boolean;
}

export default function Cart({ carts }: { carts: CartType[] }) {
    console.log('carts', carts);
    function handleDeleteCartItem(id: number) {
        router.delete(route('cart.destroy', id), {
            onSuccess: () => toast.info('Cart item successfully removed.'),
            onError: () =>
                toast.warning('Cannot delete cart item at this time.'),
        });
    }

    function handleOpenFiles(files: OrderFile[]) {
        let blocked = false;

        files.forEach((file) => {
            const newWindow = window.open(file.fileUrl, '_blank');

            if (newWindow === null) {
                console.error('Popup blocked for:', file.fileUrl);
                blocked = true;
            }
        });

        if (blocked) {
            toast.error(
                'It looks like popups are being blocked. Please allow popups for this site.',
                { duration: 10000 },
            );
        }
    }

    const handleSubmitBatchOrder = () => {
        router.visit(route('cart.send'), {
            method: 'post',
            preserveState: true,
            preserveScroll: true,
            onSuccess: () =>
                toast.success('All cart items successfully submitted.'),
        });
    };

    return (
        <UserLayout>
            <Head title="Cart" />
            <div className="w-full p-3">
                <Link
                    href={route('products')}
                    className="w-fit rounded-md bg-primary px-5 py-2 text-primary-foreground"
                >
                    &lt; Products
                </Link>
            </div>
            <div className="w-full overflow-x-scroll">
                <table className="w-full min-w-[30rem] text-left">
                    <thead>
                        <tr>
                            <th>Product/Service</th>
                            <th>Specifications</th>
                            <th>Files</th>
                            <th>Deadline Date</th>
                            <th>Deadline Time</th>
                            <th>Pickup Type</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart) => (
                            <React.Fragment key={cart.id}>
                                <tr>
                                    <td colSpan={7}>
                                        <Line
                                            variant={'h'}
                                            className="my-1 border-t-[1px] border-black/20"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>{cart.product?.name}</td>
                                    <td className="text-sm">
                                        {cart.specifications}
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                handleOpenFiles(cart.files)
                                            }
                                            variant="outline"
                                        >
                                            <IconExternalLink />
                                            {`(${cart.files.length})`}
                                            &nbsp;File
                                            {cart.files.length > 1 && `s`}
                                        </Button>
                                    </td>
                                    <td>{cart.order_deadline_date}</td>
                                    <td>{cart.order_deadline_time}</td>
                                    <td>{cart.pickup_type}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDeleteCartItem(cart.id)
                                            }
                                            className="rounded-md p-2 outline-1 hover:outline"
                                        >
                                            <IconCircleMinus size={24} />
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {carts.length !== 0 && (
                <ControlContainer>
                    <ConfirmSubmitBatchOrder />
                </ControlContainer>
            )}
        </UserLayout>
    );

    function ConfirmSubmitBatchOrder() {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <IconSend /> Send Batch Order
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Send Batch Order?</DialogTitle>
                        <DialogDescription />
                        <ColorBadge color="red">
                            By clicking Send, you confirm to have verified that
                            all the contents of your order/s are correct.
                        </ColorBadge>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={handleSubmitBatchOrder}
                                type="button"
                            >
                                <IconSend /> Send
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
}
