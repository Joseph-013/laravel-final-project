import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import LabeledInput from './LabeledInput';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';

interface CarouselPhoto {
    carouselID: number;
    title: string;
    photoLink?: string; // Use optional string for existing photo URL
}

interface EditCarouselDialogProps {
    showcase: CarouselPhoto;
    onClose: () => void;
}

export default function EditShowcaseDialog({
    showcase,
    onClose,
}: EditCarouselDialogProps) {
    const { data, setData, processing } = useForm({
        title: showcase.title,
        photoLink: undefined as File | undefined, // Explicitly type photoLink
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setData('photoLink', file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        
        if (data.photoLink) {
            formData.append('photoLink', data.photoLink);
        }

        router.post(route('admin.updateShowcase', showcase.carouselID), {
            ...Object.fromEntries(formData),
            _method: 'PATCH'
        }, {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                toast.success('Showcase Photo Updated Successfully!')

            },
            onError: (errors) => {
                toast.error('Error Updating Showcase Photo.')
                console.error('Error updating showcase:', errors);
            }
        });
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Showcase</DialogTitle>
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
                                value: data.title,
                                onChange: (e) => setData('title', e.target.value),
                                autoComplete: 'off',
                                'aria-autocomplete': 'none',
                            }}
                        />
                        <LabeledInput
                            label="Image:"
                            type="file"
                            name="photoLink"
                            inputProps={{
                                onChange: handleFileChange,
                                accept: 'image/jpeg,image/png,image/gif,image/jpg',
                            }}
                        />

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}