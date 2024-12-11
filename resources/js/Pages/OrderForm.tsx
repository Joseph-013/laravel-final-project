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
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { OrderType } from './Orders';
import { Product } from './Products';

interface FormData extends OrderType {
    // product_id: number;
    // specifications: string;
    files: File[];
    use_default_address: boolean;
    // quantity: number;
    // order_deadline_date: string;
    // order_deadline_time: string;
    // pickup_type: string;
    authorized: boolean;
}

export default function OrderForm({
    product,
    formData,
    default_address,
}: {
    formData: FormData;
    product: Product;
    default_address: string;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, errors, reset, clearErrors } =
        useForm<FormData>({
            // product_id: product.id!,
            // specifications: 'asdasdasda sda sdasda dsasd asd fgh',
            // files: [],
            // quantity: 1,
            // order_deadline_date: '2024-12-18',
            // order_deadline_time: '18:48',
            // pickup_type: 'Delivery',
            // authorized: true,

            product_id: product.id!,
            specifications: '',
            files: [],
            quantity: 1,
            address: default_address,
            use_default_address: true,
            order_deadline_date: '',
            order_deadline_time: '',
            pickup_type: undefined,
            authorized: false,
        });

    useEffect(() => {
        if (formData) {
            setData(formData);
        }
    }, [formData, setData]);

    useEffect(() => {
        if (data.use_default_address) setData('address', default_address);
    }, [data, setData, default_address]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setData('files', Array.from(files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // post
        post(route('orders.store'));
    };

    function clearFileInput() {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clears the file input
        }
    }

    function handleAddToCart() {
        post(route('cart.store'), {
            onSuccess: () => {
                reset();
                clearFileInput();
                toast.success('Order successfully added to cart.');
                clearErrors();
            },
        });
    }

    const getErrorMessage = (error: string | undefined, index: number) => {
        if (error) {
            return error.replace(`The files.${index} field`, 'This file');
        }
        return null;
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
                            <ul className="mb-1 space-y-3 text-sm">
                                {data.files.map((file, index) => (
                                    <li key={file.name}>
                                        <div className="line-clamp-1 opacity-70">
                                            • {file.name}
                                        </div>
                                        {/* @ts-expect-error: Ignoring the type error because `files.${index}` is dynamically generated and TypeScript cannot infer it correctly. */}
                                        {errors[`files.${index}`] && (
                                            <ColorBadge color="red">
                                                {getErrorMessage(
                                                    // @ts-expect-error: Ignoring the type error because `files.${index}` is dynamically generated and TypeScript cannot infer it correctly.
                                                    errors[`files.${index}`],
                                                    index,
                                                )}
                                            </ColorBadge>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <Input
                            required
                            type="file"
                            ref={fileInputRef}
                            value={undefined}
                            className="flex h-10"
                            onChange={handleFileChange}
                            multiple
                        />
                        {errors.files && errors.files.length === 0 && (
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
                                setData('quantity', parseInt(e.target.value))
                            }
                            onBlur={(e) => {
                                if (isNaN(parseInt(e.target.value))) {
                                    setData('quantity', 1);
                                }
                            }}
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
                            onValueChange={(value: 'Pickup' | 'Delivery') =>
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

                    <InputContainer title="Address" required>
                        <span>
                            Where should the item/s be{' '}
                            <span
                                className={
                                    data.pickup_type ? 'font-bold' : undefined
                                }
                            >
                                {(data.pickup_type &&
                                    (data.pickup_type === 'Pickup'
                                        ? 'picked up'
                                        : 'delivered')) ||
                                    'picked up or delivered'}
                            </span>
                            ?
                        </span>
                        <div className="flex items-center">
                            <Checkbox
                                name="useDefaultAddress"
                                id="useDefaultAddress"
                                checked={data.use_default_address}
                                onChange={(e) => {
                                    setData(
                                        'use_default_address',
                                        e.target.checked,
                                    );
                                }}
                                className="checked:bg-primary active:bg-primary"
                            />
                            <label
                                htmlFor="useDefaultAddress"
                                className={`cursor-pointer select-none pl-2 ${data.address === undefined && 'font-bold text-sky-600'}`}
                            >
                                Use my default address.
                            </label>
                        </div>
                        <Input
                            type="text"
                            disabled={data.use_default_address}
                            value={
                                data.use_default_address
                                    ? default_address
                                    : data.address
                            }
                            placeholder="* required"
                            required
                            onChange={(e) => setData('address', e.target.value)}
                            onFocus={(e) => {
                                if (
                                    !data.use_default_address &&
                                    e.target.value === default_address
                                ) {
                                    e.target.select();
                                }
                            }}
                        />
                        {errors.address && (
                            <ColorBadge color="red">
                                {errors.address}
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
                        <Button
                            variant={'outline'}
                            onClick={() => handleAddToCart()}
                            type="button"
                        >
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
    title = undefined,
    className,
    required = false,
}: {
    children: React.ReactNode;
    title?: string | undefined;
    className?: string;
    required?: boolean;
}) {
    return (
        <section
            className={`flex flex-col gap-y-5 rounded-md border-[1px] border-slate-300 p-4 shadow-md ${className}`}
        >
            {title && (
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
            )}
            {children}
        </section>
    );
}
