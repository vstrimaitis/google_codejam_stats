import React, { Component } from "react";
import { Round } from "../../model/Round";
import { fetchConfig } from "../../utils/api";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";

interface MainViewState {
    rounds: Round[];
    isLoading: boolean;
}

export class MainView extends Component<{}, MainViewState> {
    state: MainViewState = {
        rounds: [],
        isLoading: true
    };

    async componentDidMount() {
        const config = await fetchConfig();
        this.setState({
            rounds: config.rounds,
            isLoading: false
        });
    }

    renderLoading() {
        return <div>Loading...</div>;
    }

    render() {
        if(this.state.isLoading) return this.renderLoading();
        return (
            <div>
                <List>
                    { this.state.rounds.map(round =>
                        <ListItem button key={round.id}>
                            {/* <Link to={`round/${round.id}`}>{round.displayName}</Link> */}
                            <Link to={`round/${round.id}`}>
                                <ListItemText>
                                    {round.displayName}
                                </ListItemText>
                            </Link>
                        </ListItem>
                    )}
                </List>
                {/* <ul>
                    { this.state.rounds.map(round =>
                        <li>
                            <Link to={`round/${round.id}`}>{round.displayName}</Link>
                        </li>
                    ) }
                </ul> */}
            </div>
        );
    }
}