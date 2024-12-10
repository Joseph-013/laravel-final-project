import { Product } from '@/Pages/Products';
import { useForm } from '@inertiajs/react';
import {
    IconAlertTriangleFilled,
    IconCirclePlusFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import LabeledInput from './LabeledInput';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';

interface CreateProduct extends Product {
    photoLink: File | undefined;
}

export default function CreateShowcaseDialog() {
    const { data, setData, post, processing, errors, reset } =
        useForm<CreateProduct>({
            title: '',
            photoLink: undefined,
        });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof Product, e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null; // Get the first file
        if (file) {
            console.log(file);
            setData('photoLink', file);
          
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.name);
        
        if (data.photoLink) {
            formData.append('photoLink', data.photoLink);
        }

        post(route('admin.storeShowcase'), {
            data: formData,
            onSuccess: () => {
                reset();
                setDialogOpen(false);
            },
            // Optional: handle validation errors
            onError: () => {
                // Handle any errors if needed
            }
        });
    };

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-x-1 rounded-lg bg-secondary px-2 py-1 text-xs text-black">
                    <IconCirclePlusFilled className="text-primary" /> Add Showcase
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Showcase</DialogTitle>
                    <DialogDescription />
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="flex flex-col gap-y-3 text-start"
                    >
                        <LabeledInput
                            label="Name:"
                            type="text"
                            name="title"
                            inputProps={{
                                required: true,
                                value: data.name,
                                onChange: handleChange,
                                autoComplete: 'off',
                                'aria-autocomplete': 'none',
                            }}
                        />
                        <LabeledInput
                            label="Image:"
                            type="file"
                            name="photoLink"
                            inputProps={{
                                required: true,
                                onChange: handleFileChange,
                                accept: 'image/jpeg,image/png,image/gif,image/jpg', // Restrict file selection in file dialog
                            }}
                        />

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IconAlertTriangleFilled className="size-7 flex-shrink-0" />{' '}
                            Before clicking create, please absolutely confirm
                            that all provided details are correct.
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => reset()}
                            >
                                Clear
                            </Button>
                            <Button onClick={() => null}>Create</Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
