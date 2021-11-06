import axios from "axios";
import { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const changeOnClick = (e) => {
    e.preventDefault();

    const users = {
      email,
      password,
    };

    setEmail("");
    setPassword("");

    axios
      .post("users/signin", users)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div id="background">
        <img src="/background.jpg" className="stretch" alt="" />
      </div>
      <div className="form-box">
        <form
          onSubmit={changeOnClick}
          encType="multipart/form-data"
          className="form-group text-center"
        >
          <h1 className="h3 text-black mb-3 fw-normal">Sign In</h1>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-100 btn btn-lg btn-secondary mb-3" type="submit">
            Sign in
          </button>
          <div>
            <span className="text-black">
              New user? <a href="/signup">Create an account</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
