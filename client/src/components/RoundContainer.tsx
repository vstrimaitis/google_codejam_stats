import { CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, WithStyles, withStyles, WithTheme } from "@material-ui/core";
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Round } from "../model/Round";
import { RoundInfo } from "../model/RoundInfo";
import { RoundResult } from "../model/RoundResult";
import { mainStyles } from "../styles/main";
import { fetchRoundInfo, fetchRoundResults } from "../utils/api";
import { getAverageScoreByCountry, getMaxScore, getNumberOfParticipantsByCountry, getNumberOfParticipantsWithScoreByCountry, getParticipantsWithAtLeastOneSolved, getParticipantsWithScore, getTotalSubmissions, groupByScore } from "../utils/stats";
import { GroupedBarChart } from "./widgets/GroupedBarChart";
import { NumberStatistic } from "./widgets/NumberStatistic";

interface RoundContainerProps extends WithStyles<typeof mainStyles>, WithTheme {
    round?: Round;
}

interface RoundContainerState {
    isLoading: boolean;
    roundInfo?: RoundInfo;
    roundResults: RoundResult[]
}

export const RoundContainer = withStyles(mainStyles, {withTheme: true})(
    class extends Component<RoundContainerProps, RoundContainerState> {
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
            const maxScore = getMaxScore(roundInfo);
            const maxEntries = 20;
            const groupsByParticipants = getNumberOfParticipantsByCountry(results, maxEntries);
            const groupsByAverageScore = getAverageScoreByCountry(results, maxEntries);
            const groupsByTopScorers = getNumberOfParticipantsWithScoreByCountry(results, maxScore, maxEntries);
            const groupsByScore = groupByScore(results, 0, maxScore);
            console.log(groupsByScore);
            return (
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6} md={3}>
                        <NumberStatistic
                            number={roundInfo.fullScoreboardSize}
                            label="participants worldwide"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NumberStatistic
                            number={getParticipantsWithScore(results, maxScore).length}
                            label="perfect scores"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NumberStatistic
                            number={getTotalSubmissions(results)}
                            label="submissions in total"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NumberStatistic
                            number={getParticipantsWithAtLeastOneSolved(results).length}
                            label="people solved at least one test set"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GroupedBarChart
                            data={groupsByParticipants}
                            title={`Number of participants per country (top ${groupsByParticipants.size})`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GroupedBarChart
                            data={groupsByAverageScore}
                            title={`Top ${groupsByAverageScore.size} countries by average score`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GroupedBarChart
                            data={groupsByTopScorers}
                            title={`Top ${groupsByTopScorers.size} countries with the most top-scorers`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <Line
                            data={{
                                labels: Array.from(groupsByScore.keys()),
                                datasets: [
                                    {
                                    label: 'Point distribution',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: this.props.theme.palette.primary.light,
                                    borderColor: this.props.theme.palette.primary.dark,
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: this.props.theme.palette.primary.dark,
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: this.props.theme.palette.secondary.light,
                                    pointHoverBorderColor: this.props.theme.palette.secondary.dark,
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: Array.from(groupsByScore.values())
                                    }
                                ]
                            }}
                        /> */}
                        <Bar
                            options={{
                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        },
                                        barPercentage: 1.0,
                                        categoryPercentage: 1.0
                                    }]
                                },
                                title: { 
                                    display: true,
                                    text: "Point distribution"
                                },
                                legend: {
                                    display: false
                                }
                            }}
                            data={{
                                labels: Array.from(groupsByScore.keys()),
                                datasets:[
                                    {
                                        labels: "Participant count",
                                        backgroundColor: this.props.theme.palette.primary.light,
                                        // borderColor: this.props.theme.palette.primary.dark,
                                        // borderWidth: 0,
                                        hoverBackgroundColor: this.props.theme.palette.secondary.light,
                                        // hoverBorderColor: this.props.theme.palette.secondary.dark,
                                        data: Array.from(groupsByScore.values())
                                    }
                                ]
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                                                <TableCell>{result.score1}</TableCell>
                                            </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            );
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
);