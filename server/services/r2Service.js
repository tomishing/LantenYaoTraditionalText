const R2_BUCKET_URL = process.env.R2_BUCKET_URL || "https://pub-003559af1b454e4ba3e82f85a95983b9.r2.dev";

export const getImageUrl = (filename) => {
    if (!filename) return null;
    return `${R2_BUCKET_URL}/images/${filename}`;
};

export const getPdfUrl = (filename) => {
    if (!filename) return null;
    return `${R2_BUCKET_URL}/pdfs/${filename}`;
};
