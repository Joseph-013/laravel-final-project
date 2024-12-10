import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { useForm, router } from '@inertiajs/react';
import { Button } from './ui/button';
import LabeledInput from './LabeledInput';

interface Product {
    id: number;
    name: string;
    keyword: string;
    description: string;
    active: boolean;
    image_file: string | null;
}

interface EditProductDialogProps {
    product: Product;
    onClose: () => void;
}

export default function EditProductDialog({
    product,
    onClose,
}: EditProductDialogProps) {
    const { data, setData, processing } = useForm({
        name: product.name,
        keyword: product.keyword,
        description: product.description,
        active: product.active,
        image_file: undefined as File | undefined,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setData('image_file', file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('keyword', data.keyword);
        formData.append('description', data.description || '');
        if (data.image_file) {
            formData.append('image_file', data.image_file);
        }
        formData.append('active', String(data.active));

        router.post(route('admin.update', product.id), {
            ...Object.fromEntries(formData),
            _method: 'PATCH'
        }, {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                // You can add a toast or alert here if needed
            },
            onError: (errors) => {
                console.error('Error updating product:', errors);
            }
        });
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-y-3"
                >
                    <LabeledInput
                        label="Name"
                        type="text"
                        name="name"
                        inputProps={{
                            required: true,
                            value: data.name,
                            onChange: (e) => setData('name', e.target.value),
                        }}
                    />
                    <LabeledInput
                        label="Keyword"
                        type="text"
                        name="keyword"
                        inputProps={{
                            value: data.keyword,
                            onChange: (e) => setData('keyword', e.target.value),
                        }}
                    />
                    <LabeledInput
                        label="Description"
                        type="textarea"
                        name="description"
                        inputProps={{
                            value: data.description,
                            onChange: (e) => setData('description', e.target.value),
                        }}
                    />
                    <LabeledInput
                        label="Image"
                        type="file"
                        name="image_file"
                        inputProps={{
                            onChange: handleFileChange,
                            accept: 'image/*',
                        }}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={data.active}
                            onChange={(e) => setData('active', e.target.checked)}
                        />{' '}
                        Active
                    </label>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}