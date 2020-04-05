import React, { Component } from "react";
import { MainView } from "./views/MainView";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { pink, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: "light"
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline />
                    <MainView />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default App;
