import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

import AddMovies from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // const response = await fetch("https://swapi.dev/api/films/");
      const response = await fetch(
        "https://react-practice-http-945c2-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data, "datadata");
      // let transformedMovies = data.results.map((moviesData, index) => {
      //   return {
      //     id: moviesData.episode_id,
      //     title: moviesData.title,
      //     releaseDate: moviesData.release_date,
      //     openingText: moviesData.opening_crawl,
      //   };
      // });

      const transformedMovies = [];
      for (const key in data) {
        console.log(key, "KEy");
        transformedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      console.log(transformedMovies, "transformedMovies");

      // let transformedMovies = data.map((moviesData, index) => {
      //   console.log(moviesData);
      //   return {
      //     id: moviesData.episode_id,
      //     title: moviesData.title,
      //     releaseDate: moviesData.release_date,
      //     openingText: moviesData.opening_crawl,
      //   };
      // });

      console.log(data.results);
      setMovies(transformedMovies);
      // setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsLoading(false);

    // ---------OR--------

    // fetch("https://swapi.dev/api/films/")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     let transformedMovies = data.results.map((moviesData, index) => {
    //       return {
    //         id: moviesData.episode_id,
    //         title: moviesData.title,
    //         releaseDate: moviesData.release_date,
    //         openingText: moviesData.opening_crawl,
    //       };
    //     });
    //     console.log(data.resulAddMoviests);
    //     setMovies(transformedMovies);
    //   })
    //   .catch();
  }, []);

  const addMoviesHandler = async (movie) => {
    const response = await fetch(
      "https://react-practice-http-945c2-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data, "DATATAAA");
  };

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMoviesHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && !error && (
          <MoviesList movies={movies} />
        )}
        {!isLoading && movies.length === 0 && !error && <p>Movies not found</p>}
        {isLoading && <span>Loading...</span>}
        {!isLoading && error && <span>{error}</span>}
      </section>
    </React.Fragment>
  );
}

export default App;
