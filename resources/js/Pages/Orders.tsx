import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { dummyData } from './Cart';

export default function Orders({ orders }) {
    orders = dummyData;
    return (
        <UserLayout>
            <Head title="Orders" />
            <h1 className="p-4 text-4xl font-extrabold text-primary">
                Your Orders
            </h1>
            <table className="border">
                <thead>
                    <tr className="bg-[#e3ecfd] font-semibold text-primary">
                        {/* <th className="border-b-2 px-4 py-2 text-left">ID</th> */}
                        <th className="border-b-2 px-6 py-3 text-left tracking-wider">
                            Product/Service
                        </th>
                        <th className="border-b-2 px-6 py-3 text-left tracking-wider">
                            Specifications
                        </th>
                        <th className="border-b-2 px-6 py-3 text-left tracking-wider">
                            Deadline Date
                        </th>
                        <th className="border-b-2 px-6 py-3 text-left tracking-wider">
                            Deadline Time
                        </th>
                        <th className="border-b-2 px-6 py-3 text-left tracking-wider">
                            Pickup Type
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <tr
                            key={item.id}
                            style={{
                                backgroundColor:
                                    index % 2 === 0 ? '#ffffff' : '#f9fafb',
                            }}
                        >
                            {/* <td className="border-b p-6">{item.id}</td> */}
                            <td className="border-b p-6">
                                {item.product_type}
                            </td>
                            <td className="border-b px-2 py-6">
                                {item.specifications}
                            </td>
                            <td className="border-b p-6">
                                {item.order_deadline_date}
                            </td>
                            <td className="border-b p-6">
                                {item.order_deadline_time}
                            </td>
                            <td className="border-b p-6">{item.pickup_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </UserLayout>
    );
}
