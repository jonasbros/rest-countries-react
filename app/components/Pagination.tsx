import { useSearchParams } from "react-router";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function goToPage(page: number) {
    setSearchParams({ page: page.toString() });
  }

  function getPageNumbers() {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, current ±1
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }

  const pages = getPageNumbers();

  return (
    <div className="join">
      {pages.map((page, i) =>
        page === "..." ? (
          <button key={i} className="join-item btn btn-disabled">
            ...
          </button>
        ) : (
          <button
            key={i}
            className={`join-item btn ${
              currentPage === page ? "btn-primary btn-active" : ""
            }`}
            onClick={() => goToPage(page as number)}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
