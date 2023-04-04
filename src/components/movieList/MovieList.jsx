import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const [filtered, setFiltered] = useState([]);
  const { type } = useParams();

  const GENRES = [
    { id: 0, name: "全部" },
    { id: 28, name: "動作" },
    { id: 18, name: "劇情" },
    { id: 27, name: "恐怖" },
    { id: 35, name: "喜劇" },
  ];

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [type, currentPage]);

  const filterMovies = () => {
    if (activeGenre === 0) {
      setFiltered(movieList);
      return;
    }

    const filter = movieList.filter((movie) =>
      movie.genre_ids.includes(activeGenre)
    );
    setFiltered(filter);
  };

  useEffect(() => {
    filterMovies();
  }, [activeGenre, movieList, currentPage]);

  const getData = async () => {
    let res = await fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=14b93aff8c1d147576bf44592b5f479a&language=zh-TW&page=${currentPage}`
    );
    let data = await res.json();
    setMovieList(data.results);
    setFiltered(data.results);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    filterMovies();
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="filter_container">
        {GENRES.map((genre) => (
          <button
            className={activeGenre === genre.id ? "active" : ""}
            onClick={() => setActiveGenre(genre.id)}
            key={genre.id}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <motion.div layout className="list__cards">
        <AnimatePresence>
          {filtered.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(page) => handlePageChange(page.selected + 1)}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="pagination__page"
          activeClassName="pagination__page--active"
        />
      </div>
    </div>
  );
};

export default MovieList;
