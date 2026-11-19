import { pool } from "../config/db.js";
import { getPdfUrl } from "../services/r2Service.js";

const transformDocumentWithUrls = (doc) => {
    return {
        ...doc,
        image_url: doc.path_img ? `/images/${doc.path_img}` : null,
        pdf_url: doc.path_pdf ? getPdfUrl(doc.path_pdf) : null,
    };
};

// Read all with search, and pagenation
export const getAllManu = async (req, res, next) => {
    try {
        const {
            page = 1, limit = 9, search = "", hasPdf = "",
            province = "", district = "", village = "", category = ""
        } = req.query;

        let queryText = `
            SELECT d.*, p.path_img, p.path_pdf
            FROM documents d
            LEFT JOIN pictures p ON d.id = p.id
        `;
        let countQueryText = `SELECT COUNT(*) FROM documents d LEFT JOIN pictures p ON d.id = p.id`;
        const queryParams = [];
        const conditions = [];

        if (search) {
            queryParams.push(`%${search}%`);
            conditions.push(`(CAST(d.id AS TEXT) ILIKE $${queryParams.length} OR d.title ILIKE $${queryParams.length} OR d.notes ILIKE $${queryParams.length} OR d.keywords ILIKE $${queryParams.length})`);
        }

        // Location filters (partial, case-insensitive match)
        const locationFilters = { province, district, village };
        for (const [column, value] of Object.entries(locationFilters)) {
            const trimmed = String(value).trim();
            if (trimmed) {
                queryParams.push(`%${trimmed}%`);
                conditions.push(`d.${column} ILIKE $${queryParams.length}`);
            }
        }

        // Category filter (exact, case-insensitive match)
        const categoryTrimmed = String(category).trim();
        if (categoryTrimmed) {
            queryParams.push(categoryTrimmed);
            conditions.push(`LOWER(TRIM(d.category)) = LOWER($${queryParams.length})`);
        }

        if (hasPdf === "true") {
            conditions.push(`p.path_pdf IS NOT NULL`);
        }

        if (conditions.length > 0) {
            const whereClause = ` WHERE ${conditions.join(" AND ")}`;
            queryText += whereClause;
            countQueryText += whereClause;
        }

        queryText += ` ORDER BY d.id ASC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;

        // count total documents matched with a search word
        const countResult = await pool.query(countQueryText, queryParams);
        const total = parseInt(countResult.rows[0].count, 10);

        // Fetching data
        const limitNum = Number(limit);
        const pageNum = Number(page);
        const offset = (pageNum - 1) * limitNum;
        
        const fetchParams = [...queryParams, limitNum, offset];
        const result = await pool.query(queryText, fetchParams);

        // return the response
        res.status(200).json({
            success: true,
            documents: result.rows.map(transformDocumentWithUrls),
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
        });
    } catch (err) {
        next(err);
    }
};

// Distinct province/district/village combinations (for search suggestions)
export const getLocations = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT DISTINCT
                NULLIF(TRIM(province), '') AS province,
                NULLIF(TRIM(district), '') AS district,
                NULLIF(TRIM(village), '') AS village
             FROM documents
             WHERE COALESCE(TRIM(province), '') <> ''
                OR COALESCE(TRIM(district), '') <> ''
                OR COALESCE(TRIM(village), '') <> ''
             ORDER BY province, district, village`
        );

        res.status(200).json({
            success: true,
            locations: result.rows,
        });
    } catch (err) {
        next(err);
    }
};

// Distinct categories (for the category filter)
export const getCategories = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT TRIM(category) AS category, COUNT(*)::int AS count
             FROM documents
             WHERE COALESCE(TRIM(category), '') <> ''
             GROUP BY TRIM(category)
             ORDER BY TRIM(category)`
        );

        res.status(200).json({
            success: true,
            categories: result.rows,
        });
    } catch (err) {
        next(err);
    }
};

// Read one
export const getManuById = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT d.*, p.path_img, p.path_pdf 
             FROM documents d 
             LEFT JOIN pictures p ON d.id = p.id 
             WHERE d.id = $1`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        res.status(200).json({
            success: true,
            data: transformDocumentWithUrls(result.rows[0]),
        });
    } catch (err) {
        next(err);
    }
};
