import { useRef } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddArtist({ artistInserted }) {
  const nameRef = useRef();
  const dateRef = useRef();
  const bioRef = useRef();
  const navigate = useNavigate();

  function clickHandlerArtist(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredDate = dateRef.current.value;
    const enteredBio = bioRef.current.value;

    const addData = {
      Name: enteredName,
      DOB: enteredDate,
      Bio: enteredBio,
    };

    if (addData.Name === "" || addData.Name.length > 20) {
      document.getElementById("feed_a").style.color = "lightgreen";
      document.getElementById("feed_a").innerHTML = "Enter valid Name";
    } else {
      if (addData.Bio === "" || addData.Bio.length > 1000) {
        document.getElementById("feed_a").style.color = "lightgreen";
        document.getElementById("feed_a").innerHTML = "Enter valid Bio";
      } else {
        Axios.post("http://localhost:3001/addArtist", addData)
          .then((res) => {
            if (res.status === 200) {
              artistInserted(true);
              document.getElementById("feed_a").style.color = "green";
              document.getElementById("feed_a").innerHTML =
                addData.Name + " added successfully";
            } else {
              document.getElementById("feed_a").style.color = "red";
              document.getElementById("feed_a").innerHTML = "Server error";
            }
          })
          .catch((err) => {
            navigate("/server-error");
          });
      }
    }
  }
  return (
    <div>
      <Container className="mt-3">
        {/* I am not using form here as If I use that then the AddSong form will also be submitted */}
        <div className="mb-3 row">
          <label for="artist" className="col-sm-4 col-form-label">
            Artist Name
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="artist"
              placeholder="Enter Artist name"
              ref={nameRef}
              pattern="[a-zA-Z]{1,20}"
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="date" className="col-sm-4 col-form-label">
            Date of Birth
          </label>
          <div className="col-sm-6">
            <input
              type="date"
              className="form-control"
              id="date"
              ref={dateRef}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="bio" className="col-sm-4 col-form-label">
            Bio
          </label>
          <div className="col-sm-6">
            <textarea
              class="form-control"
              id="bio"
              rows="3"
              ref={bioRef}
              required
            ></textarea>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label"></label>
          <div className="col-sm-6">
            <input
              type="submit"
              value="Add Artist"
              className="btn-success"
              onClick={clickHandlerArtist}
            />
          </div>
        </div>
        <div
          id="feed_a"
          style={{ display: "flex", "justify-content": "center" }}
        ></div>
      </Container>
    </div>
  );
}
export default AddArtist;
