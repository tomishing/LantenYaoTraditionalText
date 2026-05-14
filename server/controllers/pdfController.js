import jwt from "jsonwebtoken";
import path from "path";
import { getPdfUrl } from "../services/r2Service.js";

const unauthorizedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Required</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f8f9fa; }
    .box { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); max-width: 400px; }
    h2 { color: #dc3545; margin-bottom: 1rem; }
    p { color: #6c757d; margin-bottom: 1.5rem; }
    a { display: inline-block; padding: 0.5rem 1.5rem; background: #0d6efd; color: white; border-radius: 4px; text-decoration: none; }
    a:hover { background: #0b5ed7; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🔒 Login Required</h2>
    <p>You need to login to view this PDF.</p>
    <a href="/">Go to Login</a>
  </div>
</body>
</html>`;

export const servePdf = (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(401).send(unauthorizedHtml);
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.status(401).send(unauthorizedHtml);
    }

    const filename = path.basename(req.params.filename);
    const pdfUrl = getPdfUrl(filename);

    res.redirect(pdfUrl);
};
