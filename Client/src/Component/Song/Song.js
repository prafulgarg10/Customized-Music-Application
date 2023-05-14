import { Container, Button, Row, Col, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Rating from "./Rating";

function Song({ user }) {
  const [list, setList] = useState([]);
  const [artlist, setArtList] = useState([]);
  const [ratingChanges, setRatingChanges] = useState(false);
  const [updatedSongsArray, setUpdatedSongsArray] = useState([]);
  const sizeRef = useRef();

  useEffect(() => {
    Axios.get("http://localhost:3001/song").then((response) => {
      console.log("song", response.data);
      setList(response.data);
      setUpdatedSongsArray(response.data);
    });
    Axios.get(`http://localhost:3001/artistForSong`).then((response) => {
      setArtList(response.data);
    });
  }, [ratingChanges]);

  function tableSizeChangeHandler() {
    setUpdatedSongsArray(
      list.slice(
        0,
        parseInt(sizeRef.current.value) > 0
          ? parseInt(sizeRef.current.value)
          : list.length
      )
    );
  }

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col style={{ flex: 1 }}>
            <h4>Top {} Songs</h4>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              gap: "10px",
              flex: 1,
            }}
          >
            <input
              type="number"
              placeholder="Change table size"
              ref={sizeRef}
            />
            <Button variant="secondary" onClick={tableSizeChangeHandler}>
              Change
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "end", flex: 5 }}>
            <Link to="/AddSong" state={{ Name: user?.Name, Id: user?.Id }}>
              <Button variant="secondary">+ Add Songs</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Song no.</th>
              <th>Artwork</th>
              <th>Song</th>
              <th>Date of Release</th>
              <th>Artist</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {updatedSongsArray.map((items, num) => {
              return (
                <tr>
                  <td>{num + 1}</td>
                  <td>
                    <Image
                      src={
                        items?.Cover
                          ? items?.Cover.replace("C:fakepath", "")
                          : "/arijit.jpg"
                      }
                      style={{ width: 100, height: 100 }}
                    />
                  </td>
                  <td>{items.Name}</td>
                  <td>{items.DOR.substring(0, 10)}</td>
                  {/* <td>{getArtist(items.Id)}</td> */}
                  <td>
                    {artlist.map((artist) => {
                      if (artist.Song_Id === items.Id) {
                        return artist.Name + ", ";
                      }
                      return "";
                    })}
                  </td>
                  <td>{items.Rating}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Rating
        user={user}
        updateRating={setRatingChanges}
        ratingChanges={ratingChanges}
      />
    </div>
  );
}
export default Song;
