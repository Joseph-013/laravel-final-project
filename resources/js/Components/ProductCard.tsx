import { Product } from '@/Pages/Products';
import { Link } from '@inertiajs/react';

export const sampleProducts: Product[] = [
    {
        id: 0,
        name: 'Documents',
        keyword: 'documents',
        description: 'Lorem lajhsd kjash dkjashd',
        imageSrc:
            'https://th.bing.com/th/id/OIP.WGwRpXGxJetkp5l5n01J4AHaDb?rs=1&pid=ImgDetMain',
    },
    {
        id: 1,
        name: 'ID Photos',
        keyword: 'id-photos',
        description: 'Lorem lajhsd kjash dkjashd Lorem lajhsd kjash',
        imageSrc:
            'https://greatimage.com.ph/wp-content/uploads/2019/08/ID-3.jpg',
    },
    {
        id: 2,
        name: 'Legal Documents',
        keyword: 'legal-documents',
        description:
            'Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd',
        imageSrc:
            'https://th.bing.com/th/id/OIP.WGwRpXGxJetkp5l5n01J4AHaDb?rs=1&pid=ImgDetMain',
    },
    {
        id: 3,
        name: 'Photo Editing',
        keyword: 'photo-editing',
        description:
            'Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd',
        imageSrc:
            'https://greatimage.com.ph/wp-content/uploads/2019/08/ID-3.jpg',
    },
    {
        id: 4,
        name: 'Photo Editing',
        keyword: 'photo-editing',
        description:
            'Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd',
        imageSrc:
            'https://greatimage.com.ph/wp-content/uploads/2019/08/ID-3.jpg',
    },
    {
        id: 5,
        name: 'Photo Editing',
        keyword: 'photo-editing',
        description:
            'Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd Lorem lajhsd kjash dkjashd',
        imageSrc:
            'https://greatimage.com.ph/wp-content/uploads/2019/08/ID-3.jpg',
    },
];

type ProductCardProps = {
    product: Product;
    href: string;
};

export default function ProductCard({ product, href }: ProductCardProps) {
    return (
        <Link
            href={href}
            className="group flex h-[30rem] w-full flex-col rounded-2xl border-[1px] border-slate-300 shadow-md"
        >
            <div className="relative h-[23rem] w-full overflow-hidden rounded-b-none rounded-t-2xl">
                <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40"></div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                        {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {product.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export function ProductGridItem({ product, href }: ProductCardProps) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <ProductCard product={product} href={href} />
        </div>
    );
}
