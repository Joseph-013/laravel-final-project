import { Product } from '@/Pages/Products';
import { Link } from '@inertiajs/react';

type ProductCardProps = {
    product: Product;
    href: string;
};

export default function ProductCard({ product, href }: ProductCardProps) {
    return (
        <Link
            href={href}
            className="group flex h-[23rem] w-52 flex-col rounded-sm border-[1px] border-slate-300 p-2 shadow-md"
        >
            <div className="mb-2 flex-1">
                <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="mb-3 aspect-square w-full object-cover"
                />
                <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-5 group-hover:underline">
                    {product.name}
                </h3>
                <p className="line-clamp-3 text-sm">{product.description}</p>
            </div>
            <div className="w-full px-2 pb-2">
                <div className="flex items-center justify-center rounded-md border bg-primary-foreground px-1 py-2 group-hover:bg-primary group-hover:text-white">
                    Customize
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
