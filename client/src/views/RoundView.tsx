import React, { Component } from "react";
import { RouteProps, RouteComponentProps } from "react-router";
import { RoundInfo } from "../model/RoundInfo";
import { RoundResult } from "../model/RoundResult";
import { fetchRoundInfo, fetchRoundResults } from "../utils/api";

export interface RoundViewState {
    roundInfo?: RoundInfo;
    roundResults: RoundResult[];
    isLoading: boolean;
}

export class RoundView extends Component<RouteComponentProps<{ id: string }>, RoundViewState> {
    state: RoundViewState = {
        roundInfo: undefined,
        roundResults: [],
        isLoading: true
    }

    async componentDidMount() {
        const roundId = this.props.match.params.id;
        const roundInfoPromise = fetchRoundInfo(roundId);
        const roundResultsPromise = fetchRoundResults(roundId);
        const [info, results] = await Promise.all([roundInfoPromise, roundResultsPromise]);
        this.setState({
            roundInfo: info,
            roundResults: results,
            isLoading: false
        });
    }

    renderLoading() {
        return <div>Loading...</div>;
    }

    render() {
        const { roundInfo, roundResults } = this.state;
        if (this.state.isLoading || !roundInfo) return this.renderLoading();
        return (
            <div>
                {roundInfo.challenge.additionalInfo}
            </div>
        );
    }
}