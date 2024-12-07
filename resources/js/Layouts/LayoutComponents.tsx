import { InertiaLinkProps, Link } from '@inertiajs/react';

interface HeaderNavLinkProps extends InertiaLinkProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    targetRouteNames: string[] | string;
    popover?: boolean;
}

/**
 * A component that wraps the Inertia `Link` component and automatically underlines the link text
 * if the current route matches one of the provided target route names. Retuns an error if route().current() is undefined.
 *
 * This component accepts a `targetRouteNames` prop that can be a single route name (string)
 * or an array of route names (`string[]`). It will check the current route using `route().current()`,
 * and apply the "underline" class to the link when there is a match.
 *
 * @param children - The content to be displayed inside the link.
 * @param targetRouteNames - A single route name or an array of route names that should trigger
 * underlining if the current route matches.
 * @param props - Additional props passed to the Inertia `Link` component, such as `href`, `className`, etc.
 */
export function HeaderNavLink({
    children,
    icon = null,
    targetRouteNames,
    popover,
    ...props
}: HeaderNavLinkProps) {
    function isActive() {
        const currentRoute = route().current();
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
            className={`${isActive() && 'bg-white/50'} p-3 ${props.className ?? ''} flex items-center justify-center rounded-lg ${popover ? 'flex-row' : `flex-col ${icon ? 'text-xs' : 'text-base'}`}`}
        >
            {icon && <div>{icon}</div>}
            <div>{children}</div>
        </Link>
    );
}
