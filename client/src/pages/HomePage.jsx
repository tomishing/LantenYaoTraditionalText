import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import documentApi from "../api/documentApi";
import DocumentList from "../components/DocumentList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";

const LIMIT = 9;

function HomePage() {
    // access to query client in main.jsx
    const qc = useQueryClient();

    // Page viewing
    const [page, setPage] = useState(1);
    // Current search term
    const [search, setSearch] = useState("");
    // The delete confirmation
    const [modal, setModal] = useState({ show: false, id: null, title: "" });

    // ** Fetching data from backend **
    // data: documents, total, currentPage, totalPages from backend
    // isLoading: true while fetching
    // isError: true if the fetch failed
    // error: The error detail
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["documents", page, search], // cache for use data
        // Display all data and searching: the function calls backend
        queryFn: () => documentApi.getAll({ page, limit: LIMIT, search }),
        // UX enhancement
        keepPreviousData: true,
    });
    // ** deleting **
    // useMutation(): Change data (create, update, delete)
    // deleteDoc: return the mutate function to deleteDoc
    // isPending: deleting: True while delete request is in progress
    const { mutate: deleteDoc, isPending: deleting } = useMutation({
        // call backend's delete
        mutationFn: documentApi.remove,
        onSuccess: () => {
            // Successful delete -> automatically refetch documents
            qc.invalidateQueries({ queryKey: ["documents"] });
            setModal({ show: false, id: null, title: "" });
        },
        onError: (err) => {
            alert(
                `Delete error: ${err.response?.data?.message ?? err.message}`,
            );
        },
    });

    // ** Event Handlers
    const handleSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const handleDeleteRequest = (id, title) =>
        setModal({ show: true, id, title });

    const handleDeleteConfirm = () => deleteDoc(modal.id);

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

            <SearchBar onSearch={handleSearch} />
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
                    <DocumentList
                        documents={data?.documents ?? []}
                        onDelete={handleDeleteRequest}
                    />
                    <Pagination
                        currentPage={data?.currentPage ?? 1}
                        totalPages={data?.totalPages ?? 1}
                        onPageChange={setPage}
                    />
                </>
            )}

            {/* modal is visible or not */}
            <ConfirmModal
                show={modal.show}
                title="Confirm Deletion"
                message={
                    <>
                        Are you sure you want to delete{" "}
                        <strong>"{modal.title}"</strong>?<br />
                        <span className="text-danger small">
                            This action cannot be undone.
                        </span>
                    </>
                }
                onConfirm={handleDeleteConfirm}
                onCancel={() => setModal({ show: false, id: null, title: "" })}
                isLoading={deleting}
            />
        </>
    );
}

export default HomePage;
