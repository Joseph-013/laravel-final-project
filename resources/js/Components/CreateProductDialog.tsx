import { Product } from '@/Pages/Products';
import { useForm } from '@inertiajs/react';
import {
    IconAlertTriangleFilled,
    IconCirclePlusFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
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
    image_file: File | undefined;
}

export default function CreateProductDialog() {
    const { data, setData, post, processing, errors, reset } =
        useForm<CreateProduct>({
            name: '',
            keyword: '',
            description: '',
            image_file: undefined,
            active: false,
        });

    const [useDefaultKeyword, setUseDefaultKeyword] = useState<boolean>(true);

    useEffect(() => {
        if (!useDefaultKeyword) return;
        setKeywordManual();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useDefaultKeyword, data.name]);

    function setKeywordManual() {
        const keyword: string = data.name
            ? data.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-zA-Z0-9-]/g, '')
            : '';
        setData('keyword', keyword);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof Product, e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null; // Get the first file
        if (file) {
            setData('image_file', file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('keyword', data.keyword); // Using keyword as category
        formData.append('description', data.description);

        if (data.image_file) {
            formData.append('image_file', data.image_file);
        }

        post(route('admin.store'), {
            data: formData,
            onSuccess: () => {
                reset();
                setDialogOpen(false);
                toast.success('Product Added Successfully!');
            },
            // Optional: handle validation errors
            onError: () => {
                toast.error('Error Adding Product.');
                // Handle any errors if needed
            },
        });
    };

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-x-1 rounded-lg bg-secondary px-2 py-1 text-xs text-black">
                    <IconCirclePlusFilled className="text-primary" /> Create
                    Product
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription />
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="flex flex-col gap-y-3 text-start"
                    >
                        <LabeledInput
                            label="Name:"
                            type="text"
                            name="name"
                            inputProps={{
                                required: true,
                                value: data.name,
                                onChange: handleChange,
                                autoComplete: 'off',
                                'aria-autocomplete': 'none',
                            }}
                        />
                        <div className="flex items-end gap-2">
                            <LabeledInput
                                name="keyword"
                                className="flex-1"
                                label="Keyword:"
                                type="text"
                                inputProps={{
                                    required: true,
                                    disabled: useDefaultKeyword,
                                    value: data.keyword,
                                    onChange: handleChange,
                                    autoComplete: 'off',
                                }}
                            />
                            <div className="flex h-10 w-fit items-center">
                                <Checkbox
                                    required
                                    id="default_keyword"
                                    checked={useDefaultKeyword}
                                    onChange={(e) => {
                                        setUseDefaultKeyword(e.target.checked);
                                        setKeywordManual();
                                    }}
                                    className="checked:bg-primary active:bg-primary"
                                />
                                <label
                                    htmlFor="default_keyword"
                                    className="cursor-pointer select-none pl-2 text-sm"
                                >
                                    Default
                                </label>
                            </div>
                        </div>
                        <LabeledInput
                            label="Description:"
                            type="textarea"
                            name="description"
                            inputProps={{
                                required: true,
                                value: data.description,
                                onChange: handleChange,
                            }}
                        />
                        <LabeledInput
                            label="Image:"
                            type="file"
                            name="image_file"
                            inputProps={{
                                required: true,
                                onChange: handleFileChange,
                                accept: 'image/jpeg,image/png,image/gif,image/jpg', // Restrict file selection in file dialog
                            }}
                        />

                        <div>
                            <span className="font-sans text-sm">
                                Set as "visible" after creating:
                            </span>
                            <div className="flex h-10 items-center rounded-md border-[1px] px-3">
                                <Checkbox
                                    id="active"
                                    checked={data.active}
                                    onChange={(e) => {
                                        setData('active', e.target.checked);
                                    }}
                                    className="checked:bg-primary active:bg-primary"
                                />
                                <label
                                    htmlFor="active"
                                    className="flex-1 cursor-pointer select-none pl-2 text-sm"
                                >
                                    Visible
                                </label>
                            </div>
                        </div>
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
