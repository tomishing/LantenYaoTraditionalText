import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import documentApi from "../api/documentApi";
import DocumentForm from "../components/DocumentForm";
import { CiEdit } from "react-icons/ci";
import { MdError } from "react-icons/md";

function EditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const qc = useQueryClient();

    const {
        data: doc,
        isLoading: fetching,
        isError,
        error,
    } = useQuery({
        queryKey: ["document", id],
        queryFn: () => documentApi.getById(id),
        enabled: !!id,
    });

    const { mutate, isPending: saving } = useMutation({
        mutationFn: (payload) => documentApi.update(id, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["documents"] });
            qc.invalidateQueries({ queryKey: ["document", id] });
            navigate("/");
        },
        onError: (err) => {
            alert(
                `Update error: ${err.response?.data?.message ?? err.message}`,
            );
        },
    });

    if (fetching) {
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
            <div className="alert alert-danger">
                <MdError /> Error: {error.message}
            </div>
        );
    }

    return (
        <>
            <h2 className="page-heading mb-4">
                <CiEdit /> Edit Document
            </h2>
            <div className="card form-card p-4">
                <DocumentForm
                    initialData={doc}
                    onSubmit={(data) => mutate(data)}
                    isLoading={saving}
                />
            </div>
        </>
    );
}

export default EditPage;
