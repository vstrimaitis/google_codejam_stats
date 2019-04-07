import React, { Component } from "react";
import { Round } from "./model/Round";
import { fetchConfig } from "./utils/api";
import { Switch, Route } from "react-router";
import { MainView } from "./views/MainView";
import { HashRouter } from "react-router-dom";
import { RoundView } from "./views/RoundView";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { pink, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: "light"
    },
    typography: {
        useNextVariants: true
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
