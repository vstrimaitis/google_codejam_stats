import React, { Component } from "react";
import { Round } from "./model/Round";
import { fetchConfig } from "./utils/api";
import { Switch, Route } from "react-router";
import { MainView } from "./components/views/MainView";
import { HashRouter } from "react-router-dom";
import { RoundView } from "./components/views/RoundView";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={MainView} />
                    <Route path="/round/:id" component={RoundView} />
                </Switch>
            </HashRouter>
        )
    }
}

export default App;
