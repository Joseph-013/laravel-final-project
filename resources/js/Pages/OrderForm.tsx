import Checkbox from '@/Components/Checkbox';
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

interface FormData {
    specifications: string;
    files: File[]; // Explicitly define `files` as an array of File objects
    order_deadline_date: string;
    order_deadline_time: string;
    pickup_type: string;
    authorized: boolean;
}

export default function OrderForm({
    keyword,
    product,
    formData,
}: {
    formData: FormData;
}) {
    product = {
        keyword: keyword,
    };

    // if need fill agad ng data
    formData = {
        specifications: 'asduh yfsiukd fshjk',
        files: [], // fixed di na nakikita?
        order_deadline_date: '',
        order_deadline_time: '',
        pickup_type: '',
        authorized: false,
    };

    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            specifications: '',
            files: [],
            order_deadline_date: '',
            order_deadline_time: '',
            pickup_type: '',
            authorized: false,
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
        console.log('submit');
        console.log(data);
    };

    return (
        <UserLayout>
            {/* replace with product name */}
            <Head title={`Order: ${product.keyword}`} />
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
                        Ordering: {product.keyword}
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
                    <InputContainer title="Specifications">
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
                            onChange={(e) =>
                                setData('specifications', e.target.value)
                            }
                        />
                    </InputContainer>
                    <InputContainer title="File Upload">
                        <span className="inline">
                            For your file/s, please upload them here (accepts
                            multiple file uploads):
                            <span className="ml-2 text-lg font-bold text-red-500">
                                *
                            </span>
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
                    </InputContainer>
                    <InputContainer title="Pickup date and time">
                        At what date and time would you like to receive your
                        order?
                        <div className="flex flex-wrap gap-3">
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
                    </InputContainer>
                    <InputContainer title="Pickup Method">
                        <span className="inline">
                            How would you like to receive your order?
                            <span className="ml-2 text-lg font-bold text-red-500">
                                *
                            </span>
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
                                <SelectItem value="pickup">
                                    Pickup (in-person or via courier booked by
                                    me)
                                </SelectItem>
                                <SelectItem value="delivery">
                                    Delivery (via courier booked by Oh Sheet;
                                    fee c/o me)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </InputContainer>
                    <InputContainer>
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
                            onClick={() => reset()}
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
}: {
    children: React.ReactNode;
    title?: string;
    className?: string;
}) {
    return (
        <section
            className={`flex flex-col gap-y-5 rounded-md border-[1px] border-slate-300 p-4 shadow-md ${className}`}
        >
            {title && <div className="-mb-3 font-bold">{title}:</div>}
            {children}
        </section>
    );
}
