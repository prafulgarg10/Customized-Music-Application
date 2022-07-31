import './User.css';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
function SignUp(){
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
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      if (res.data==='') {
        document.getElementById("feed").innerHTML +=
          "Email already exist! Please use another";
        event.target.reset();
      } else {
        navigate("/home", { state: { Name: user.Name } });
      }
    });
  }
  function loginHandler(){
    navigate("/");
  }
    return (
        <div className="main" style={{backgroundImage: `url("/music.jpeg")`}}>
                <h4 >SignUp</h4>
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
                                <input type="submit" value="SignUp" className="btn-success" />
                            </div>
                            <div className="col-2 mb-3">
                                <input type="button" value="Login" className="btn-primary" onClick={loginHandler}/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="col-6 mb-3" id="feed" style={{color: 'red'}}></div>
                            </div>
                        
                </form>
                </div>
      );
}
export default SignUp;