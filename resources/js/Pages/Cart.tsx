import Line from '@/Components/Line';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { IconCircleMinus } from '@tabler/icons-react';

const dummyData = [
    {
        id: 1,
        product_type: 'Photo ID',
        specifications: 'Specification 1 for Order 1',
        files: ['file1.pdf', 'file2.jpg'],
        order_deadline_date: '2024-12-15',
        order_deadline_time: '14:00',
        pickup_type: 'Pickup',
        authorized: true,
    },
    {
        id: 2,
        product_type: 'Photo ID',
        specifications: 'Specification 2 for Order 2',
        files: ['file3.png', 'file4.docx'],
        order_deadline_date: '2024-12-16',
        order_deadline_time: '16:30',
        pickup_type: 'Pickup',
        authorized: false,
    },
    {
        id: 3,
        product_type: 'Photo ID',
        specifications:
            ' asda sdasd as dasd asd asd asd as dahjsd hjkas da sdkhas dkhjga sjhdgashjdg ahjsd gjhasg djhasgdhjasdhj as jhdajhsdas djha sdjha sdjh ashjd jhasdg asjhd ajhd s',
        files: ['file5.mp4', 'file6.zip'],
        order_deadline_date: '2024-12-18',
        order_deadline_time: '10:00',
        pickup_type: 'Delivery',
        authorized: true,
    },
    {
        id: 4,
        product_type: 'Photo ID',
        specifications: 'Specification 4 for Order 4',
        files: ['file7.pdf', 'file8.jpg'],
        order_deadline_date: '2024-12-20',
        order_deadline_time: '12:30',
        pickup_type: 'Delivery',
        authorized: false,
    },
    {
        id: 5,
        product_type: 'Photo ID',
        specifications: 'Specification 5 for Order 5',
        files: ['file9.png', 'file10.docx'],
        order_deadline_date: '2024-12-22',
        order_deadline_time: '09:00',
        pickup_type: 'Pickup',
        authorized: true,
    },
];

export default function Cart({ cart }) {
    cart = dummyData;

    function handleDeleteCartItem(id) {
        // router.delete with id
    }

    return (
        <GuestLayout>
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
                        <th>Product/Service</th>
                        <th>Specifications</th>
                        <th>Deadline Date</th>
                        <th>Deadline Time</th>
                        <th>Pickup Type</th>
                        <th>&nbsp;</th>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <>
                                <tr>
                                    <td colSpan={6}>
                                        <Line
                                            variant={'h'}
                                            className="my-1 border-t-[1px] border-black/20"
                                        />
                                    </td>
                                </tr>
                                <tr key={item.id}>
                                    <td>{item.product_type}</td>
                                    <td className="text-sm">
                                        {item.specifications}
                                    </td>
                                    <td>{item.order_deadline_date}</td>
                                    <td>{item.order_deadline_time}</td>
                                    <td>{item.pickup_type}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDeleteCartItem(item.id)
                                            }
                                            className="rounded-md p-2 outline-1 hover:outline"
                                        >
                                            <IconCircleMinus size={24} />
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </GuestLayout>
    );
}
