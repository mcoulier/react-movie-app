import React, { useState, useEffect } from "react";
import { GridList } from '@material-ui/core'
import SearchMovie from "./SearchMovie";
import Movie from "./Movie";

function MovieList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [movieId, setMovieId] = useState();

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=64c042be`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.Search) {
                        setMovies(result.Search)
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [searchValue]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <SearchMovie className="searchMovie" setTerm={setSearchValue} value={searchValue} />
                {
                    !movieId ?
                        <GridList cellHeight={444} cellWidth={444} cols={2}>
                            {movies && movies.map(movie => (
                                <li key={movie.imdbID}>
                                    <img className="imageList" onClick={() => {
                                        setMovieId(movie.imdbID);
                                    }} src={movie.Poster} alt="movie poster" />
                                </li>
                            ))}
                        </GridList> :
                        <Movie movieId={movieId} />
                }
            </div>
        );
    }
}

export default MovieList;