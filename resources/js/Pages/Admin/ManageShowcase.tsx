import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/Components/ui/table';
  import AdminLayout from '@/Layouts/AdminLayout';
  import { Head, router } from '@inertiajs/react';
  import { Button } from '@/Components/ui/button';
  import { useState } from 'react';
  import EditProductDialog from '@/Components/EditProductDialog';
  import axios from 'axios';
  import ControlContainer from '@/Components/ControlContainer';
  import CreateProductDialog from '@/Components/CreateProductDialog';
import HeaderSearch from '@/Components/HeaderSearch';
import CreateShowcaseDialog from '@/Components/CreateShowcaseDialog';
import EditShowcaseDialog from '@/Components/EditShowcaseDialog';
  
//   interface Product {
//     id: number;
//     name: string;
//     description:string;
//     keyword: string;
//     active: boolean;
//     image_file: string | null;
//   }
  
  interface ManageProductsProps {
    products: Product[];
  }
  
  export default function ManageShowcase({ carousels }: ManageProductsProps) {
    const [selectedShowcase, setselectedShowcase] = useState<Product | null>(null);
  
const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this showcase photo?')) {
        router.delete(route('admin.destroyShowcase', id), {
            onSuccess: () => {
                //put alert here
            },
            onError: () => {
                alert('Failed to delete product.');
            },
            preserveScroll: true, // Ensures the scroll position is maintained
        });
    }
};


  const handleEdit = (carousel: Product) => {
    setselectedShowcase(carousel);
  };
  
  
//     const handleEdit = (product: Product) => {
//       setSelectedProduct(product);
//     };
  
    return (
      <AdminLayout>
        <Head title="Manage Products" />
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Showcase Photos</h1>
          <HeaderSearch handleSearch={(text)=>{}}/>
        </div>
        <Table>
          <TableCaption>List of all offered products and services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carousels.map((carousel) => (
              <TableRow key={carousel.carouselID}>
                <TableCell className="font-medium">{carousel.title}</TableCell>
                <TableCell>
                {carousel.photoLink ? (
                  <img
                    src={carousel.photoLink}
                    alt={carousel.photoLink}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  'No Image'
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(carousel)}
                    className="text-blue-500"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(carousel.carouselID)}
                    className="text-red-500"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ControlContainer>
                <CreateShowcaseDialog />
            </ControlContainer>
  
        {selectedShowcase && (
          <EditShowcaseDialog
            showcase={selectedShowcase}
            onClose={() => setselectedShowcase(null)}
          />
        )}
      </AdminLayout>
    );
  }