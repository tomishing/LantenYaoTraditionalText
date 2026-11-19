import { useEffect } from "react";

const SITE = "Lanten Yao Traditional Text Archive";

function setMeta(attr, key, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

// Updates the page title and description per route so each page
// is indexed with its own text (index.html holds the defaults).
export default function Seo({ title, description }) {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE}` : SITE;
        document.title = fullTitle;
        setMeta("name", "description", description);
        setMeta("property", "og:title", fullTitle);
        setMeta("property", "og:description", description);
        setMeta("name", "twitter:title", fullTitle);
        setMeta("name", "twitter:description", description);
    }, [title, description]);
    return null;
}
