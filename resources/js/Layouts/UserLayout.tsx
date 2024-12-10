import HeaderSearch from '@/Components/HeaderSearch';
import Line from '@/Components/Line';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    IconLogin2,
    IconLogout,
    IconMenu2,
    IconShoppingCart,
    IconUserCircle,
} from '@tabler/icons-react';

import { usePage } from '@inertiajs/react';
import BaseLayout from './BaseLayout';
import { HeaderNavLink } from './LayoutComponents';

interface UserLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function UserLayout({ children, className }: UserLayoutProps) {
    return (
        <BaseLayout headerContent={<HeaderContent />} className={className}>
            {children}
        </BaseLayout>
    );
}

export function HeaderContent() {
    const cartCount: number = 10;

    const authenticated: boolean = usePage().props.authenticated as boolean;

    return (
        <div className="flex w-full items-center justify-end gap-x-5">
            <HeaderSearch
                className="ml-10 w-full max-w-80"
                inputProps={{
                    type: 'text',
                    placeholder: 'Search',
                }}
                handleSearch={(text) => {
                    console.log(text);
                }}
            />
            <nav>
                {/* Mobile View */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="block rounded-lg p-2 hover:bg-white/50 sm:hidden">
                        <IconMenu2 />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                        <DropdownMenuItem>
                            <HeaderNavLink
                                // icon={<IconHome />}
                                href={
                                    authenticated
                                        ? route('home')
                                        : route('index')
                                }
                                targetRouteNames={['index', 'home']}
                                dropdown
                            >
                                Home
                            </HeaderNavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HeaderNavLink
                                // icon={<IconListDetails />}
                                href={route('products')}
                                targetRouteNames={['products']}
                                dropdown
                            >
                                Products
                            </HeaderNavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HeaderNavLink
                                // icon={<IconPackage />}
                                href={route('orders')}
                                targetRouteNames={['orders']}
                                dropdown
                            >
                                Orders
                            </HeaderNavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <HeaderNavLink
                                icon={<IconShoppingCart />}
                                href={route('cart')}
                                targetRouteNames={['cart']}
                                dropdown
                            >
                                Cart
                            </HeaderNavLink>
                        </DropdownMenuItem>
                        {authenticated ? (
                            <>
                                <DropdownMenuItem>
                                    <HeaderNavLink
                                        icon={<IconUserCircle />}
                                        href={route('profile.edit')}
                                        targetRouteNames={['profile.edit']}
                                        dropdown
                                    >
                                        View Profile
                                    </HeaderNavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <HeaderNavLink
                                        icon={<IconLogout />}
                                        href="#"
                                        dropdown
                                    >
                                        Logout
                                    </HeaderNavLink>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem>
                                <HeaderNavLink
                                    icon={<IconLogin2 />}
                                    href={route('login')}
                                    targetRouteNames={['login']}
                                    dropdown
                                >
                                    Login
                                </HeaderNavLink>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Desktop View */}
                <ul className="hidden items-center gap-x-1 sm:flex">
                    <li className="contents">
                        <HeaderNavLink
                            // icon={<IconHome />}
                            href={
                                authenticated ? route('home') : route('index')
                            }
                            targetRouteNames={['index', 'home']}
                        >
                            Home
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            // icon={<IconListDetails />}
                            href={route('products')}
                            targetRouteNames={['products']}
                        >
                            Products
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            // icon={<IconPackage />}
                            href={route('orders')}
                            targetRouteNames={['orders']}
                        >
                            Orders
                        </HeaderNavLink>
                    </li>
                    <li className="mx-1 h-10">
                        <Line variant={'v'} />
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconShoppingCart />}
                            href={route('cart')}
                            targetRouteNames={['cart']}
                        >
                            {/* Cart */}
                            {cartCount !== 0 && (
                                <div className="absolute right-[0.3rem] top-2 flex aspect-square size-[1.1rem] items-center justify-center rounded-full bg-primary pr-[1px] pt-[1px] text-[0.6rem] text-secondary">
                                    {cartCount}
                                </div>
                            )}
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        {authenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="rounded-lg p-3">
                                    <IconUserCircle className="text-primary duration-300 hover:text-primary/70" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="space-y-1">
                                    <DropdownMenuItem>
                                        <HeaderNavLink
                                            icon={<IconUserCircle />}
                                            href={route('profile.edit')}
                                            targetRouteNames={['profile.edit']}
                                            dropdown
                                        >
                                            View Profile
                                        </HeaderNavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HeaderNavLink
                                            icon={<IconLogout />}
                                            href={route('logout')}
                                            dropdown
                                            method="post"
                                            as="button"
                                        >
                                            Logout
                                        </HeaderNavLink>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <HeaderNavLink
                                icon={<IconLogin2 />}
                                href={route('login')}
                                targetRouteNames={['login']}
                            >
                                Login
                            </HeaderNavLink>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}
