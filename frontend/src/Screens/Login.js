import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/footer';
import Navbar from '../components/Navbar';

export default function Login() {
    const [credentials, setcredentials] = useState({email:"",password:""});
    //Connecting backend
    let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const response = await fetch("${backendUrl}/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //because we have made createuser a post method we have to send body with this function.
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials!");
    }

    if(json.success){
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
    <div>
      <Navbar/>
    </div>
      <div className="container mt-4 ">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="EnterPassword"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
      <div>
      <Footer/>
    </div>
    </>
  );
};

