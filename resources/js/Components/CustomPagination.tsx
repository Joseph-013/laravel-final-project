import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

function CustomPagination({ page }) {
    // function scrollToElement() {
    //     const element = document.getElementById('scroll-target');
    //     if (element) {
    //         element.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'center',
    //             inline: 'center',
    //         });
    //     }
    // }
    function scrollToElement() {
        const element = document.getElementById('scroll-target');
        const parentContainer = document.getElementById(
            'pagination-pagelink-container',
        );

        if (element && parentContainer) {
            const elementRect = element.getBoundingClientRect();
            const containerRect = parentContainer.getBoundingClientRect();

            // Calculate the offset to center the element within the container
            const offsetTop =
                elementRect.top -
                containerRect.top +
                parentContainer.scrollTop -
                (containerRect.height / 2 - elementRect.height / 2);
            const offsetLeft =
                elementRect.left -
                containerRect.left +
                parentContainer.scrollLeft -
                (containerRect.width / 2 - elementRect.width / 2);

            // Smoothly scroll the parent container to center the element
            parentContainer.scrollTo({
                top: offsetTop,
                left: offsetLeft,
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {
        scrollToElement();
        window.addEventListener('resize', scrollToElement);
        return () => {
            window.removeEventListener('resize', scrollToElement);
        };
    }, [page]);

    function handlePaging(href = false) {
        if (href) {
            // Get current URL search params
            const currentParams = new URLSearchParams(window.location.search);
            // Get new URL search params
            const newUrl = new URL(href, window.location.origin);
            const newParams = newUrl.searchParams;

            // Preserve existing search and department parameters
            const search = currentParams.get('search') || '';
            const department = currentParams.get('department') || 'All';

            // Navigate with preserved parameters
            router.get(
                href,
                {
                    search: search,
                    department: department,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }
    }

    return (
        <div className="flex w-fit max-w-full justify-between overflow-clip rounded-full bg-background px-1 py-1">
            <Pagination className="contents">
                <PaginationContent className="contents">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePaging(page.links[0].url)}
                            className={`h-full cursor-pointer rounded-l-full hover:bg-primary hover:text-secondary ${
                                page.current_page === 1 && 'cursor-not-allowed'
                            }`}
                        />
                    </PaginationItem>

                    <div
                        className="flex flex-1 flex-row overflow-x-auto"
                        id="pagination-pagelink-container"
                    >
                        {page.links.map((link, index) => {
                            if (
                                index !== 0 &&
                                index !== page.links.length - 1
                            ) {
                                if (link.label === '...') {
                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                } else {
                                    return (
                                        <PaginationItem
                                            key={index}
                                            id={
                                                link.active !== false
                                                    ? 'scroll-target'
                                                    : ''
                                            }
                                        >
                                            <PaginationLink
                                                className="cursor-pointer hover:bg-primary hover:text-secondary"
                                                onClick={() =>
                                                    handlePaging(link.url)
                                                }
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                handlePaging(
                                    page.links[page.links.length - 1].url,
                                )
                            }
                            className={`h-full cursor-pointer rounded-r-full hover:bg-primary hover:text-secondary ${
                                page.current_page === page.last_page &&
                                'cursor-not-allowed'
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default CustomPagination;
