import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Create from "./Pages/Create";

import Post from "./store/PostContext";
import { Authcontext, FirebaseContext } from "./store/Context";
import ViewPost from "./Pages/ViewPost";

function App() {
  const { setUser } = useContext(Authcontext);
  const { Firebase } = useContext(FirebaseContext);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/viewpost">
            <ViewPost />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
