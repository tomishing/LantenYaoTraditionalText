import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { RiBookShelfFill } from "react-icons/ri";

export default function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand>
                    <RiBookShelfFill /> Lanten Yao Traditional Text Archive
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navMenu" />
                <Navbar.Collapse id="navMenu">
                    <Nav className="ms-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
