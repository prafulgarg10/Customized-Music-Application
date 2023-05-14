import { Button, Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUserOnSignOut }) {
  const [isUserAvailable, setIsUserAvailable] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setIsUserAvailable(true);
    } else {
      setIsUserAvailable(false);
    }
  }, [user]);

  function signoutHandler() {
    setIsUserAvailable(false);
    setUserOnSignOut();
  }

  return (
    <div>
      {isUserAvailable && (
        <Navbar bg="dark" variant="dark" style={{ height: "80px" }}>
          <Container>
            <Link to="/" class="navbar-brand">
              Spotify
            </Link>
            <Nav className="me-auto">
              <Link to="/dashboard" class="nav-link">
                Dashboard
              </Link>
            </Nav>
            <Dropdown
              style={{
                width: 140,
              }}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {"Welcome " + user?.Name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link
                  to="/profile"
                  className="dropdown-item"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Profile
                </Link>
                <Link
                  to="/artists"
                  className="dropdown-item"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  All Artists
                </Link>
                <Link
                  to="/userrating"
                  className="dropdown-item"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  See your ratings
                </Link>
                <Dropdown.Item
                  href="/"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button variant="danger" onClick={signoutHandler}>
                    Signout
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
      )}
      {!isUserAvailable && (
        <Navbar bg="dark" variant="dark">
          <Container>
            {/* <Navbar.Brand href="/">Spotify</Navbar.Brand> */}
            <Link to="/" class="navbar-brand">
              Spotify
            </Link>
            <Navbar.Collapse className="justify-content-end">
              {/* <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link> */}
              <Link to="/" class="nav-link">
                Login
              </Link>
              <Link to="/signup" class="nav-link">
                SignUp
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}
export default NavBar;
