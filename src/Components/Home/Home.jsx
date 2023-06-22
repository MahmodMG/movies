import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setmovies] = useState([]);
  const [tvArray, setTvArray] = useState([]);

  async function movieAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=b7a0e78f63fd4b1e46bd7fd75f4d9232"
    );
    // console.log(data);
    setmovies(data.results);
  }
  async function tvShows() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=b7a0e78f63fd4b1e46bd7fd75f4d9232"
    );
    // console.log(data);
    setTvArray(data.results);
  }

  useEffect(() => {
    movieAPI();
    tvShows();
  }, []);
  return (
    <>
      {movies.length > 0 && tvArray.length > 0 ? (
        <>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="title">
                  <h3>Trending Movies To Watch</h3>
                  <p className="text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              {movies.map((movie) => (
                <div key={movie.id} className="col-md-2">
                  <Link to={`/moviedetails/${movie.id}`}>
                    <div className="movie">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="img"
                      />
                      <h5>{movie.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="title">
                  <h3>Trending TV Shows To Watch</h3>
                  <p className="text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              {tvArray.map((tv) => (
                <div key={tv.id} className="col-md-2">
                  <div className="tv">
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                      alt="img"
                    />
                    <h5>{tv.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
          </div>
        </>
      )}
    </>
  );
}
