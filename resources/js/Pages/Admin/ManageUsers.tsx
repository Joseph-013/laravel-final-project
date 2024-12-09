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
  
  export default function ManageUsers({ users, bannedUsers }: ManageProductsProps) {
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
    const handleDelete = (id: number) => {
      if (confirm('Are you sure you want to delete this user?')) {
          router.delete(route('admin.banUser', id), {
              onSuccess: () => {
                  //put alert here
              },
              onError: () => {
                  alert('Failed to delete user.');
              },
              preserveScroll: true, // Ensures the scroll position is maintained
          });
      }
  };

  const handleRetrieve = (id: number) => {
    if (confirm('Are you sure you want to retrieve this user?')) {
        router.patch(route('admin.unbanUser', id), {
            onSuccess: () => {
                //put alert here
            },
            onError: () => {
                alert('Failed to retrieve user.');
            },
            preserveScroll: true, // Ensures the scroll position is maintained
        });
    }
};
  
  
//     const handleEdit = (product: Product) => {
//       setSelectedProduct(product);
//     };
  
    return (
      <AdminLayout>
        <Head title="Manage Products" />
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Users</h1>
          <HeaderSearch handleSearch={(text)=>{}}/>
        </div>
        <Table>
          <TableCaption>List of all offered products and services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell className="font-medium">{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500"
                    >
                      Ban User
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>



        <Head title="Manage Products" />
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Banned Users</h1>
          <HeaderSearch handleSearch={(text)=>{}}/>
        </div>
        <Table>
          <TableCaption>List of all offered products and services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell className="font-medium">{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    
                    <Button
                      variant="destructive"
                      onClick={() => handleRetrieve(user.id)}
                      className="text-red-500"
                    >
                      Unban User
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <ControlContainer>
                <CreateProductDialog />
            </ControlContainer> */}
  
        {/* {selectedProduct && (
          <EditProductDialog
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )} */}
      </AdminLayout>
    );
  }