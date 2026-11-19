import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import documentApi from "../api/documentApi";
import DocumentList from "../components/DocumentList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const LIMIT = 9;

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";
    const hasPdf = searchParams.get("hasPdf") === "true";
    const province = searchParams.get("province") || "";
    const district = searchParams.get("district") || "";
    const village = searchParams.get("village") || "";
    const category = searchParams.get("category") || "";

    // ** Fetching data from backend **
    // data: documents, total, currentPage, totalPages from backend
    // isLoading: true while fetching
    // isError: true if the fetch failed
    // error: The error detail
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["documents", page, search, hasPdf, province, district, village, category],
        queryFn: () =>
            documentApi.getAll({
                page, limit: LIMIT, search, hasPdf, province, district, village, category,
            }),
        // UX enhancement
        keepPreviousData: true,
    });
    // ** Event Handlers
    // filters: { search, category, province, district, village }
    const handleSearch = (filters) => {
        const params = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleHasPdfToggle = (e) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.checked) {
            params.set("hasPdf", "true");
        } else {
            params.delete("hasPdf");
        }
        params.set("page", "1");
        setSearchParams(params);
    };

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage);
        setSearchParams(params);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h2 className="page-heading mb-0">Document List</h2>
                {data && (
                    <span className="text-muted small">
                        Total: <strong>{data.total}</strong> records
                    </span>
                )}
            </div>

            <SearchBar
                key={[search, category, province, district, village].join("|")}
                onSearch={handleSearch}
                initialValues={{ search, category, province, district, village }}
            />
            <div className="form-check mb-3 text-start">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="hasPdfFilter"
                    checked={hasPdf}
                    onChange={handleHasPdfToggle}
                />
                <label className="form-check-label" htmlFor="hasPdfFilter">
                    Show only documents with PDF
                </label>
            </div>
            {/* // Conditional Rendering */}
            {isLoading ? (
                <div className="spinner-wrap">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : isError ? (
                <div className="alert alert-danger">Error: {error.message}</div>
            ) : (
                <>
                    {/* ??: check if inside is null or undefined */}
                    <DocumentList documents={data?.documents ?? []} />
                    <Pagination
                        currentPage={data?.currentPage ?? 1}
                        totalPages={data?.totalPages ?? 1}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </>
    );
}

export default HomePage;
