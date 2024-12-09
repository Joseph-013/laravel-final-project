import Line from '@/Components/Line';
import { Badge } from '@/Components/ui/badge';
import { IconLogout, IconPackage } from '@tabler/icons-react';
import BaseLayout from './BaseLayout';
import { HeaderNavLink } from './LayoutComponents';

interface AdminLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
    return (
        <BaseLayout headerContent={<HeaderContent />} className={className}>
            {children}
        </BaseLayout>
    );
}

export function HeaderContent() {
    return (
        <div className="flex h-full w-full items-center justify-between pl-4">
            <Badge variant="destructive">admin</Badge>
            <div className="flex h-full items-center">
                <ul className="hidden h-full items-center gap-x-1 sm:flex">
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconPackage />}
                            href={route('admin.index')}
                            targetRouteNames={['admin.index']}
                        >
                            Products
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink icon={<IconPackage />} 
                            href={route('admin.users')}
                            targetRouteNames={['admin.users']}>
                            Users
                        </HeaderNavLink>
                    </li>
                    <li className="contents">
                        <HeaderNavLink icon={<IconPackage />} href="#">
                            Orders
                        </HeaderNavLink>
                    </li>
                    <li className="h-full py-3">
                        <Line variant={'v'} />
                    </li>
                    <li className="contents">
                        <HeaderNavLink
                            icon={<IconLogout />}
                            href={route('logout')}
                            method="post"
                            as="button"
                        >
                            Logout
                        </HeaderNavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
