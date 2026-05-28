import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";
    const hasPdf = searchParams.get("hasPdf") === "true";
    // The delete confirmation
    const [modal, setModal] = useState({ show: false, id: null, title: "" });

    // ** Fetching data from backend **
    // data: documents, total, currentPage, totalPages from backend
    // isLoading: true while fetching
    // isError: true if the fetch failed
    // error: The error detail
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["documents", page, search, hasPdf],
        queryFn: () => documentApi.getAll({ page, limit: LIMIT, search, hasPdf }),
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
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
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

            <SearchBar onSearch={handleSearch} initialSearch={search} />
            <div className="form-check mb-3">
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
                    <DocumentList
                        documents={data?.documents ?? []}
                        onDelete={handleDeleteRequest}
                    />
                    <Pagination
                        currentPage={data?.currentPage ?? 1}
                        totalPages={data?.totalPages ?? 1}
                        onPageChange={handlePageChange}
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
