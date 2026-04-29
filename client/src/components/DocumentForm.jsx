import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Row({ label, value }) {
    return (
        <tr>
            <th className="detail-table-th text-muted" style={{ width: "35%", backgroundColor: "#f8f9fa", fontWeight: 600 }}>{label}</th>
            <td className="text-muted" style={{ backgroundColor: "#fcfcfc" }}>{value ?? <span>—</span>}</td>
        </tr>
    );
}

function DocumentForm({ initialData = null, onSubmit, isLoading = false }) {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        title: "",
        keywords: "",
        notes: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title ?? "",
                keywords: initialData.keywords ?? "",
                notes: initialData.notes ?? "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    if (!initialData) return null;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="table-responsive">
                <table className="table table-bordered detail-table mb-0">
                    <tbody>
                        <Row label="ID" value={initialData.id} />
                        <Row label="Category" value={initialData.category} />
                        <tr>
                            <th className="detail-table-th" style={{ width: "35%", backgroundColor: "#f8f9fa", fontWeight: 600 }}>Title</th>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control border-primary"
                                    style={{ backgroundColor: "#eef2ff" }}
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <Row label="Transcribed Date (Original)" value={initialData.transcribed_date_Original} />
                        <Row label="Possible Gregorian Date" value={initialData.possible_Gregorian_date} />
                        <Row label="Possible Gregorian Year" value={initialData.possible_Gregorian_year} />
                        <Row label="Date of Taken" value={initialData.date_of_taken ? initialData.date_of_taken.substring(0, 10) : null} />
                        <Row label="Country" value={initialData.country} />
                        <Row label="Province" value={initialData.province} />
                        <Row label="District" value={initialData.district} />
                        <Row label="Village" value={initialData.village} />
                        <Row label="Owner" value={initialData.owner} />
                        <Row label="Length (mm)" value={initialData.length_mm} />
                        <Row label="Wide (mm)" value={initialData.wide_mm} />
                        <tr>
                            <th className="detail-table-th" style={{ width: "35%", backgroundColor: "#f8f9fa", fontWeight: 600 }}>Keywords</th>
                            <td>
                                <input
                                    type="text"
                                    name="keywords"
                                    className="form-control border-primary"
                                    style={{ backgroundColor: "#eef2ff" }}
                                    value={form.keywords}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="detail-table-th" style={{ width: "35%", backgroundColor: "#f8f9fa", fontWeight: 600 }}>Notes</th>
                            <td>
                                <textarea
                                    name="notes"
                                    className="form-control border-primary"
                                    style={{ backgroundColor: "#eef2ff" }}
                                    rows={4}
                                    value={form.notes}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <Row
                            label="Created At"
                            value={
                                initialData.created_at
                                    ? new Date(initialData.created_at).toLocaleString("en-US")
                                    : null
                            }
                        />
                        <Row
                            label="Updated At"
                            value={
                                initialData.updated_at
                                    ? new Date(initialData.updated_at).toLocaleString("en-US")
                                    : null
                            }
                        />
                    </tbody>
                </table>
            </div>

            <div className="d-flex gap-2 mt-4 justify-content-end">
                <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate(-1)}
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Saving...
                        </>
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
        </form>
    );
}

export default DocumentForm;
