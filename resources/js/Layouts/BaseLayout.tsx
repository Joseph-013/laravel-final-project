import { Toaster } from '@/Components/ui/sonner';
import { Button, Input } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

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
            <div className="-z-10 flex flex-col items-center">
                <div
                    className={`z-1 min-h-screen w-full max-w-[1500px] p-3 py-20`}
                >
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
function Footer() {
    return (
        <footer className="flex min-h-56 w-full flex-col items-center border-t-2 border-slate-400">
            <div className="-mt-16 bg-background px-2">
                <img src="/ohsheet-2.png" className="size-32" />
            </div>
            <div className="mx-auto max-w-[1200px] px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <img
                            src="/ohsheet-2.png"
                            alt="OhSheet Logo"
                            className="h-12 w-auto"
                        />
                        <p className="text-sm text-slate-600">
                            Simplifying your spreadsheet experience with
                            powerful features and intuitive design.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/features"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/support"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookies"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Newsletter
                        </h3>
                        <p className="mb-2 text-sm text-slate-600">
                            Stay updated with our latest features and news.
                        </p>
                        <form className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full"
                            />
                            <Button type="submit" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-slate-200 pt-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="text-sm text-slate-600">
                            &copy; 2024 OhSheet. All rights reserved.
                        </p>
                        <div className="mt-4 flex space-x-4 md:mt-0">
                            <Link
                                href="https://facebook.com"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                <Facebook size={20} />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                <Twitter size={20} />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
