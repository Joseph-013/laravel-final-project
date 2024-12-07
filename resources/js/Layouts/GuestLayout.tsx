import HeaderSearch from '@/Components/HeaderSearch';
import { Head } from '@inertiajs/react';
import BaseLayout from './BaseLayout';
import { HeaderNavLink } from './LayoutComponents';

interface GuestLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function GuestLayout({ children, className }: GuestLayoutProps) {
    return (
        // <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>
        <BaseLayout headerContent={<HeaderContent />} className={className}>
            {children}
        </BaseLayout>
    );
}

function HeaderContent() {
    return (
        <div className="flex items-center gap-x-5">
            <Head title="Welcome" />
            <div>
                <HeaderSearch
                    className="w-96"
                    inputProps={{
                        type: 'text',
                        placeholder: 'Search',
                    }}
                />
            </div>
            <nav>
                <ul className="flex gap-x-1">
                    <li>
                        <HeaderNavLink href="#" targetRouteNames={['index']}>
                            Home
                        </HeaderNavLink>
                    </li>
                    <li>
                        <HeaderNavLink href="#" targetRouteNames={['index']}>
                            Products
                        </HeaderNavLink>
                    </li>
                    <li>
                        <HeaderNavLink href="#" targetRouteNames={['index']}>
                            Orders
                        </HeaderNavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
