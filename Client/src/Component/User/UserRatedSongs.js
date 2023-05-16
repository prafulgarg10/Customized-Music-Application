import { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserRatedSongs({ user }) {
  const [userRating, setUserRating] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/userratings?Id=${user?.Id}`)
      .then((response) => {
        setUserRating(response.data);
      })
      .catch((err) => navigate("/server-error"));
  }, []);
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <h4>Songs you have Rated</h4>
          </Col>
        </Row>
      </Container>
      {userRating.length !== 0 ? (
        <Container className="mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Song</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {userRating?.map((song) => {
                return (
                  <tr>
                    <td>{song?.SongName}</td>
                    <td>{song?.Rating}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Container className="mt-3">
          <Row>
            <Col>You haven't rated yet.</Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default UserRatedSongs;
