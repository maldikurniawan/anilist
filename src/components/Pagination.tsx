import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPaginationNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage > 3) pages.push(1, "...");
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...", totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            {/* Previous Button */}
            <button
                className="px-3 py-2 bg-gray-900 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft />
            </button>

            {/* Page Numbers */}
            {getPaginationNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`px-3 py-2 rounded cursor-pointer ${page === currentPage ? "bg-blue-500" : "bg-gray-900"
                        } ${page === "..." ? "pointer-events-none opacity-50" : ""}`}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                className="px-3 py-2 bg-gray-900 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
