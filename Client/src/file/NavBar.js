import {Button, Navbar, Nav, Container, Dropdown} from 'react-bootstrap';
function NavBar({user}){
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Spotify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
          <Dropdown style={{ 'width': 100 }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
             {user}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/" style={{'display':'flex','justifyContent':'center'}}><Button variant="danger">Signout</Button></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    );
}
export default NavBar;