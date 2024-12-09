import LabeledInput from '@/Components/LabeledInput';
import { Button } from '@/Components/ui/button';
import { useForm } from '@inertiajs/react';

interface UpdatePasswordFormProps {
    current_password?: string;
    new_password?: string;
}

export default function UpdatePasswordForm() {
    const { data, setData, post, processing, errors, reset } =
        useForm<UpdatePasswordFormProps>({
            current_password: '',
            new_password: '',
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof UpdatePasswordFormProps, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            />
            {(data.current_password !== '' || data.new_password !== '') && (
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        onClick={() => reset()}
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
