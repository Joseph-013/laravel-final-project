import LabeledInput from '@/Components/LabeledInput';
import { Button } from '@/Components/ui/button';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface UpdatePasswordFormProps {
    current_password?: string;
    new_password?: string;
    new_password_confirmation?: string;
}

export default function UpdatePasswordForm() {
    const { data, setData, put, errors, reset, clearErrors } =
        useForm<UpdatePasswordFormProps>({
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof UpdatePasswordFormProps, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Password updated successfully.');
                clearErrors();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            <LabeledInput
                label="Current Password:"
                type="password"
                name="current_password"
                inputProps={{
                    placeholder: '--',
                    value: data.current_password,
                    onChange: handleChange,
                }}
                error={errors.current_password}
            />
            <LabeledInput
                label="New Password:"
                type="password"
                name="new_password"
                inputProps={{
                    disabled: data.current_password === '',
                    required: data.current_password !== '',
                    placeholder: '--',
                    value: data.new_password,
                    onChange: handleChange,
                }}
                error={errors.new_password}
            />
            <LabeledInput
                label="Confirm New Password:"
                type="password"
                name="new_password_confirmation"
                inputProps={{
                    disabled: data.new_password === '',
                    required: data.new_password !== '',
                    placeholder: '--',
                    value: data.new_password_confirmation,
                    onChange: handleChange,
                }}
                error={errors.new_password_confirmation}
            />

            {(data.current_password !== '' || data.new_password !== '') && (
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        onClick={() => {
                            reset();
                            clearErrors();
                        }}
                        variant="outline"
                    >
                        Reset
                    </Button>
                    <Button type="submit" onClick={() => null}>
                        Submit
                    </Button>
                </div>
            )}
        </form>
    );
}
