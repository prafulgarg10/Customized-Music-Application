import { Container, Row, Col, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Axios from "axios";

function Artist() {
  const [artist, setArtist] = useState([]);
  const [songlist, setSongList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/artist").then((response) => {
      setArtist(response.data);
    });
    Axios.get(`http://localhost:3001/songForArtist`).then((response) => {
      setSongList(response.data);
    });
  }, []);

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <h4>Artists with Songs</h4>
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
              <th>Songs</th>
            </tr>
          </thead>
          <tbody>
            {artist.map((artists, num) => {
              return (
                <tr>
                  <td>{num + 1}</td>
                  <td>{artists.Name}</td>
                  <td>{artists.DOB.substring(0, 10)}</td>
                  <td>
                    {songlist.map((song) => {
                      if (song.Artist_Id === artists.Id) {
                        return song.Name + ", ";
                      }
                      return "";
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
export default Artist;
