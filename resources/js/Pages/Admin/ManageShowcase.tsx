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
import CreateShowcaseDialog from '@/Components/CreateShowcaseDialog';
import EditShowcaseDialog from '@/Components/EditShowcaseDialog';
import ConfirmDialog from '@/Components/ConfirmDialog';

interface Carousel {
    carouselID: number;
    title: string;
    photoLink?: string;
}

interface ManageShowcaseProps {
    carousels: Carousel[];
}

export default function ManageShowcase({ carousels }: ManageShowcaseProps) {
    const [selectedShowcase, setSelectedShowcase] = useState<Carousel | null>(null);
    
    const handleDelete = (id: number) => {
        router.delete(route('admin.destroyShowcase', id), {
            onSuccess: () => {
                toast.success('Showcase Photo Deleted Successfully!');
            },
            onError: () => {
                toast.error('Error Deleting Showcase Photo.');
            },
            preserveScroll: true,
        });
    };

    const handleEdit = (carousel: Carousel) => {
        setSelectedShowcase(carousel);
    };

    return (
        <AdminLayout>
            <Head title="Manage Showcase" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                            Showcase Photos
                        </h1>
                        <p className="text-gray-500">
                            Manage and organize your showcase images
                        </p>
                    </div>
                    <CreateShowcaseDialog>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            Add New Showcase
                        </button>
                    </CreateShowcaseDialog>
                </div>

                {carousels.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <EyeIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                        <p className="text-xl text-gray-600">
                            No showcase photos found. Start by adding a new image.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {carousels.map((carousel) => (
                            <div 
                                key={carousel.carouselID} 
                                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
                            >
                                <div className="relative">
                                    {carousel.photoLink ? (
                                        <img
                                            src={carousel.photoLink}
                                            alt={carousel.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                        {carousel.title}
                                    </h2>

                                    <div className="flex justify-between items-center border-t pt-4">
                                        <button 
                                            onClick={() => handleEdit(carousel)}
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
                                            description="Are you sure you want to delete this showcase photo? This action cannot be undone."
                                            accept="Delete"
                                            cancel="Cancel"
                                            onclick={() => handleDelete(carousel.carouselID)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedShowcase && (
                <EditShowcaseDialog
                    showcase={selectedShowcase}
                    onClose={() => setSelectedShowcase(null)}
                />
            )}
        </AdminLayout>
    );
}