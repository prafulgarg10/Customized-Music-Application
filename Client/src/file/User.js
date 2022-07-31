import { useRef } from "react";
import Axios from "axios";
import './User.css';
import { useNavigate } from "react-router-dom";
function User() {
  const nameRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  function clickHandler(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const user = {
      Email: enteredEmail,
      Name: enteredName,
    };
    Axios.post("http://localhost:3001/login", user).then((res) => {
      if (res.data.length === 0) {
        document.getElementById("feed").innerHTML +=
          "User doesn't exist, Please sign up";
        event.target.reset();
      } else {
        console.log(res.data);
        navigate("/home", { state: { Name: res.data[0].Name, Id: res.data[0].Id } });
      }
    });
  }
  function signUpHandler(){
    navigate("/signup");
  }
  return (
    <div className="main" style={{backgroundImage: `url("/music.jpeg")`}}>
            <h4 >Login/SignUp</h4>
            <form action="/add" method="post" onSubmit={clickHandler} className="col-6 mt-3 form">
                <div className="mb-3 row">
                    <label for="name" className="row">Name</label>
                    <div className="row">
                        <input type="text" readonly className="form-control" id="name" placeholder="Enter your name" ref={nameRef} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="email" className="row">Email</label>
                    <div className="row">
                        <input type="email" className="form-control" id="email" ref={emailRef} placeholder="Enter your email"/>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-5">
                        <div className="col-2 mb-3">
                            <input type="submit" value="Login" className="btn-success" />
                        </div>
                        <div className="col-2 mb-3">
                            <input type="button" value="SignUp" className="btn-primary" onClick={signUpHandler}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="col-6 mb-3" id="feed" style={{color: 'red'}}></div>
                        </div>
                    
            </form>
            </div>
  );
}
export default User;
