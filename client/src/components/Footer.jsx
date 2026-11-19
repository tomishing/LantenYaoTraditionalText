import { Link } from "react-router";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="footer py-3 text-muted small">
            <Container>
                © 2009–2026 Lanten Yao Traditional Text Archive. All rights
                reserved. · <Link to="/copyright">Copyright and Terms of Use</Link>
            </Container>
        </footer>
    );
};
export default Footer;
