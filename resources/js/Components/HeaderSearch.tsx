import { Search } from 'lucide-react';
import { useState } from 'react';

/**
 * HeaderSearch Component
 *
 * A search bar component with an input field and a button, typically used in the header for quick search functionality.
 * The input field and button can accept external props for customization. The component manages its own input state
 * and calls the provided `handleSearch` function with the input text when the search button is clicked or when
 * the Enter key is pressed in the input field.
 *
 * @param inputProps - Props for the input element (inherited from React.InputHTMLAttributes<HTMLInputElement>).
 * @param buttonProps - Optional props for the button element (inherited from React.ButtonHTMLAttributes<HTMLButtonElement>).
 * @param handleSearch - A function that will be called when the search button is clicked or Enter is pressed, receiving the input text as an argument.
 * @param className - Optional additional class names for customizing the container's styles.
 *
 * @example
 * ```tsx
 * <HeaderSearch
 *   inputProps={{ placeholder: 'Search', type: 'text' }}
 *   buttonProps={{ onClick: handleSearchSubmit }}
 *   handleSearch={(text) => null}
 *   className="custom-class"
 * />
 * ```
 */
export default function HeaderSearch({
    inputProps,
    buttonProps,
    handleSearch,
    className,
}: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    handleSearch: (text: string) => void;
    className?: string;
}) {
    const [text, setText] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(text);
        }
    };

    return (
        <div
            className={`flex h-10 ${className} overflow-clip rounded-full border-2 border-primary`}
        >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-full w-full rounded-l-full border-none bg-background pl-5 text-sm"
                {...inputProps}
            />
            <button
                onClick={() => handleSearch(text)}
                className="flex h-full w-12 min-w-12 flex-none items-center justify-center rounded-r-full border-none bg-background hover:bg-primary/10"
                {...buttonProps}
            >
                <Search size={21} />
            </button>
        </div>
    );
}
