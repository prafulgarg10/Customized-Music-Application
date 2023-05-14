import { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Col, Table } from "react-bootstrap";

function AllArtists() {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getallartist").then((response) => {
      console.log("data", response.data);
      setArtist(response.data);
    });
  }, []);
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <h4>All Artists</h4>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Artists</th>
              <th>Date of Birth</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            {artist.map((artists, num) => {
              return (
                <tr>
                  <td>{num + 1}</td>
                  <td>{artists.Name}</td>
                  <td>{artists.DOB.substring(0, 10)}</td>
                  <td>{artists.Bio}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
export default AllArtists;
