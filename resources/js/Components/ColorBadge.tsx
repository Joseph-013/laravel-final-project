export const colorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    orange: 'bg-orange-100 text-orange-600',
    gray: 'bg-gray-100 text-gray-600',
    neutral: 'bg-neutral-100 text-neutral-600',
    // Add more colors as needed
};

export type AllowedColors = keyof typeof colorClasses;

export default function ColorBadge({
    children,
    color, // Default color fallback
}: {
    children: React.ReactNode;
    color?: AllowedColors;
}) {
    const className = colorClasses[color || 'neutral'];

    return (
        <div
            className={`mt-1 w-fit rounded-md px-2 py-1 text-sm font-bold ${className}`}
        >
            {children}
        </div>
    );
}
