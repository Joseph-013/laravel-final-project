import LabeledInput from '@/Components/LabeledInput';
import { Button } from '@/Components/ui/button';
import { useForm } from '@inertiajs/react';
import { ProfileType } from '../Edit';

export function UpdateProfileInformationForm({
    profile,
}: {
    profile: ProfileType;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: profile.username,
        fullname: profile.fullname,
        email: profile.email,
        social_username: profile.social_username,
        contact_number: profile.contact_number,
        default_address: profile.default_address,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof ProfileType, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            <LabeledInput
                label="Username:"
                type="text"
                name="username"
                inputProps={{
                    required: true,
                    value: data.username,
                    onChange: handleChange,
                }}
            />
            <LabeledInput
                label="Fullname:"
                type="text"
                name="fullname"
                inputProps={{
                    required: true,
                    value: data.fullname,
                    onChange: handleChange,
                }}
            />
            <LabeledInput
                label="Email:"
                type="text"
                name="email"
                inputProps={{
                    required: true,
                    value: data.email,
                    onChange: handleChange,
                }}
            />
            <LabeledInput
                label="Social Username (Facebook/Instagram):"
                type="text"
                name="social_username"
                inputProps={{
                    required: true,
                    value: data.social_username,
                    onChange: handleChange,
                }}
            />
            <LabeledInput
                label="Contact Number:"
                type="text"
                name="contact_number"
                inputProps={{
                    required: true,
                    value: data.contact_number,
                    onChange: handleChange,
                }}
            />
            <LabeledInput
                label="Default Address (you can change this in your orders):"
                type="text"
                name="default_address"
                inputProps={{
                    required: true,
                    value: data.default_address,
                    onChange: handleChange,
                }}
            />
            {JSON.stringify(data) !== JSON.stringify(profile) && (
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
