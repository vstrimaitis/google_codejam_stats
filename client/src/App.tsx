import React from "react";
import { MainView } from "./views/MainView";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { pink, indigo } from "@material-ui/core/colors";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';


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
            <QueryParamProvider ReactRouterRoute={Route}>
                <React.Fragment>
                    <CssBaseline />
                    <Switch>
                        <Route path="/:roundId?" children={<MainView />} />
                    </Switch>
                </React.Fragment>
            </QueryParamProvider>
        </Router>
    </MuiThemeProvider>
);

export default App;
