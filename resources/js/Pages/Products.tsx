import { ProductGridItem, sampleProducts } from '@/Components/ProductCard';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export type Product = {
    id: number;
    name: string;
    keyword: string;
    description: string;
    imageSrc: string;
};

export default function Products({ products }: { products: Product[] }) {
    products = sampleProducts;
    return (
        <GuestLayout>
            <Head title="Products" />
            <h1 className="mb-2 text-xl font-bold">
                Our Products and Services:
            </h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {products.map((product, index) => (
                        <ProductGridItem
                            key={product.keyword + index}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
