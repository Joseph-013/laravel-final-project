import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function LabeledInput({
    label,
    labelProps,
    inputProps,
    type,
    id = undefined,
    name = undefined,
    className = undefined,
    error = undefined,
}: {
    label?: string;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    inputProps:
        | React.InputHTMLAttributes<HTMLInputElement>
        | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    type: React.HTMLInputTypeAttribute | 'textarea';
    id?: string | undefined;
    name?: string | undefined;
    className?: string | undefined;
    error?: string | undefined;
}) {
    id = name || undefined;
    return (
        <div className={className}>
            {label && (
                <Label {...labelProps} htmlFor={id}>
                    {label}
                </Label>
            )}
            {type === 'textarea' ? (
                <Textarea
                    {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    id={id}
                    name={name}
                />
            ) : (
                <Input
                    {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                    type={type as React.HTMLInputTypeAttribute}
                    id={id}
                    name={name}
                />
            )}
            {error && (
                <div className="mt-1 w-fit rounded-md bg-red-100 px-2 py-1 text-sm font-bold text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}
