import React, { useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MovieContext } from "../../MovieContext/MovieContext";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";
import "./Home.css";

const Home = () => {
  const { fetchData, movies } = useContext(MovieContext);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
        >
          {movies.map((movie) => (
            <Link
              style={{ color: "white" }}
              to={`/movie/${movie.id}`}
              key={movie.id}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  alt={movie.original_title}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />
                  </span>
                </div>

                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <MovieList />
    </>
  );
};

export default Home;
