import { InertiaLinkProps, Link } from '@inertiajs/react';

interface HeaderNavLinkProps extends InertiaLinkProps {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    targetRouteNames?: string[] | string;
    dropdown?: boolean;
}

/**
 * HeaderNavLink Component
 *
 * This component wraps the Inertia `Link` component and highlights the link when the current route
 * matches one of the provided target route names. It supports adding icons and flexible layouts (vertical or horizontal).
 * It also logs an error if `route().current()` is undefined.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the link.
 * @param {React.ReactNode | null} icon - Optional icon component or JSX element to display.
 * @param {string | string[]} targetRouteNames - A single route name or array of route names to highlight when active.
 * @param {boolean} [dropdown] - Optional flag to toggle layout styling.
 * @param {InertiaLinkProps} props - Additional props passed to the Inertia `Link` component.
 *
 * #### Basic Usage:
 * ```tsx
 * <HeaderNavLink
 *   href="/dashboard"
 *   targetRouteNames="dashboard"
 * >
 *   Dashboard
 * </HeaderNavLink>
 * ```
 */
export function HeaderNavLink({
    children,
    icon = null,
    targetRouteNames,
    dropdown,
    ...props
}: HeaderNavLinkProps) {
    function isActive() {
        const currentRoute = route().current();
        console.log(currentRoute);
        if (Array.isArray(targetRouteNames)) {
            // If targetRouteNames is an array, check if it includes the current route
            if (currentRoute === undefined) {
                console.error('route().current() returned undefined.');
            } else if (targetRouteNames.includes(currentRoute)) return true;
        } else if (
            typeof targetRouteNames === 'string' &&
            targetRouteNames === currentRoute
        ) {
            // If targetRouteNames is a string, check if it matches the current route
            return true;
        }

        return false;
    }
    return (
        <Link
            {...props}
            className={`${isActive() && (dropdown ? 'bg-primary/20' : 'bg-white/50')} p-3 ${props.className ?? ''} relative flex items-center justify-center rounded-lg ${dropdown ? `w-full flex-row gap-x-2` : `flex-col ${icon ? 'text-xs' : 'text-base'}`}`}
        >
            {icon && <div>{icon}</div>}
            <div>{children}</div>
        </Link>
    );
}
