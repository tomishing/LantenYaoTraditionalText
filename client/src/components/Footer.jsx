import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="footer text-center py-3 text-muted small">
            © 2009–2026 Lanten Yao Traditional Text Archive. All rights
            reserved. · <Link to="/copyright">Copyright and Terms of Use</Link>
        </footer>
    );
};
export default Footer;
