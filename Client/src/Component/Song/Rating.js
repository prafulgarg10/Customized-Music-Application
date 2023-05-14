import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";

function Rating({ user, updateRating, ratingChanges }) {
  const [song, setSong] = useState([]);
  const songRef = useRef();
  const rateRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:3001/song_name").then((response) => {
      setSong(response.data);
    });
  }, []);

  function clickHandler(event) {
    event.preventDefault();
    const enteredSong = songRef.current.value;
    const enteredRate = rateRef.current.value;
    const data = {
      User_Id: user?.Id,
      Rating: parseInt(enteredRate),
      Song_Id: parseInt(enteredSong),
    };
    axios.post("http://localhost:3001/rate", data).then(
      (res, err) => {
        if (res.status === 200) {
          if (res.data === "Updated") {
            document.getElementById("feed_r").style.color = "green";
            document.getElementById("feed_r").innerHTML = "Rating Updated";
            updateRating(!ratingChanges);
          } else {
            document.getElementById("feed_r").style.color = "green";
            document.getElementById("feed_r").innerHTML = "Rated";
            updateRating(!ratingChanges);
          }
        }
      },
      (err) => {
        document.getElementById("feed_r").style.color = "red";
        document.getElementById("feed_r").innerHTML = "Server Error";
      }
    );
  }

  return (
    <div>
      <Container className="card pt-3">
        <h4>Select any song to rate</h4>
        <form
          action="/rate"
          method="post"
          onSubmit={clickHandler}
          className="col-9 mt-3"
        >
          <div className="mb-3 row">
            <label for="songs" className="col-sm-2 col-form-label">
              Choose Song
            </label>
            <div className="col-sm-8">
              <select class="form-select" id="songs" required ref={songRef}>
                <option selected disabled value="">
                  Search..
                </option>
                {song.map((songs) => {
                  return <option value={songs.Id}>{songs.Name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label for="rate" className="col-sm-2 col-form-label">
              Give Rating
            </label>
            <div className="col-sm-8">
              <select class="form-select" id="rate" required ref={rateRef}>
                <option selected disabled value="">
                  Search..
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
              <input type="submit" value="Rate" className="btn-success" />
            </div>
          </div>
        </form>
        <div
          id="feed_r"
          style={{ display: "flex", "justify-content": "center" }}
        ></div>
      </Container>
    </div>
  );
}
export default Rating;
