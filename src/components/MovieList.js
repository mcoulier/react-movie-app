import React, {useState, useEffect} from "react";
import SearchMovie from "./SearchMovie";

function MovieList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    const [userSearchValue, setUserSearchValue] = useState("");

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?s=${userSearchValue}&y=2020&apikey=64c042be`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMovies(result.Search);
                    if (result.Search) {
                        setMovies(result.Search)
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
                <ul>
                    {movies && movies.map(movie => (
                        <li key={movie.imdbID}><img src={movie.Poster} alt="movie poster"/>{movie.Title}<br/></li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default MovieList;