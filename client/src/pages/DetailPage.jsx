import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import documentApi from "../api/documentApi";
import DocumentDetail from "../components/DocumentDetail";
import ConfirmModal from "../components/ConfirmModal";
import { MdError } from "react-icons/md";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const qc = useQueryClient();
    const [showModal, setShowModal] = useState(false);

    const {
        data: doc,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["document", id],
        queryFn: () => documentApi.getById(id),
        enabled: !!id, // ✅ prevents undefined calls
    });

    const { mutate: deleteDoc, isPending: deleting } = useMutation({
        mutationFn: () => documentApi.remove(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["documents"] }); // ✅ FIXED
            navigate("/");
        },
        onError: (err) => {
            alert(
                `Delete error: ${err.response?.data?.message ?? err.message}`,
            );
        },
    });

    if (isLoading) {
        return (
            <div className="spinner-wrap">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="alert alert-danger"><MdError/> Error: {error.message}</div>
        );
    }

    return (
        <>
            {/* Page header */}
            <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
                <div>
                    <h2 className="page-heading mb-1"> Document Detail</h2>
                    <p className="text-muted small mb-0">{doc?.title}</p>
                </div>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/edit/${id}`)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowModal(true)}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                </div>
            </div>

            {/* Detail table */}
            <div className="card form-card p-0 overflow-hidden">
                <DocumentDetail document={doc} />
            </div>

            {/* Confirm delete modal */}
            <ConfirmModal
                show={showModal}
                title="Confirm Deletion"
                message={
                    <>
                        Are you sure you want to delete{" "}
                        <strong>"{doc?.title}"</strong>?<br />
                        <span className="text-danger small">
                            This action cannot be undone.
                        </span>
                    </>
                }
                onConfirm={() => deleteDoc()}
                onCancel={() => setShowModal(false)}
                isLoading={deleting} // ✅ now uses isPending
            />
        </>
    );
}

export default DetailPage;
