import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/home/home";
import Dramas from "./views/dramas/dramas";
import Movies from "./views/movies/movies";
import MDetail from "./views/movies/moviedetail";
import DDetail from "./views/dramas/dramadetail";
import Profile from "./views/profile";
import Signin from "./views/signin";
import Signup from "./views/signup";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dramas" component={Dramas} />
          <Route path="/movies" component={Movies} />
          <Route path="/profile" component={Profile} />
          <Route path="/moviedetail/:id" component={MDetail} />
          <Route path="/dramadetail/:id" component={DDetail} />
          <Route path="/" component={Signin} exact />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
