import { useState, useEffect } from "react";

const Movie = (props) => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?i=${props.movieId}&apikey=64c042be`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        setMovie(result);
                    }
                }
            )
    }, [props.movieId]);

    return (
        <div className="movieDetail">
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt="movie poster" />
            <ul>
                <li>Genre: {movie.Genre}</li>
                <li>Director: {movie.Director}</li>
                <li>IMDb Rating: {movie.imdbRating}</li>
                <li>Released: {movie.Released}</li>
            </ul>
        </div>
    );
}

export default Movie;