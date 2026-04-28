import Manuscript from "../models/textModel.js";

// Create new record
export const createManu = async (req, res, next) => {
    try {
        // create is a hook in mongoose, is insertOne() in native.
        const book = await Manuscript.create(req.body);
        res.status(201).json({
            success: true,
            message: "Entry created successfully",
            data: book,
        });
    } catch (err) {
        // error is passed to errorHandler
        next(err);
    }
};

// Read all with search, and pagenation
export const getAllManu = async (req, res, next) => {
    try {
        const { page = 1, limit = 9, search = "" } = req.query;

        //** Search **//
        // empty object
        const query = {};

        // $or: for a match in either field, title or notes fields
        // $regex: pattern match
        // $options: "i": Case insensitive, Homer or homer
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { notes: { $regex: search, $options: "i" } },
            ];
        }
        // count total documents matched with a search word
        const total = await Manuscript.countDocuments(query);

        // Fetching data
        const books = await Manuscript.find(query)
            .sort({ no: 1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        // retun the response
        res.status(200).json({
            success: true,
            documents: books,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        });
    } catch (err) {
        next(err);
    }
};

// Read one
export const getManuById = async (req, res, next) => {
    try {
        const book = await Manuscript.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (err) {
        next(err);
    }
};

// Update
export const updateManu = async (req, res, next) => {
    try {
        // mongoose method combines find and update
        const book = await Manuscript.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }
        // send back to frontend
        res.status(200).json({
            success: true,
            message: "Document updated",
            data: book,
        });
    } catch (err) {
        next(err);
    }
};

// Delete
export const deleteManu = async (req, res, next) => {
    try {
        const book = await Manuscript.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Document deleted",
            data: book,
        });
    } catch (err) {
        next(err);
    }
};
