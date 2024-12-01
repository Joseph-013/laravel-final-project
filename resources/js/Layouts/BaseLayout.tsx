import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface BaseLayoutProps {
    children: React.ReactNode;
    headerContent?: React.ReactNode;
}

export const layoutMaxWidth = '1200px';
const height = '16';
const headerHeight = `h-${height}`;
const headerTopPadding = `pt-${height}`;
const headerBottomPadding = `pb-${height}`;

/**
 * The app's base layout wrapping the main content with layout components.
 * @param children - Displays the page's main content.
 * @param headerContent - Optional children to render on the right side of the Header component.
 */
export default function BaseLayout({
    children,
    headerContent,
}: BaseLayoutProps) {
    return (
        <div className="flex flex-col items-center">
            <Header>{headerContent}</Header>
            <div
                className={`w-full max-w-[${layoutMaxWidth}] min-h-screen p-3 ${headerTopPadding} ${headerBottomPadding}`}
            >
                <main className="pt-3">{children}</main>
            </div>
            <Footer />
        </div>
    );
}

/**
 * Header Component displaying Logo and links positioned on opposite sides of the header. If no children is specified, displays default content.
 * @param children - Optional children to render on the right side of the Header component.
 */
function Header({ children }: PropsWithChildren) {
    return (
        <header
            className={`fixed inset-x-0 top-0 flex w-full justify-center bg-[#C8D6E8] ${headerHeight}`}
        >
            <div
                className={`max-w-[${layoutMaxWidth}] flex w-full items-center justify-between px-3`}
            >
                <Link href="/">
                    <img src="/ohsheet-3.png" alt="" className="h-5" />
                </Link>
                {children ? children : 'default header content'}
            </div>
        </header>
    );
}

/**
 * Footer Component displaying Logo and additional info persistent althroughout the pages.
 */
function Footer({ children }: PropsWithChildren) {
    return (
        <footer className="flex min-h-56 w-full flex-col items-center border-t-2 border-slate-400">
            <div className="bg-background -mt-16 px-2">
                <img src="/ohsheet-2.png" alt="" className="size-32" />
            </div>
            <div className={`max-w-[${layoutMaxWidth}] w-full p-3`}>
                footer <br />
                footer <br />
                footer <br />
            </div>
        </footer>
    );
}
