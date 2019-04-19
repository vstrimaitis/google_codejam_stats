import { withStyles, WithStyles } from "@material-ui/core";
import React, { Component } from "react";
import { RoundContainer } from "../components/RoundContainer";
import { Sidebar } from "../components/Sidebar";
import { Round } from "../model/Round";
import { fetchConfig } from "../utils/api";
import { mainStyles } from "../styles/main";

interface MainViewState {
    rounds: Round[];
    isLoading: boolean;
    selectedRound?: Round;
}

interface MainViewProps extends WithStyles<typeof mainStyles> { }

export const MainView = withStyles(mainStyles)(class extends Component<MainViewProps, MainViewState> {
    state: MainViewState = {
        rounds: [],
        isLoading: true
    };

    async componentDidMount() {
        const config = await fetchConfig();
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.setState({
            rounds: config.rounds,
            isLoading: false
        });
    }

    render() {
        const { isLoading, rounds, selectedRound } = this.state;
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Sidebar
                    {...this.props}
                    isLoading={isLoading}
                    rounds={rounds}
                    onRoundClicked={round => this.setState({ selectedRound: round })}
                />
                <RoundContainer
                    {...this.props}
                    round={selectedRound}
                />
            </div>
        );
    }
});
