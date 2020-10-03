import React from "react";
import { MainView } from "./views/MainView";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { pink, indigo } from "@material-ui/core/colors";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: "light"
    }
});

const App = () => (
    <MuiThemeProvider theme={theme}>
        <Router>
        <React.Fragment>
            <CssBaseline />
            <Switch>
                <Route path="/:roundId?" children={<MainView />} />
            </Switch>    
        </React.Fragment>
        </Router>
    </MuiThemeProvider>
);

export default App;
