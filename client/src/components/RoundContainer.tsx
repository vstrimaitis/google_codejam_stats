import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, WithStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Round } from "../model/Round";
import { RoundInfo } from "../model/RoundInfo";
import { RoundResult } from "../model/RoundResult";
import { fetchRoundInfo, fetchRoundResults } from "../utils/api";
import { styles } from "../views/MainStyles";

interface RoundContainerProps extends WithStyles<typeof styles> {
    round?: Round;
}

interface RoundContainerState {
    isLoading: boolean;
    roundInfo?: RoundInfo;
    roundResults: RoundResult[]
}

export class RoundContainer extends Component<RoundContainerProps, RoundContainerState> {
    state: RoundContainerState = {
        isLoading: false,
        roundInfo: undefined,
        roundResults: []
    }

    async componentWillReceiveProps(nextProps: RoundContainerProps) {
        if(this.props == nextProps) return;
        if(!nextProps.round) {
            this.setState({isLoading: false, roundInfo: undefined, roundResults: []});
            return;
        }
        this.setState({isLoading: true});
        const roundId = nextProps.round.id;
        const info = await fetchRoundInfo(roundId);
        const results = await fetchRoundResults(roundId);
        console.log(info, results);
        this.setState({isLoading: false, roundInfo: info, roundResults: results});
    }

    renderHelp() {
        return (
            <Typography paragraph>
                Please select a round from the side menu.
            </Typography>
        )
    }

    renderStats(roundInfo: RoundInfo, results: RoundResult[]) {
        return (
            <div>
                <Typography paragraph>
                    {roundInfo.fullScoreboardSize} people participated in this round. Here are the results of Lithuanian participants:
                </Typography>
                <Paper className={this.props.classes.tableRoot}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results
                                .filter(x => x.country == "Lithuania")
                                .sort((a, b) => a.rank-b.rank)
                                .map((result, i) =>
                                    <TableRow key={i}>
                                        <TableCell>{result.rank}</TableCell>
                                        <TableCell>{result.displayname}</TableCell>
                                        <TableCell>{result.score_1}</TableCell>
                                    </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    render() {
        return (
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                { this.state.isLoading
                ? <CircularProgress className={this.props.classes.progress} color="secondary" />
                : !this.state.roundInfo
                ? this.renderHelp()
                : this.renderStats(this.state.roundInfo, this.state.roundResults)
                }
            </main>
        )
    }
}