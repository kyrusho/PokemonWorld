import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

export default function MyNavBar(){

    const links = [
        {
            to: "",
            title: "Home"
        },
        {
            to: "map",
            title: "Map"
        },
        {
            to: "pokemons",
            title: "Pokemon"
        },
        {
            to: "regions",
            title: "Region"
        }
    ]

    return(
        
        <Navbar expand="lg" style={{ backgroundColor: 'rosybrown' }}>
            <Container>
                <LinkContainer to="/" style={{cursor: 'pointer'}}>
                    <Navbar.Brand className="fs-2 text-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png"
                            width={270}
                            height={90}
                            alt="Pokemon Logo"
                        />
                    </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto fs-3">
                        {links.map((link) => (
                            <LinkContainer to={`/${link.to}`} key={link.to}>
                                <Nav.Link>{link.title}</Nav.Link>
                            </LinkContainer>
                        ))}
                    </Nav>
                </Navbar.Collapse>
             </Container>
        </Navbar>
       
    )
}
