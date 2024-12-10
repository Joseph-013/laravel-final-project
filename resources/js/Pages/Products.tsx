import { ProductGridItem } from '@/Components/ProductCard';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export type Product = {
    id?: number;
    name: string;
    description: string;
    keyword: string;
    imageSrc?: string;
    active: boolean;
};

export default function Products({ products }: { products: Product[] }) {
    console.log('products', products);

    // products = sampleProducts;

    return (
        <UserLayout>
            <Head title="Products" />
            <h1 className="mb-2 p-2 text-2xl font-extrabold text-primary">
                Our Products and Services:
            </h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <ProductGridItem
                            key={product.keyword + index}
                            product={product}
                            href={route('product.form', product.keyword)}
                        />
                    ))}
                </div>
            </div>
        </UserLayout>
    );
}
