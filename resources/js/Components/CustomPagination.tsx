import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import React from 'react';

// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
//     hasPreviousPage: boolean;
//     hasNextPage: boolean;
//     previousPageUrl: string | null;
//     nextPageUrl: string | null;
// }

// const CustomPagination: React.FC<PaginationProps> = ({
//     currentPage,
//     totalPages,
//     onPageChange,
//     hasPreviousPage,
//     hasNextPage,
//     previousPageUrl,
//     nextPageUrl,
// }) => {
//     const handlePageClick = (pageUrl: string | null) => {
//         if (pageUrl) {
//             onPageChange(pageUrl);
//         }
//     };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Page */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => previousPageUrl(page.links[0].url)}
                        className={`h-full rounded-l-full ${
                            page.current_page === 1 &&
                            'cursor-not-allowed hover:bg-transparent'
                        }`}
                    />
                </PaginationItem>

                {/* Current Page and Total */}
                <PaginationItem>
                    <PaginationLink href="#" disabled>
                        Page {currentPage} of {totalPages}
                    </PaginationLink>
                </PaginationItem>

                {/* Ellipsis (if necessary) */}
                {totalPages > 5 && <PaginationEllipsis />}

                {/* Next Page */}
                <PaginationItem>
                    <PaginationNext
                        href={nextPageUrl || '#'}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(nextPageUrl);
                        }}
                        disabled={!hasNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;
