/**
 * Generates a simple horizontal or vertical line.
 * @param className - Specify any other className. Can override other classNames.
 * @param variant - Array of/or single string. "v" for vertical, "h" for horizontal.
 */

export default function Line({
    className,
    variant,
}: {
    className?: string;
    variant: string[] | string;
}) {
    variant = [...variant];
    if (variant.some((v: string) => v === 'h')) {
        className = `${className} h-0 border-t-2 w-full`;
    } else if (variant.some((v: string) => v === 'v')) {
        className = `${className} w-0 border-l-2 h-full`;
    }

    className = `border-zinc-400 ${className}`;

    return <div className={className} />;
}
