import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";

const Movie = () => {
  const [currentMovieDetail, setCurrentMovieDetail] = useState("");
  const { id } = useParams();

  const getDetail = async () => {
    let res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=zh-TW`
    );
    let data = await res.json();
    setCurrentMovieDetail(data);
  };

  useEffect(() => {
    getDetail();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.title : ""}
            </div>
            <div className="movie__original_title">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " 分鐘" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "發行日期: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span
                        className="movie__genre"
                        id={genre.id}
                        key={genre.id}
                      >
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">概要:</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
