import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TvShows() {
  const [tvArray, setTvArray] = useState([]);
  async function tvShows() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=b7a0e78f63fd4b1e46bd7fd75f4d9232"
    );
    setTvArray(data.results);
  }
  useEffect(() => {
    tvShows();
  }, []);

  return (
    <>
      {tvArray.length > 0 ? (
        <>
          <div className="container">
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
