import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiBookShelfFill } from "react-icons/ri";

export default function MyNavbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand>
                    <RiBookShelfFill /> Lanten Yao Traditional Text Archive
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navMenu" />
                <Navbar.Collapse id="navMenu">
                    <Nav className="ms-auto">
                        <NavDropdown title="About the project" id="basic-nav-dropdown">
                            <LinkContainer to="/about">
                                <NavDropdown.Item>Overview</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/migrationlaos">
                                <NavDropdown.Item>Migration Laos</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/migrationchina">
                                <NavDropdown.Item>Migration China</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/photoshooting">
                                <NavDropdown.Item>Photoshooting</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/">
                            <Nav.Link>Search Texts</Nav.Link>
                        </LinkContainer>
                        {token ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
