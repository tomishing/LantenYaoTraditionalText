import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(search.trim());
    };

    const handleClear = () => {
        setSearch("");
        onSearch("");
    };

    return (
        <div className="search-box">
            <form onSubmit={handleSubmit}>
                {/* Input row */}
                <div className="mb-3 text-start">
                    <label className="form-label fw-semibold mb-1">
                        <FaSearch /> Keyword Search
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
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
