import { TextField } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: indigo
    }
});

const SearchMovie = (props) => {
    return (
        <div className="textInput">
            <h1>Movie App</h1>
            <ThemeProvider theme={darkTheme}>
                <form noValidate autoComplete="off">
                    <TextField className="textField" id="filled" label="Search movie..." variant="filled" value={props.value}
                        onChange={(e) =>
                            props.setTerm(e.target.value)
                        }
                        type="text"
                    />
                </form>
            </ThemeProvider>
        </div>
    );
}

export default SearchMovie;