const SearchMovie = (props) => {
    return (
        <div>
            <input value={props.value}
                   onChange={(event) =>
                       props.setTerm(event.target.value)
                   }
                   type="text"
                   placeholder="Search movie..."
            />
        </div>
    );
}

export default SearchMovie;