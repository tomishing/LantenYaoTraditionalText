import { getImageUrl } from "../api/documentApi";
import DocumentMap from "./DocumentMap";
import { FaMapMarkerAlt } from "react-icons/fa";
const PLACEHOLDER = "https://placehold.co/800x400?text=No+Image";

function Row({ label, value }) {
    return (
        <tr>
            <th className="detail-table-th">{label}</th>
            <td>{value ?? <span className="text-muted">—</span>}</td>
        </tr>
    );
}

function DocumentDetail({ document: doc }) {
    if (!doc) return null;

    const imageUrl = getImageUrl(doc.path, 500);

    return (
        <div>
            <div className="text-center mb-3 mt-3">
                <img
                    src={imageUrl || PLACEHOLDER}
                    alt={doc.title}
                    className="detail-img"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PLACEHOLDER;
                    }}
                />
            </div>

            {/* Detail table */}
            <div className="table-responsive">
                <table className="table table-bordered detail-table mb-0">
                    <tbody>
                        <Row label="Number" value={doc.no} />
                        <Row label="Directory" value={doc.dir} />
                        <Row label="Path" value={doc.path} />
                        <Row label="Row Number" value={doc.row_num} />
                        <Row label="Title" value={doc.title} />
                        <Row
                            label="Possible Gregorian Date"
                            value={doc.possible_gregorian_date}
                        />
                        <Row
                            label="Possible Gregorian Year"
                            value={doc.possible_gregorian_year}
                        />
                        <Row label="Date of Taken" value={doc.date_of_taken} />
                        <Row label="District" value={doc.district} />
                        <Row label="Notes" value={doc.notes} />
                        <Row
                            label="Created At"
                            value={
                                doc.createdAt
                                    ? new Date(doc.createdAt).toLocaleString(
                                          "en-US",
                                      )
                                    : null
                            }
                        />
                        <Row
                            label="Updated At"
                            value={
                                doc.updatedAt
                                    ? new Date(doc.updatedAt).toLocaleString(
                                          "en-US",
                                      )
                                    : null
                            }
                        />
                    </tbody>
                </table>
            </div>

            {/* Map */}
            {doc.district && (
                <div className="mb-4 mt-4">
                    <h5 className="text-center mb-2">
                        <FaMapMarkerAlt /> Location: {doc.district}, Laos
                    </h5>
                    <DocumentMap district={doc.district} />
                </div>
            )}
        </div>
    );
}

export default DocumentDetail;
