import { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile({ user, updateUserOnDelete }) {
  const [activeUser, setActiveUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/getuser?Id=${user?.Id}`).then(
      (response) => {
        setActiveUser(response.data[0]);
      }
    );
  }, []);

  function deleteUserHandler() {
    Axios.delete(`http://localhost:3001/deleteuser?Id=${user?.Id}`).then(
      (response) => {
        if (response.status === 200) {
          updateUserOnDelete({});
          navigate("/");
        } else {
          console.log("error");
        }
      }
    );
  }

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <h4>Profile</h4>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{activeUser?.Name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{activeUser?.EMAIL}</td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{activeUser?.Contact}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{activeUser?.Created_At}</td>
            </tr>
            <tr>
              <th>Remove my Profile</th>
              <td>
                <Button variant="danger" onClick={deleteUserHandler}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
export default Profile;
