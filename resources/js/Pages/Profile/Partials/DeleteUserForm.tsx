import Checkbox from '@/Components/Checkbox';
import LabeledInput from '@/Components/LabeledInput';
import { Button } from '@/Components/ui/button';
import { useForm } from '@inertiajs/react';

interface DeleteUserFormProps {
    authorized: boolean;
    password: string;
}

export default function DeleteUserForm() {
    const {
        data,
        setData,
        delete: _delete,
        errors,
        reset,
    } = useForm<DeleteUserFormProps>({
        authorized: false,
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof DeleteUserFormProps, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        _delete(route('profile.destroy'), { preserveScroll: true });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            <p className="mt-1 text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                backup any data or information that you wish to retain.
            </p>

            <div className="flex items-center">
                <Checkbox
                    required
                    name="authorized"
                    id="authorized"
                    checked={data.authorized}
                    onChange={(e) => setData('authorized', e.target.checked)}
                    className="checked:bg-primary active:bg-primary"
                />
                <label
                    htmlFor="authorized"
                    className={`cursor-pointer pl-2 text-sm ${data.authorized && 'font-bold text-red-500'}`}
                >
                    I would like to proceed with deleting my account.
                </label>
            </div>
            <LabeledInput
                className={data.authorized ? 'block' : 'hidden'}
                label="Password:"
                type="password"
                name="password"
                inputProps={{
                    disabled: !data.authorized,
                    required: data.authorized,
                    placeholder: '--',
                    value: data.password,
                    onChange: handleChange,
                }}
                error={errors.password}
            />
            <div
                className={`justify-end gap-3 ${data.authorized ? 'flex' : 'hidden'}`}
            >
                <Button type="button" onClick={() => reset()} variant="outline">
                    Cancel
                </Button>
                <Button
                    disabled={!data.authorized || data.password === ''}
                    type="submit"
                    variant="destructive"
                >
                    Delete Account
                </Button>
            </div>
        </form>
    );
}
