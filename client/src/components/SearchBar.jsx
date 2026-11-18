import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import documentApi from "../api/documentApi";

const EMPTY = { search: "", province: "", district: "", village: "" };

const LOCATION_FIELDS = [
    { key: "province", label: "Province" },
    { key: "district", label: "District" },
    { key: "village", label: "Village" },
];

// Same matching as the server: partial, case-insensitive
const matches = (value, typed) =>
    !typed.trim() ||
    (value ?? "").toLowerCase().includes(typed.trim().toLowerCase());

const uniqueSorted = (items) =>
    [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b));

// Parent should pass a `key` derived from initialValues so the form
// resets when the URL filters change (e.g. back/forward navigation).
function SearchBar({ onSearch, initialValues = EMPTY }) {
    const [values, setValues] = useState({ ...EMPTY, ...initialValues });

    // Suggestions: all known locations, fetched once and cached.
    // Key starts with "documents" so create/edit/delete invalidation refreshes it.
    const { data: locations = [] } = useQuery({
        queryKey: ["documents", "locations"],
        queryFn: documentApi.getLocations,
        staleTime: 5 * 60 * 1000,
    });

    // Each field only suggests places consistent with the fields above it
    const suggestions = useMemo(() => {
        const inProvince = locations.filter((l) =>
            matches(l.province, values.province),
        );
        const inDistrict = inProvince.filter((l) =>
            matches(l.district, values.district),
        );
        return {
            province: uniqueSorted(locations.map((l) => l.province)),
            district: uniqueSorted(inProvince.map((l) => l.district)),
            village: uniqueSorted(inDistrict.map((l) => l.village)),
        };
    }, [locations, values.province, values.district]);

    const handleChange = (key) => (e) =>
        setValues((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = Object.fromEntries(
            Object.entries(values).map(([k, v]) => [k, (v ?? "").trim()]),
        );
        onSearch(trimmed);
    };

    const handleClear = () => {
        setValues(EMPTY);
        onSearch(EMPTY);
    };

    return (
        <div className="search-box">
            <form onSubmit={handleSubmit}>
                {/* Keyword row */}
                <div className="mb-3 text-start">
                    <label className="form-label fw-semibold mb-1">
                        <FaSearch /> Keyword Search
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by ID, title, keywords, or notes..."
                        value={values.search}
                        onChange={handleChange("search")}
                    />
                </div>

                {/* Location row */}
                <div className="mb-3 text-start">
                    <label className="form-label fw-semibold mb-1">
                        <FaMapMarkerAlt /> Location
                    </label>
                    <div className="row g-2">
                        {LOCATION_FIELDS.map(({ key, label }) => (
                            <div className="col-12 col-md-4" key={key}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={label}
                                    aria-label={label}
                                    value={values[key]}
                                    onChange={handleChange(key)}
                                    list={`${key}-suggestions`}
                                    autoComplete="off"
                                />
                                <datalist id={`${key}-suggestions`}>
                                    {suggestions[key].map((name) => (
                                        <option key={name} value={name} />
                                    ))}
                                </datalist>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary flex-fill">
                        Search
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary flex-fill"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            </form>
            <br />
        </div>
    );
}

export default SearchBar;
