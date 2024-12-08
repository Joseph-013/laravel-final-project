import Line from '@/Components/Line';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { dummyData } from './Cart';

export default function Orders({ orders }) {
    orders = dummyData;
    return (
        <GuestLayout>
            <Head title="Orders" />
            <table className="w-full min-w-[30rem] text-left">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product/Service</th>
                        <th>Specifications</th>
                        <th>Deadline Date</th>
                        <th>Deadline Time</th>
                        <th>Pickup Type</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => (
                        <React.Fragment key={item.id}>
                            <tr>
                                <td colSpan={6}>
                                    <Line
                                        variant={'h'}
                                        className="my-1 border-t-[1px] border-black/20"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.product_type}</td>
                                <td className="text-sm">
                                    {item.specifications}
                                </td>
                                <td>{item.order_deadline_date}</td>
                                <td>{item.order_deadline_time}</td>
                                <td>{item.pickup_type}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </GuestLayout>
    );
}
