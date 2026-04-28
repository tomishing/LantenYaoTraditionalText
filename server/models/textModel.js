import mongoose from "mongoose";

const manuSchema = new mongoose.Schema(
    {
        no: { type: Number },
        dir: { type: String },
        path: { type: String },
        row_num: { type: Number },
        title: { type: String },
        possible_gregorian_date: { type: String },
        possible_gregorian_year: { type: Number },
        date_of_taken: { type: String },
        district: { type: String },
        notes: { type: String },
    },
    {
        timestamps: true,
        collection: "Manuscript",
    },
);

export default mongoose.model("Manuscript", manuSchema);
