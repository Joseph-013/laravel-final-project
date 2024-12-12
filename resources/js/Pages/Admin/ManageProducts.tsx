import ConfirmDialog from '@/Components/ConfirmDialog';
import CreateProductDialog from '@/Components/CreateProductDialog';
import EditProductDialog from '@/Components/EditProductDialog';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon, 
  EyeIcon 
} from 'lucide-react';

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const handleDelete = (id: number) => {
        router.delete(route('admin.destroy', id), {
            onSuccess: () => {
                toast.success('Product Deleted Successfully!');
            },
            onError: () => {
                toast.error('Error Deleting Product.');
            },
            preserveScroll: true,
        });
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                            Product Catalog
                        </h1>
                        <p className="text-gray-500">
                            Manage and organize your products and services
                        </p>
                    </div>
                    <CreateProductDialog>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            Add New Product
                        </button>
                    </CreateProductDialog>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <EyeIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                        <p className="text-xl text-gray-600">
                            No products found. Start by adding a new product.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
                            >
                                <div className="relative">
                                    {product.imageSrc ? (
                                        <img
                                            src={product.imageSrc}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                    <span 
                                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                                            product.active 
                                                ? 'bg-green-500/20 text-green-800' 
                                                : 'bg-gray-500/20 text-gray-800'
                                        }`}
                                    >
                                        {product.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 h-11 text-sm line-clamp-3 mb-4">
                                        {product.description}
                                    </p>

                                    <div className="flex justify-between items-center border-t pt-4">
                                        <button 
                                            onClick={() => handleEdit(product)}
                                            className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-md transition-colors"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                            Edit
                                        </button>
                                        
                                        <ConfirmDialog
                                            trigger={
                                                <button className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-3 py-2 rounded-md transition-colors">
                                                    <TrashIcon className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            }
                                            title="Confirm Deletion"
                                            description="Are you sure you want to delete this product? This action cannot be undone."
                                            accept="Delete"
                                            cancel="Cancel"
                                            onclick={() => handleDelete(product.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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