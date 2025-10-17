import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null; // si solo hay una página, no vale mostrar paginador

  const visiblePages = 5;
  const half = Math.floor(visiblePages / 2);

  // Cálculo de rango visible
  let start = Math.max(0, currentPage - half);
  let end = Math.min(totalPages - 1, start + visiblePages - 1);

  if (end - start + 1 < visiblePages) {
    start = Math.max(0, end - visiblePages + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* Anterior */}
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 0) onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 0}
            className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Elipsis inicial */}
        {start > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Páginas */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(p);
              }}
            >
              {p + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Elipsis final */}
        {end < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Siguiente */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage + 1 < totalPages) onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage + 1 >= totalPages}
            className={
              currentPage + 1 >= totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};