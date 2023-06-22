import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import TvShows from "./Components/TvShows/TvShows.jsx";
import MovieDetails from "./Components/MovieDetailes/MovieDetails.jsx";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  // fun component inside app component to control all children
  function TestingRoute(props) {
    if (localStorage.getItem("tkn") == null) {
      return <Navigate to="/login" />;
    } else {
      return <> {props.children}</>;
    }
  }

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const decodeToken = () => {
    let user = jwtDecode(localStorage.getItem("tkn"));
    setCurrentUser(user);
  };

  const clearUserData = () => {
    localStorage.removeItem("tkn");
    setCurrentUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("tkn") != null) {
      decodeToken();
    } else {
    }
  }, []);

  return (
    <>
      <Navbar crruser={currentUser} clr={clearUserData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="movies"
          element={
            <TestingRoute>
              <Movies />
            </TestingRoute>
          }
        />
        <Route
          path="tv"
          element={
            <TestingRoute>
              <TvShows />
            </TestingRoute>
          }
        />
        <Route path="moviedetails/:id" element={<MovieDetails />} />
        <Route path="login" element={<Login decodeToken={decodeToken} />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <h1>404</h1>
            </div>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
