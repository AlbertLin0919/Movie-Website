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

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [type, currentPage, activeGenre]);

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
        <button
          className={activeGenre === 0 ? "active" : ""}
          onClick={() => setActiveGenre(0)}
        >
          全部
        </button>
        <button
          className={activeGenre === 28 ? "active" : ""}
          onClick={() => setActiveGenre(28)}
        >
          動作
        </button>
        <button
          className={activeGenre === 18 ? "active" : ""}
          onClick={() => setActiveGenre(18)}
        >
          劇情
        </button>
        <button
          className={activeGenre === 27 ? "active" : ""}
          onClick={() => setActiveGenre(27)}
        >
          恐怖
        </button>
        <button
          className={activeGenre === 35 ? "active" : ""}
          onClick={() => setActiveGenre(35)}
        >
          喜劇
        </button>
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
