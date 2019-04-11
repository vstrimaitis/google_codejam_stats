import { CircularProgress, Grid, Icon, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, WithStyles, withStyles, WithTheme } from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { QualificationType, Round } from "../model/Round";
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
            const qualification = this.props.round ? this.props.round.qualification : undefined;
            const maxScore = getMaxScore(roundInfo);
            const maxEntries = 10;
            const groupsByParticipants = getNumberOfParticipantsByCountry(results, maxEntries);
            const groupsByAverageScore = getAverageScoreByCountry(results, maxEntries);
            const groupsByTopScorers = getNumberOfParticipantsWithScoreByCountry(results, maxScore, maxEntries);
            const groupsByScore = groupByScore(results, 0, maxScore);
            console.log(groupsByScore);
            console.log(qualification);
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
                            label="number of participants"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GroupedBarChart
                            data={groupsByAverageScore}
                            title={`Top ${groupsByAverageScore.size} countries by average score`}
                            label="average score"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GroupedBarChart
                            data={groupsByTopScorers}
                            title={`Top ${groupsByTopScorers.size} countries with the most top-scorers`}
                            label="number of top-scorers"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                                    text: "Score distribution"
                                },
                                legend: {
                                    display: false
                                }
                            }}
                            data={{
                                labels: Array.from(groupsByScore.keys()),
                                datasets:[
                                    {
                                        label: "number of participants",
                                        backgroundColor: this.props.theme.palette.primary.light,
                                        hoverBackgroundColor: this.props.theme.palette.secondary.light,
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
                                        { qualification && qualification.type !== QualificationType.NONE
                                        ? <TableCell>Qualified</TableCell>
                                        : null
                                        }
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
                                                { qualification
                                                ? qualification.type === QualificationType.RANK
                                                ? <TableCell><Icon>{result.rank <= qualification.threshold ? <Check /> : <Clear/>}</Icon></TableCell>
                                                : qualification.type === QualificationType.SCORE
                                                ? <TableCell><Icon>{result.score1 >= qualification.threshold ? <Check/> : <Clear/>}</Icon></TableCell>
                                                : null
                                                : null
                                                }
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