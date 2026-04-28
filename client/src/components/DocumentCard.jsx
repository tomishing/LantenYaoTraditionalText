import { useNavigate } from "react-router";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getImageUrl } from "../api/documentApi";

const PLACEHOLDER = "https://placehold.co/800x400?text=No+Image";

function DocumentCard({ doc }) {
    const navigate = useNavigate();
    const imageUrl = getImageUrl(doc.path, 500);

    return (
        <div className="col-sm-6 col-lg-4 d-flex">
            <div className="card doc-card w-100">
                <img
                    src={imageUrl || PLACEHOLDER}
                    alt={doc.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px", cursor: "pointer" }}
                    onClick={() => navigate(`/detail/${doc._id}`)}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PLACEHOLDER;
                    }}
                />
                <div className="card-body d-flex flex-column">
                    {/* Title */}
                    <h5 className="card-title">{doc.title}</h5>

                    {/* District */}
                    {doc.district && (
                        <p className="card-text text-muted small mb-1">
                            <span className="fw-semibold">
                                <FaMapMarkerAlt />
                            </span>{" "}
                            {doc.district}
                        </p>
                    )}

                    {/* Date taken */}
                    {doc.date_of_taken && (
                        <p className="card-text text-muted small mb-1">
                            <span className="fw-semibold">
                                <BsCalendarDateFill />
                            </span>{" "}
                            {doc.date_of_taken}
                        </p>
                    )}

                    {/* Notes */}
                    {doc.notes && (
                        <p className="notes-text mt-1 mb-0 flex-grow-1">
                            {doc.notes.length > 90
                                ? `${doc.notes.slice(0, 90)}…`
                                : doc.notes}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="card-footer d-flex gap-2">
                    <button
                        className="btn btn-sm btn-outline-primary flex-fill"
                        onClick={() => navigate(`/detail/${doc._id}`)}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DocumentCard;
