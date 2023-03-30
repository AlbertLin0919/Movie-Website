import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import { MovieProvider } from "./MovieContext/MovieContext";
import MovieList from "./components/movieList/MovieList";
import Movie from "./pages/movieDetail/Movie";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </MovieProvider>
    </div>
  );
}

export default App;
