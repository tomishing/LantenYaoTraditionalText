import path from "path";
import { Readable } from "stream";
import { getPdfUrl } from "../services/r2Service.js";

// PDFs are public.
//   /api/pdfs/:filename             -> redirect to the file in R2 (view in browser)
//   /api/pdfs/:filename?download=1  -> stream it with an attachment header, so the
//                                      browser saves it (the download attribute is
//                                      ignored for cross-origin R2 links)
export const servePdf = async (req, res, next) => {
    const filename = path.basename(req.params.filename);
    const pdfUrl = getPdfUrl(filename);

    if (req.query.download !== "1") {
        return res.redirect(pdfUrl);
    }

    try {
        const upstream = await fetch(pdfUrl);
        if (!upstream.ok || !upstream.body) {
            return res.status(upstream.status === 404 ? 404 : 502).json({
                success: false,
                message: "PDF not found",
            });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        );
        const length = upstream.headers.get("content-length");
        if (length) res.setHeader("Content-Length", length);

        Readable.fromWeb(upstream.body).pipe(res);
    } catch (err) {
        next(err);
    }
};
