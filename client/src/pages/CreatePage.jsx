import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"; // FIXED
import documentApi from "../api/documentApi";
import DocumentForm from "../components/DocumentForm";
import { MdOutlineCreateNewFolder } from "react-icons/md";
function CreatePage() {
    const navigate = useNavigate();
    const qc = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: documentApi.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["documents"] });
            navigate("/");
        },
        onError: (err) => {
            alert(
                `Create error: ${err.response?.data?.message ?? err.message}`,
            );
        },
    });

    return (
        <>
            <h2 className="page-heading mb-4">
                <MdOutlineCreateNewFolder /> Create New Document
            </h2>
            <div className="card form-card p-4">
                <DocumentForm
                    onSubmit={(data) => mutate(data)}
                    isLoading={isPending} // FIXED
                />
            </div>
        </>
    );
}

export default CreatePage;
