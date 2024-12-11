import CreateProductDialog from '@/Components/CreateProductDialog';
import EditProductDialog from '@/Components/EditProductDialog';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
    id: number;
    name: string;
    description: string;
    keyword: string;
    active: boolean;
    imageSrc?: string;
}

interface ManageProductsProps {
    products: Product[];
}

export default function ManageProducts({ products }: ManageProductsProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.destroy', id), {
                onSuccess: () => {
                    toast.info('Product Delete Successfully!');
                },
                onError: () => {
                    toast.error('Error Adding Product.');
                },
                preserveScroll: true, // Ensures the scroll position is maintained
            });
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />
            <div className="container mx-auto py-10">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        All Products and Services
                    </h1>
                    <CreateProductDialog />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="overflow-hidden rounded-lg bg-white shadow-md"
                        >
                            <div className="p-0">
                                {product.imageSrc ? (
                                    <div
                                        className="relative h-48 w-full cursor-pointer"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                        }}
                                    >
                                        <img
                                            src={product.imageSrc}
                                            alt={product.name}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-gray-200">
                                        <span className="text-gray-500">
                                            No Image
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="mb-2 text-xl font-semibold">
                                    {product.name}
                                </h2>
                                <span
                                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                                        product.active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {product.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="flex justify-between border-t p-4">
                                <button
                                    className="rounded border border-primary px-3 py-1 text-primary transition-colors hover:bg-primary hover:text-white"
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="rounded bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <EditProductDialog
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </AdminLayout>
    );
}
