import HeaderSearch from '@/Components/HeaderSearch';
import Line from '@/Components/Line';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Head } from '@inertiajs/react';
import {
    IconHome,
    IconListDetails,
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

export default function GuestLayout({ children, className }: GuestLayoutProps) {
    return (
        <BaseLayout headerContent={<HeaderContent />} className={className}>
            {children}
        </BaseLayout>
    );
}

export function HeaderContent() {
    return (
        <div className="flex w-full items-center justify-end gap-x-5">
            <Head title="Welcome" />
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
                <Popover>
                    <PopoverTrigger className="block sm:hidden">
                        Open
                    </PopoverTrigger>
                    <PopoverContent>
                        Place content for the popover here.
                    </PopoverContent>
                </Popover>

                <ul className="hidden items-center gap-x-1 sm:flex">
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconHome />}
                            href="#"
                            targetRouteNames={['welcome']}
                        >
                            Home
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconListDetails />}
                            href="#"
                            targetRouteNames={['welcome']}
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
                        <HeaderNavLink href="#" targetRouteNames={['welcome']}>
                            <IconShoppingCart />
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink href="#" targetRouteNames={['welcome']}>
                            <IconUserCircle />
                        </HeaderNavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
