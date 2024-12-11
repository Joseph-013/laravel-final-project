import { Product } from '@/Pages/Products';
import { Link } from '@inertiajs/react';

type ProductCardProps = {
    product: Product;
    href: string;
};

export default function ProductCard({ product, href }: ProductCardProps) {
    const className =
        window.location.hash === `#${product.keyword}`
            ? 'border-[0.5rem] border-sky-500'
            : 'border-[1px] border-slate-300';
    return (
        <Link
            href={href}
            className={`group flex h-[30rem] w-full flex-col rounded-3xl shadow-md ${className}`}
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
        <div
            className="flex h-full w-full items-center justify-center"
            id={product.keyword}
        >
            <ProductCard product={product} href={href} />
        </div>
    );
}
