import HeaderSearch from '@/Components/HeaderSearch';
import { ProductGridItem } from '@/Components/ProductCard';
import UserLayout from '@/Layouts/UserLayout';
import { Head, router } from '@inertiajs/react';

export type Product = {
    id?: number;
    name: string;
    description: string;
    keyword: string;
    imageSrc?: string;
    active: boolean;
};

export default function Products({
    products,
    queryParameters,
}: {
    products: Product[];
    queryParameters: Record<
        string,
        string | number | boolean | string[] | number[] | undefined
    >;
}) {
    queryParameters = queryParameters || {};

    function handleProductSearch(text: string) {
        console.log('text', text);
        if (text) queryParameters['searchProducts'] = text;
        else delete queryParameters['searchProducts'];

        router.get(route('products'), queryParameters, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <UserLayout
            header={
                <HeaderSearch
                    className="ml-10 w-full max-w-80"
                    inputProps={{
                        type: 'text',
                        placeholder: 'Search',
                    }}
                    handleSearch={handleProductSearch}
                />
            }
        >
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
