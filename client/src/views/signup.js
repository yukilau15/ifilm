import axios from "axios";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const changeOnClick = (e) => {
    e.preventDefault();

    const users = {
      name,
      email,
      password,
    };

    setName("");
    setEmail("");
    setPassword("");

    axios
      .post("users/signup", users)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div id="background">
        <img src="/background.jpg" class="stretch" alt="" />
      </div>
      <div className="form-box">
        <form
          onSubmit={changeOnClick}
          encType="multipart/form-data"
          className="form-group text-center"
        >
          <h1 class="h3 text-black mb-3 fw-normal">Sign Up</h1>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button class="w-100 btn btn-lg btn-secondary mb-3" type="submit">
            Sign Up
          </button>
          <div>
            <span className="text-black">
              Already an user? <a href="/signin">Sign In</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
