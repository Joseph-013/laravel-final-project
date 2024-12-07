import { Search } from 'lucide-react';

/**
 * HeaderSearch Component
 *
 * A search bar component with an input field and a button, typically used in the header for quick search functionality.
 * The input field and button can accept external props for customization.
 *
 * @param inputProps - Props for the input element (inherited from React.InputHTMLAttributes<HTMLInputElement>).
 * @param buttonProps - Props for the button element (inherited from React.ButtonHTMLAttributes<HTMLButtonElement>).
 * @param className - Optional additional class names for customizing the container's styles.
 *
 * @example
 * ```tsx
 * <HeaderSearch
 *   inputProps={{ placeholder: 'Search...', onChange: handleSearch }}
 *   buttonProps={{ onClick: handleSearchSubmit }}
 *   className="custom-class"
 * />
 * ```
 */
export default function HeaderSearch({
    inputProps,
    buttonProps,
    className,
}: {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    className?: string;
}) {
    return (
        <div
            className={`flex h-10 ${className} overflow-clip rounded-full border-2 border-primary`}
        >
            <input
                {...inputProps}
                className="h-full w-full rounded-l-full border-none bg-background pl-5 text-sm"
            />
            <button
                {...buttonProps}
                className="flex h-full w-12 min-w-12 flex-none items-center justify-center rounded-r-full border-none bg-background hover:bg-primary/10"
            >
                <Search size={21} />
            </button>
        </div>
    );
}
