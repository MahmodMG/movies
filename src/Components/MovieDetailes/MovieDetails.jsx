import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  let { id } = useParams();
  // console.log(id);

  const [movieObject, setMovieDetails] = useState({});

  const getMovieDetails = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b7a0e78f63fd4b1e46bd7fd75f4d9232&language=en-US`
    );
    setMovieDetails(data);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="myImage">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/original/${movieObject.poster_path}`}
                alt="img"
              />
            </div>
          </div>
          <div className="col-md-8">
            <h3>{movieObject.original_title}</h3>
            <p>{movieObject.overview}</p>
            {movieObject.genres?.map((genre, idx) => (
              <span key={idx} className="me-2 p-2 bg-info text-white">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
