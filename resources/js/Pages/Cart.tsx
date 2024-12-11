import ColorBadge from '@/Components/ColorBadge';
import ControlContainer from '@/Components/ControlContainer';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { IconExternalLink, IconSend } from '@tabler/icons-react';
import { toast } from 'sonner';
import { OrderType } from './Orders';

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
    function handleDeleteCartItem(id: number | undefined) {
        router.delete(route('cart.destroy', id), {
            onSuccess: () =>
                toast.info('Cart item successfully removed.', {
                    duration: 2000,
                }),
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
                <Table className="w-full min-w-[30rem]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product/Service</TableHead>
                            <TableHead>Specifications</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Files</TableHead>
                            <TableHead>Deadline Date</TableHead>
                            <TableHead>Deadline Time</TableHead>
                            <TableHead>Pickup Type</TableHead>
                            <TableHead>Added At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {carts.map((cart) => (
                            <TableRow key={cart.id}>
                                <TableCell>{cart.product?.name}</TableCell>
                                <TableCell className="text-sm">
                                    {cart.specifications}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {cart.address}
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>
                                    {cart.order_deadline_date}
                                </TableCell>
                                <TableCell>
                                    {cart.order_deadline_time}
                                </TableCell>
                                <TableCell>{cart.pickup_type}</TableCell>
                                <TableCell>
                                    {cart.formatted_created_at}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        className="w-[5em] hover:bg-red-200 hover:font-bold hover:text-red-600"
                                        onClick={() =>
                                            handleDeleteCartItem(cart.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
