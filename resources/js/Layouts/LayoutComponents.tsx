import { InertiaLinkProps, Link } from '@inertiajs/react';

interface HeaderNavLinkProps extends InertiaLinkProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    targetRouteNames: string[] | string;
    popover?: boolean;
}

/**
 * HeaderNavLink Component
 *
 * This component wraps the Inertia `Link` component and highlights the link when the current route
 * matches one of the provided target route names. It supports adding icons and flexible layouts (vertical or horizontal).
 * It also logs an error if `route().current()` is undefined.
 *
 * ### Props
 * - `children`: The content to display inside the link, such as text or other elements.
 * - `icon`: Optional. An icon component or JSX element to display alongside the link text.
 * - `targetRouteNames`: A single route name (string) or an array of route names (`string[]`) that will be matched against
 *    the current route using `route().current()`.
 * - `popover`: Optional. A boolean to toggle layout styling. If `true`, displays content in a row layout.
 * - `props`: Additional props passed to the underlying Inertia `Link` component, such as `href` or `className`.
 *
 * ### Features
 * - Highlights the link with a background when active (`bg-white/50`).
 * - Supports horizontal or vertical layout with `flex-row` or `flex-col` classes.
 * - Logs an error if `route().current()` returns `undefined`.
 *
 * ### Examples
 * #### Basic Usage:
 * ```tsx
 * <HeaderNavLink
 *   href="/dashboard"
 *   targetRouteNames="dashboard"
 * >
 *   Dashboard
 * </HeaderNavLink>
 * ```
 *
 * #### With Icon and Vertical Layout:
 * ```tsx
 * <HeaderNavLink
 *   href="/profile"
 *   targetRouteNames={["profile", "user.profile"]}
 *   icon={<UserIcon />}
 * >
 *   Profile
 * </HeaderNavLink>
 * ```
 *
 * #### Horizontal Layout with Popover:
 * ```tsx
 * <HeaderNavLink
 *   href="/settings"
 *   targetRouteNames="settings"
 *   popover
 *   icon={<SettingsIcon />}
 * >
 *   Settings
 * </HeaderNavLink>
 * ```
 *
 * @param {React.ReactNode} children - The content to be displayed inside the link.
 * @param {React.ReactNode | null} icon - Optional icon component or JSX element to display.
 * @param {string | string[]} targetRouteNames - A single route name or array of route names to highlight when active.
 * @param {boolean} [popover] - Optional flag to toggle layout styling.
 * @param {InertiaLinkProps} props - Additional props passed to the Inertia `Link` component.
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
