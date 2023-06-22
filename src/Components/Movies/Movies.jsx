import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Movies() {
  const [movies, setmovies] = useState([]);
  async function movieAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=b7a0e78f63fd4b1e46bd7fd75f4d9232"
    );
    setmovies(data.results);
  }
  useEffect(() => {
    movieAPI();
  }, []);
  return (
    <>
      {movies.length > 0 ? (
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
                  <div className="movie">
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt="img"
                    />
                    <h5>{movie.title}</h5>
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
