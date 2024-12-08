import { Toaster } from '@/Components/ui/sonner';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface BaseLayoutProps {
    children: React.ReactNode;
    headerContent?: React.ReactNode;
    className?: string;
}

/**
 * A base layout component that wraps the page's main content, including a header and footer.
 * This layout is designed to ensure consistent page structure across the app.
 *
 * The `headerContent` is rendered as an optional slot in the header, while the `children` prop
 * represents the main content of the page that will be displayed below the header.
 *
 * @param children - The main content of the page. This is the body content of the layout.
 * @param headerContent - Optional content to display in the header, typically used for additional
 * navigation or information that appears in the header section.
 * @param className - Additional styling.
 *
 * To know more about sonner, visit the [documentation](https://sonner.emilkowal.ski/).
 */
export default function BaseLayout({
    children,
    headerContent,
    className,
}: BaseLayoutProps) {
    return (
        <>
            <div className="flex flex-col items-center">
                <div className={`min-h-screen w-full max-w-[1500px] p-3 py-20`}>
                    <main className={`space-y-3 pt-3 ${className}`}>
                        {children}
                    </main>
                </div>
                <Footer />
                <Header>{headerContent}</Header>
            </div>
            <Toaster />
        </>
    );
}

/**
 * A Header component that displays a logo on the left and optional children content on the right side.
 * If no children is provided, default content will be displayed instead.
 *
 * @param children - Optional content to render on the right side of the header.
 */
function Header({ children }: PropsWithChildren) {
    return (
        <header
            className={`fixed inset-x-0 top-0 flex h-20 w-full justify-center bg-[#b8cce5]`}
        >
            <div
                className={`flex w-full max-w-[1200px] items-center justify-between px-3`}
            >
                <Link href="/">
                    <img
                        src="/ohsheet-3.png"
                        className="aspect-auto h-5 w-auto min-w-fit"
                    />
                </Link>
                {children ? children : <>default header content</>}
            </div>
        </header>
    );
}

/**
 * A Footer component that displays a logo and additional content that persists throughout the pages.
 * If no children content is provided, default footer content will be displayed instead.
 *
 * @param children - Optional content to render in the footer.
 */
function Footer({ children }: PropsWithChildren) {
    return (
        <footer className="flex min-h-56 w-full flex-col items-center border-t-2 border-slate-400">
            <div className="-mt-16 bg-background px-2">
                <img src="/ohsheet-2.png" className="size-32" />
            </div>
            <div className={`w-full max-w-[1200px] p-3`}>
                {children ? (
                    children
                ) : (
                    <>
                        footer <br />
                        footer <br />
                        footer <br />
                    </>
                )}
            </div>
        </footer>
    );
}
