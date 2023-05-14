import "./User.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function SignUp({ setUser }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const navigate = useNavigate();

  function signupClickHandler(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredContactNo = contactRef.current.value;
    const user = {
      Email: enteredEmail,
      Name: enteredName,
      Contact: enteredContactNo,
    };

    Axios.post("http://localhost:3001/signup", user).then((res) => {
      if (res.data === "") {
        document.getElementById("feed").innerHTML +=
          "Email already exist! Please login";
        event.target.reset();
      } else {
        setUser({
          Email: enteredEmail,
          Name: enteredName,
          Id: res.data[0]?.Id,
        });

        navigate("/dashboard");
      }
    });
  }

  return (
    <div className="main" style={{ backgroundImage: `url("/music.jpeg")` }}>
      <h4>SignUp</h4>
      <form
        action="/add"
        method="post"
        onSubmit={signupClickHandler}
        className="col-6 mt-3 form"
      >
        <div className="mb-3 row">
          <label for="name" className="row">
            Name
          </label>
          <div className="row">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              ref={nameRef}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="email" className="row">
            Email
          </label>
          <div className="row">
            <input
              type="email"
              className="form-control"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="contactNo" className="row">
            Contact Number
          </label>
          <div className="row">
            <input
              type="number"
              className="form-control"
              id="contactNo"
              ref={contactRef}
              placeholder="Enter your contact no."
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <div className="col-2">
            <input type="submit" value="SignUp" className="btn-success" />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-6 mb-3" id="feed" style={{ color: "red" }}></div>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
