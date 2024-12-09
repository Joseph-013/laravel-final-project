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

interface Product {
  id: number;
  name: string;
  description:string;
  keyword: string;
  active: boolean;
  image_file: string | null;
}

interface ManageProductsProps {
  products: Product[];
}

export default function ManageProducts({ products }: ManageProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
        router.delete(route('admin.destroy', id), {
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


  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <AdminLayout>
      <Head title="Manage Products" />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">All Products and Services</h1>
      </div>
      <Table>
        <TableCaption>List of all offered products and services.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                {product.image_file ? (
                  <img
                    src={product.image_file}
                    alt={product.name}
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
                    onClick={() => handleEdit(product)}
                    className="text-blue-500"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
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
              <CreateProductDialog />
          </ControlContainer>

      {selectedProduct && (
        <EditProductDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </AdminLayout>
  );
}