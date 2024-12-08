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
    IconHome,
    IconListDetails,
    IconMenu2,
    IconPackage,
    IconShoppingCart,
    IconUserCircle,
} from '@tabler/icons-react';

import BaseLayout from './BaseLayout';
import { HeaderNavLink } from './LayoutComponents';

interface GuestLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function GuestLayout({
    user,
    children,
    className,
}: GuestLayoutProps) {
    return (
        <BaseLayout headerContent={<HeaderContent />} className={className}>
            {children}
        </BaseLayout>
    );
}

export function HeaderContent() {
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
                <DropdownMenu>
                    <DropdownMenuTrigger className="block rounded-lg p-2 hover:bg-white/50 sm:hidden">
                        <IconMenu2 />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                        <DropdownMenuItem>
                            {' '}
                            <HeaderNavLink
                                icon={<IconHome />}
                                href={route('index')}
                                targetRouteNames={['index']}
                                dropdown
                            >
                                Home
                            </HeaderNavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HeaderNavLink
                                icon={<IconListDetails />}
                                href={route('products')}
                                targetRouteNames={['products', 'product.form']}
                                dropdown
                            >
                                Products
                            </HeaderNavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HeaderNavLink
                                icon={<IconPackage />}
                                href="#"
                                targetRouteNames={['welcome']}
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
                        <DropdownMenuItem>
                            <HeaderNavLink
                                icon={<IconUserCircle />}
                                href="#"
                                targetRouteNames={['welcome']}
                                dropdown
                            >
                                Profile
                            </HeaderNavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <ul className="hidden items-center gap-x-1 sm:flex">
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconHome />}
                            href={route('index')}
                            targetRouteNames={['index']}
                        >
                            Home
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconListDetails />}
                            href={route('products')}
                            targetRouteNames={['products']}
                        >
                            Products
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconPackage />}
                            href="#"
                            targetRouteNames={['welcome']}
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
                            Cart
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconUserCircle />}
                            href="#"
                            targetRouteNames={['welcome']}
                        >
                            Profile
                        </HeaderNavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
