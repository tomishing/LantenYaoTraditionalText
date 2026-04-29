import { pool } from "../config/db.js";

// Create new record
export const createManu = async (req, res, next) => {
    try {
        const {
            id, category, title, transcribed_date_Original, possible_Gregorian_date,
            possible_Gregorian_year, date_of_taken, country, province, district,
            village, owner, length_mm, wide_mm, keywords, notes
        } = req.body;

        const result = await pool.query(
            `INSERT INTO documents (
                id, category, title, "transcribed_date_Original", "possible_Gregorian_date",
                "possible_Gregorian_year", date_of_taken, country, province, district,
                village, owner, length_mm, wide_mm, keywords, notes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [
                id, category, title, transcribed_date_Original, possible_Gregorian_date,
                possible_Gregorian_year, date_of_taken, country, province, district,
                village, owner, length_mm, wide_mm, keywords, notes
            ]
        );

        res.status(201).json({
            success: true,
            message: "Entry created successfully",
            data: result.rows[0],
        });
    } catch (err) {
        next(err);
    }
};

// Read all with search, and pagenation
export const getAllManu = async (req, res, next) => {
    try {
        const { page = 1, limit = 9, search = "" } = req.query;

        let queryText = `
            SELECT d.*, p.path_img, p.path_pdf 
            FROM documents d 
            LEFT JOIN pictures p ON d.id = p.id
        `;
        let countQueryText = `SELECT COUNT(*) FROM documents d`;
        const queryParams = [];

        if (search) {
            queryText += ` WHERE d.title ILIKE $1 OR d.notes ILIKE $1`;
            countQueryText += ` WHERE d.title ILIKE $1 OR d.notes ILIKE $1`;
            queryParams.push(`%${search}%`);
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
            documents: result.rows,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
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
            data: result.rows[0],
        });
    } catch (err) {
        next(err);
    }
};

// Update
export const updateManu = async (req, res, next) => {
    try {
        const {
            category, title, transcribed_date_Original, possible_Gregorian_date,
            possible_Gregorian_year, date_of_taken, country, province, district,
            village, owner, length_mm, wide_mm, keywords, notes
        } = req.body;

        const result = await pool.query(
            `UPDATE documents SET 
                category = COALESCE($1, category),
                title = COALESCE($2, title),
                "transcribed_date_Original" = COALESCE($3, "transcribed_date_Original"),
                "possible_Gregorian_date" = COALESCE($4, "possible_Gregorian_date"),
                "possible_Gregorian_year" = COALESCE($5, "possible_Gregorian_year"),
                date_of_taken = COALESCE($6, date_of_taken),
                country = COALESCE($7, country),
                province = COALESCE($8, province),
                district = COALESCE($9, district),
                village = COALESCE($10, village),
                owner = COALESCE($11, owner),
                length_mm = COALESCE($12, length_mm),
                wide_mm = COALESCE($13, wide_mm),
                keywords = COALESCE($14, keywords),
                notes = COALESCE($15, notes),
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $16 RETURNING *`,
            [
                category, title, transcribed_date_Original, possible_Gregorian_date,
                possible_Gregorian_year, date_of_taken, country, province, district,
                village, owner, length_mm, wide_mm, keywords, notes, req.params.id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Document updated",
            data: result.rows[0],
        });
    } catch (err) {
        next(err);
    }
};

// Delete
export const deleteManu = async (req, res, next) => {
    try {
        const result = await pool.query(
            `DELETE FROM documents WHERE id = $1 RETURNING *`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        // Note: You might want to delete related pictures as well depending on FK setup
        // await pool.query(`DELETE FROM pictures WHERE id = $1`, [req.params.id]);

        res.status(200).json({
            success: true,
            message: "Document deleted",
            data: result.rows[0],
        });
    } catch (err) {
        next(err);
    }
};
