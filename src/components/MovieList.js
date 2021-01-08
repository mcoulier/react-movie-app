import React, {useState, useEffect} from "react";
import SearchMovie from "./SearchMovie";
import Movie from "./Movie";

function MovieList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    const [userSearchValue, setUserSearchValue] = useState("");
    const [movieId, setMovieId] = useState();

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?s=${userSearchValue}&apikey=64c042be`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.Search) {
                        setMovies(result.Search)
                        console.log(movieId);

                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [userSearchValue]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <SearchMovie setTerm={setUserSearchValue} value={userSearchValue}/>
                {!movieId ?
                <ul>
                    {movies && movies.map(movie => (
                        //make onclick a function
                        <li key={movie.imdbID}>
                            <img onClick={() => {
                                setMovieId(movie.imdbID);
                            }} src={movie.Poster} alt="movie poster"/>{movie.Title}<br/>
                        </li>
                    ))}
                </ul>:
                <Movie movieId={movieId}/>
                }
            </div>
        );
    }
}

export default MovieList;