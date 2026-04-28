import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const EMPTY = {
    no: "",
    dir: "",
    path: "",
    row_num: 1,
    title: "",
    possible_gregorian_date: "",
    possible_gregorian_year: "",
    date_of_taken: "",
    district: "",
    notes: "",
};

function DocumentForm({ initialData = null, onSubmit, isLoading = false }) {
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});

    /* Populate form when editing */
    useEffect(() => {
        if (initialData) {
            setForm({
                no: initialData.no ?? "",
                dir: initialData.dir ?? "",
                path: initialData.path ?? "",
                row_num: initialData.row_num ?? 1,
                title: initialData.title ?? "",
                possible_gregorian_date:
                    initialData.possible_gregorian_date ?? "",
                possible_gregorian_year:
                    initialData.possible_gregorian_year ?? "",
                date_of_taken: initialData.date_of_taken ?? "",
                district: initialData.district ?? "",
                notes: initialData.notes ?? "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.no) newErrors.no = "Number is required.";
        if (!form.dir.trim()) newErrors.dir = "Directory is required.";
        if (!form.path.trim()) newErrors.path = "Path is required.";
        if (!form.title.trim()) newErrors.title = "Title is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        onSubmit({
            ...form,
            no: Number(form.no),
            row_num: Number(form.row_num) || 1,
            possible_gregorian_date: form.possible_gregorian_date || null,
            possible_gregorian_year: form.possible_gregorian_year
                ? Number(form.possible_gregorian_year)
                : null,
            date_of_taken: form.date_of_taken || null,
            notes: form.notes || null,
        });
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* Row 1 – no / dir / row_num */}
            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label fw-semibold">
                        Number <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="no"
                        className={`form-control ${errors.no ? "is-invalid" : ""}`}
                        value={form.no}
                        onChange={handleChange}
                        placeholder="e.g. 1"
                    />
                    {errors.no && (
                        <div className="invalid-feedback">{errors.no}</div>
                    )}
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">
                        Directory <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="dir"
                        className={`form-control ${errors.dir ? "is-invalid" : ""}`}
                        value={form.dir}
                        onChange={handleChange}
                        placeholder="e.g. 0001"
                    />
                    {errors.dir && (
                        <div className="invalid-feedback">{errors.dir}</div>
                    )}
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">Row Number</label>
                    <input
                        type="number"
                        name="row_num"
                        className="form-control"
                        value={form.row_num}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
            </div>

            {/* Row 2 – path */}
            <div className="mt-3">
                <label className="form-label fw-semibold">
                    Path <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    name="path"
                    className={`form-control ${errors.path ? "is-invalid" : ""}`}
                    value={form.path}
                    onChange={handleChange}
                    placeholder="e.g. 0001/Img0009.tiff"
                />
                {errors.path && (
                    <div className="invalid-feedback">{errors.path}</div>
                )}
            </div>

            {/* Row 3 – title */}
            <div className="mt-3">
                <label className="form-label fw-semibold">
                    Title <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter document title"
                />
                {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                )}
            </div>

            {/* Row 4 – dates / year */}
            <div className="row g-3 mt-0">
                <div className="col-md-4">
                    <label className="form-label fw-semibold">
                        Possible Gregorian Date
                    </label>
                    <input
                        type="date"
                        name="possible_gregorian_date"
                        className="form-control"
                        value={form.possible_gregorian_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">
                        Possible Gregorian Year
                    </label>
                    <input
                        type="number"
                        name="possible_gregorian_year"
                        className="form-control"
                        value={form.possible_gregorian_year}
                        onChange={handleChange}
                        min="1"
                        max="2100"
                        placeholder="e.g. 1859"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">
                        Date of Taken
                    </label>
                    <input
                        type="date"
                        name="date_of_taken"
                        className="form-control"
                        value={form.date_of_taken}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Row 5 – district */}
            <div className="mt-3">
                <label className="form-label fw-semibold">District</label>
                <input
                    type="text"
                    name="district"
                    className="form-control"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="e.g. Namo"
                />
            </div>

            {/* Row 6 – notes */}
            <div className="mt-3">
                <label className="form-label fw-semibold">Notes</label>
                <textarea
                    name="notes"
                    className="form-control"
                    rows={4}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional notes or remarks"
                />
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 mt-4">
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
                <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate(-1)}
                    disabled={isLoading}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default DocumentForm;
