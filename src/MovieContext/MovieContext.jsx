import { createContext, useReducer, useState } from "react";
import { initialState, Reducer } from "./MovieReducer";

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    let res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=14b93aff8c1d147576bf44592b5f479a&language=zh-TW&page=1`
    );
    let data = await res.json();

    dispatch({
      type: "FETCHDATA",
      payload: { movie: data.results },
    });
  };

  const value = {
    movies: state.movies,
    fetchData,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
