import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from '../components/footer';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  //Connecting backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.geolocation,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //because we have made createuser a 'post' method we have to send body with this function.
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.geolocation,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials!");
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
      <div className="container mt-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              name="geolocation"
              value={credentials.geolocation}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter address"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user{" "}
          </Link>
        </form>
      </div>
      <div>
      <Footer/>
    </div>
    </>
  );
}
