import { useEffect, useRef, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import AddArtist from "./file/AddArtist";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "./file/NavBar";

function AddSong() {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const [artist,setArtist] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nameRef = useRef();
    const dateRef = useRef();
    const artworkRef = useRef();
    const artistRef = useRef();
    useEffect(()=>{
        Axios.get("http://localhost:3001/artist_name").then((response) => {
            setArtist(response.data);
        });
    },[]);
    function clickHandler(event) {
        event.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredDate = dateRef.current.value;
        const enteredArtwork = artworkRef.current.value;
        const enteredArtist = artistRef.current.value;
        const addData = {
            Name: enteredName,
            DOR: enteredDate,
            Cover: enteredArtwork,
            Artist: enteredArtist
        }
        Axios.post("http://localhost:3001/add", addData).then((res) => {
            if(res.status===200){
            document.getElementById("feed_s").style.color = "green";
            document.getElementById("feed_s").innerHTML = addData.Name + " added successfully";
            }
        },(err)=>{
            document.getElementById("feed_s").style.color = "red";
            document.getElementById("feed_s").innerHTML = "Server Error";
        });
    }
    return (
        <div>
            <NavBar user={location.state.Name}/>
            <Container className="mt-3">
                <h4>Adding a new song</h4>
                <form action="/add" method="post" onSubmit={clickHandler} className="col-9 mt-3">
                    <div className="mb-3 row">
                        <label for="song" className="col-sm-2 col-form-label">Song Name</label>
                        <div className="col-sm-10">
                            <input type="text" readonly className="form-control" id="song" placeholder="Enter Song name" ref={nameRef} pattern="([a-zA-Z\s]){1,30}" required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="date" className="col-sm-2 col-form-label">Date Released</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="date" ref={dateRef} required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="artwork" className="col-sm-2 col-form-label">Artwork</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" id="artwork" ref={artworkRef} required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="artist" className="col-sm-2 col-form-label">Artist</label>
                        <div className="col-sm-8">
                            <select class="form-select" id="artist" required ref={artistRef}>
                                <option selected disabled value="">Search..</option>
                                {
                                    artist.map((artists) => {
                                        return(
                                            <option value={artists.Id}>{artists.Name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-2" style={{ 'display': 'flex', 'justifyContent': 'right' }}>
                            <Button variant="secondary" onClick={handleShow}>Add Artist</Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Artist</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddArtist/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="submit" value="Add Song" className="btn-success" />
                        </div>
                    </div>
                </form>
            </Container>
            <div id="feed_s" style={{'display':'flex','justify-content':'center'}}></div>
        </div>
    );
}
export default AddSong;