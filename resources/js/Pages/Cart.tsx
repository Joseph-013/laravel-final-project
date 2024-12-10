import Line from '@/Components/Line';
import { Button } from '@/Components/ui/button';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { IconCircleMinus } from '@tabler/icons-react';
import React from 'react';
import { OrderType } from './Orders';

interface CartType extends OrderType {
    files: string[];
    status: 'Cart';
    authorized: boolean;
}

export default function Cart({ carts }: { carts: CartType[] }) {
    function handleDeleteCartItem(id) {
        // router.delete with id
    }

    console.log('carts', carts);

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
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart) => (
                            <React.Fragment key={cart.id}>
                                <tr>
                                    <td colSpan={6}>
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
                                        <Button variant="outline">
                                            File/s
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
        </UserLayout>
    );
}
