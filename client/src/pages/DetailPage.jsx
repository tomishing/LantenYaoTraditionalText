import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import documentApi from "../api/documentApi";
import DocumentDetail from "../components/DocumentDetail";
import { MdError } from "react-icons/md";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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

        </>
    );
}

export default DetailPage;
