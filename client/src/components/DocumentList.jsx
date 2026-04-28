import DocumentCard from "./DocumentCard";

function DocumentList({ documents = [], onDelete }) {
    if (documents.length === 0) {
        return (
            <div className="alert alert-info text-center mt-3">
                No documents found.
            </div>
        );
    }

    return (
        <div className="row g-4">
            {documents.map((doc) => (
                <DocumentCard key={doc._id} doc={doc} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default DocumentList;
