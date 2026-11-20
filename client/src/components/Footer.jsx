import { Link } from "react-router";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="footer py-3 text-muted small">
            <Container>
                © 2008–2026 Lanten Yao Traditional Text Archive. Licensed
                under{" "}
                <a
                    href="https://creativecommons.org/licenses/by-nc/4.0/"
                    target="_blank"
                    rel="license noopener noreferrer"
                >
                    CC BY-NC 4.0
                </a>{" "}
                · <Link to="/copyright">Copyright and Terms of Use</Link>
            </Container>
        </footer>
    );
};
export default Footer;
