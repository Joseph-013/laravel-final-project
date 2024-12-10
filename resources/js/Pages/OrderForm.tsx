import Checkbox from '@/Components/Checkbox';
import ColorBadge from '@/Components/ColorBadge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Product } from './Products';

interface FormData {
    product_id: number;
    specifications: string;
    files: File[]; // Explicitly define `files` as an array of File objects
    quantity: number;
    order_deadline_date: string;
    order_deadline_time: string;
    pickup_type: string;
    authorized: boolean;
}

export default function OrderForm({
    product,
    formData,
}: {
    formData: FormData;
    product: Product;
}) {
    const { data, setData, post, errors, reset, clearErrors } =
        useForm<FormData>({
            product_id: product.id!,
            specifications: 'asdasdasda sda sdasda dsasd asd fgh',
            files: [],
            quantity: 1,
            order_deadline_date: '2024-12-18',
            order_deadline_time: '18:48',
            pickup_type: 'Delivery',
            authorized: true,

            // product_id: product.id!,
            // specifications: '',
            // files: [],
            // quantity: 1,
            // order_deadline_date: '',
            // order_deadline_time: '',
            // pickup_type: '',
            // authorized: false,
        });

    useEffect(() => {
        if (formData) {
            setData(formData);
        }
    }, [formData, setData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setData('files', Array.from(files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // post
        post(route('orders.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Order successfully submitted.');
                clearErrors();
            },
        });
        console.log('submit');
        console.log(data);
    };

    return (
        <UserLayout>
            {/* replace with product name */}
            <Head title={`Order: ${product.name}`} />
            <div className="w-full p-3">
                <Link
                    href={route('products')}
                    className="w-fit rounded-md bg-primary px-5 py-2 text-primary-foreground"
                >
                    &lt; Products
                </Link>
            </div>
            <div className="flex w-full justify-center">
                <form
                    className="flex w-full max-w-[720px] flex-col gap-y-4"
                    onSubmit={handleSubmit}
                >
                    <InputContainer className="text-xl font-bold">
                        Ordering: {product.name}
                    </InputContainer>
                    <InputContainer title="Customer Notes">
                        <span className="w-full">
                            ‼️ Please note of our rules for turnover times:
                            <ul className="ml-5">
                                <li>
                                    • For{' '}
                                    <span className="font-bold">documents</span>
                                    , turnover time is within{' '}
                                    <span className="font-bold">
                                        24 hours or less
                                    </span>
                                    .
                                </li>
                                <li>
                                    • For{' '}
                                    <span className="font-bold">
                                        customized prints
                                    </span>
                                    , turnover time is within{' '}
                                    <span className="font-bold">3-5 days</span>.
                                </li>
                                <li>
                                    • Turnover time may also vary depending on
                                    the{' '}
                                    <span className="font-bold">quantity</span>.
                                </li>
                                <li>
                                    •{' '}
                                    <span className="font-bold">
                                        Rush orders
                                    </span>{' '}
                                    are subject to a{' '}
                                    <span className="font-bold">
                                        20% fee on the total cost
                                    </span>
                                    .
                                </li>
                            </ul>
                        </span>
                    </InputContainer>
                    <InputContainer title="Specifications" required>
                        Please provide detailed specifications of your print job
                        here by following this format:
                        <ul>
                            <li>
                                📌 For documents - Paper size (short, A4, long),
                                number of copies, and if B/W or colored.
                            </li>
                            <li>
                                📌 For customized prints - Please see catalogue
                                as guide for specifications. We will also
                                message you if there are any clarifications.
                            </li>
                        </ul>
                        <Textarea
                            className="min-h-52"
                            value={data.specifications}
                            required
                            onChange={(e) =>
                                setData('specifications', e.target.value)
                            }
                        />
                        {errors.specifications && (
                            <ColorBadge color="red">
                                {errors.specifications}
                            </ColorBadge>
                        )}
                    </InputContainer>
                    <InputContainer title="File Upload" required>
                        <span className="inline">
                            For your file/s, please upload them here (accepts
                            multiple file uploads):
                        </span>

                        {data.files.length !== 0 && (
                            <ul className="mb-1 text-sm opacity-70">
                                {data.files.map((file) => (
                                    <li key={file.name}>• {file.name}</li>
                                ))}
                            </ul>
                        )}
                        <Input
                            required
                            type="file"
                            className="flex h-10"
                            onChange={handleFileChange}
                            multiple
                        />
                        {errors.files && (
                            <ColorBadge color="red">{errors.files}</ColorBadge>
                        )}
                    </InputContainer>
                    <InputContainer title="Quantity/Copies" required>
                        How many times should we produce this order?
                        <Input
                            type="number"
                            min={1}
                            value={data.quantity}
                            onChange={(e) =>
                                setData(
                                    'quantity',
                                    parseInt(e.target.value, 10),
                                )
                            }
                        />
                        {errors.quantity && (
                            <ColorBadge color="red">
                                {errors.quantity}
                            </ColorBadge>
                        )}
                    </InputContainer>

                    <InputContainer title="Pickup date and time">
                        At what date and time would you like to receive your
                        order?
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-x-1">
                                Date:
                                <Input
                                    type="date"
                                    className="w-fit"
                                    value={data.order_deadline_date}
                                    onChange={(e) =>
                                        setData(
                                            'order_deadline_date',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-x-1">
                                Time:
                                <div className="flex">
                                    <Input
                                        required
                                        type="time"
                                        className="w-fit"
                                        value={data.order_deadline_time}
                                        onChange={(e) =>
                                            setData(
                                                'order_deadline_time',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <span className="ml-1 text-lg font-bold text-red-500">
                                        *
                                    </span>
                                </div>
                            </div>
                        </div>
                        {errors.order_deadline_date && (
                            <ColorBadge color="red">
                                {errors.order_deadline_date}
                            </ColorBadge>
                        )}
                        {errors.order_deadline_time && (
                            <ColorBadge color="red">
                                {errors.order_deadline_time}
                            </ColorBadge>
                        )}
                    </InputContainer>
                    <InputContainer title="Pickup Method" required>
                        <span className="inline">
                            How would you like to receive your order?
                        </span>
                        <Select
                            required
                            onValueChange={(value) =>
                                setData('pickup_type', value)
                            }
                            value={data.pickup_type}
                        >
                            <SelectTrigger className="w-fit min-w-52">
                                <SelectValue placeholder="- required -" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pickup">
                                    Pickup (in-person or via courier booked by
                                    me)
                                </SelectItem>
                                <SelectItem value="Delivery">
                                    Delivery (via courier booked by Oh Sheet;
                                    fee c/o me)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.pickup_type && (
                            <ColorBadge color="red">
                                {errors.pickup_type}
                            </ColorBadge>
                        )}
                    </InputContainer>
                    <InputContainer title="Confirmation" required>
                        <div className="flex items-center">
                            <Checkbox
                                required
                                name="authorized"
                                id="authorized"
                                checked={data.authorized}
                                onChange={(e) =>
                                    setData('authorized', e.target.checked)
                                }
                                className="checked:bg-primary active:bg-primary"
                            />
                            <label
                                htmlFor="authorized"
                                className={`cursor-pointer pl-2 ${data.authorized || 'font-bold text-red-500'}`}
                            >
                                I confirm that the details provided are correct.
                            </label>
                        </div>
                    </InputContainer>
                    <div className="flex flex-col justify-end gap-x-3 gap-y-4 sm:flex-row">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                reset();
                                clearErrors();
                            }}
                        >
                            Clear
                        </Button>
                        <Button variant={'outline'} type="button">
                            Add to Cart
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}

export function InputContainer({
    children,
    title,
    className,
    required = false,
}: {
    children: React.ReactNode;
    title?: string;
    className?: string;
    required?: boolean;
}) {
    return (
        <section
            className={`flex flex-col gap-y-5 rounded-md border-[1px] border-slate-300 p-4 shadow-md ${className}`}
        >
            <div className="flex h-fit items-center justify-between">
                <div className="-mb-3 h-fit font-bold">
                    {title ? `${title}:` : null}
                </div>
                {required && (
                    <div className="ml-2 flex h-[1ch] items-center text-[1.5rem] font-bold text-red-500">
                        *
                    </div>
                )}
            </div>
            {children}
        </section>
    );
}
