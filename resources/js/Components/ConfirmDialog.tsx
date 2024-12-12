import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { useState } from 'react';

function ConfirmDialog({
    children,
    onclick,
    ...props
}: {
    children?: React.ReactNode;
    onclick: () => void;
    trigger: React.ReactNode;
    title: string;
    description?: string;
    accept?: string;
}) {
    const [open, setOpen] = useState(false);

    // const handleAction = () => {
    //     onclick();
    //     setOpen(false);
    // };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{props?.trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {children}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onclick();
                        }}
                        className="bg-destructive hover:bg-destructive/80"
                    >
                        {props.accept}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConfirmDialog;
