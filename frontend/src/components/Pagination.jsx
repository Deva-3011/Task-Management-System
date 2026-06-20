function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2)
  );

  return (
    <nav className="mt-4" aria-label="Task pages">
      <ul className="pagination justify-content-center flex-wrap gap-1">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)}>
            Prev
          </button>
        </li>
        {visiblePages.map((item) => (
          <li className={`page-item ${item === page ? 'active' : ''}`} key={item}>
            <button className="page-link" onClick={() => onPageChange(item)}>
              {item}
            </button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
