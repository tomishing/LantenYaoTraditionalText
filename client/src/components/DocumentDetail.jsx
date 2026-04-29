import { getImageUrl, getPdfUrl } from "../api/documentApi";
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

    const imageUrl = getImageUrl(doc.path_img);
    const pdfUrl = getPdfUrl(doc.path_pdf);

    return (
        <div>
            <div className="detail-img-wrapper mb-3 mt-3">
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
                        <Row label="ID" value={doc.id} />
                        <Row label="Category" value={doc.category} />
                        <Row label="Title" value={doc.title} />
                        <Row label="Transcribed Date (Original)" value={doc.transcribed_date_Original} />
                        <Row
                            label="Possible Gregorian Date"
                            value={doc.possible_Gregorian_date}
                        />
                        <Row
                            label="Possible Gregorian Year"
                            value={doc.possible_Gregorian_year}
                        />
                        <Row label="Date of Taken" value={doc.date_of_taken} />
                        <Row label="Country" value={doc.country} />
                        <Row label="Province" value={doc.province} />
                        <Row label="District" value={doc.district} />
                        <Row label="Village" value={doc.village} />
                        <Row label="Owner" value={doc.owner} />
                        <Row label="Length (mm)" value={doc.length_mm} />
                        <Row label="Wide (mm)" value={doc.wide_mm} />
                        <Row label="Keywords" value={doc.keywords} />
                        <Row label="Notes" value={doc.notes} />
                        <Row
                            label="Created At"
                            value={
                                doc.created_at
                                    ? new Date(doc.created_at).toLocaleString(
                                          "en-US",
                                      )
                                    : null
                            }
                        />
                        <Row
                            label="Updated At"
                            value={
                                doc.updated_at
                                    ? new Date(doc.updated_at).toLocaleString(
                                          "en-US",
                                      )
                                    : null
                            }
                        />
                        {doc.path_pdf && (
                            <tr>
                                <th className="detail-table-th">Original PDF</th>
                                <td>
                                    <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                                        View PDF
                                    </a>
                                </td>
                            </tr>
                        )}
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
