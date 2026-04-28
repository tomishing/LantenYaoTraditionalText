function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const MAX = 5;
    let start = Math.max(1, currentPage - Math.floor(MAX / 2));
    let end = Math.min(totalPages, start + MAX - 1);
    if (end - start + 1 < MAX) start = Math.max(1, end - MAX + 1);

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center flex-wrap">
                <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(1)}
                    >
                        «
                    </button>
                </li>
                <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        ‹
                    </button>
                </li>

                {start > 1 && (
                    <li className="page-item disabled">
                        <span className="page-link">…</span>
                    </li>
                )}

                {pages.map((p) => (
                    <li
                        key={p}
                        className={`page-item ${p === currentPage ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    </li>
                ))}

                {end < totalPages && (
                    <li className="page-item disabled">
                        <span className="page-link">…</span>
                    </li>
                )}

                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        ›
                    </button>
                </li>
                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(totalPages)}
                    >
                        »
                    </button>
                </li>
            </ul>

            <p className="text-center text-muted small">
                Page {currentPage} of {totalPages}
            </p>
        </nav>
    );
}

export default Pagination;
