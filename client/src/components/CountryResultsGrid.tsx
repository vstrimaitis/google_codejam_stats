import React from "react";
import { WithStyles, WithTheme, withStyles, Grid } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { RoundResult } from "../model/RoundResult";
import { Round } from "../model/Round";
import { RoundInfo } from "../model/RoundInfo";
import { NumberStatistic } from "./widgets/NumberStatistic";
import { getParticipantsWithScore, getParticipantsWithAtLeastOneSolved, didQualify, getMaxScore, groupByScore } from "../utils/stats";
import { Bar } from "react-chartjs-2";
import { ResultsTable } from "./widgets/ResultsTable";

interface CountryResultsGridProps extends WithStyles<typeof mainStyles>, WithTheme {
    results: RoundResult[];
    round: Round;
    roundInfo: RoundInfo;
}

export const CountryResultsGrid = withStyles(mainStyles, { withTheme: true })(
    ({ results, round, roundInfo, theme }: CountryResultsGridProps) => {
        const maxScore = getMaxScore(roundInfo);
        const maxEntries = 10;
        const groupsByScore = groupByScore(results, 0, maxScore);
        return (
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6} md={3}>
                    <NumberStatistic
                        number={results.length}
                        label="participants"
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
                        number={getParticipantsWithAtLeastOneSolved(results).length}
                        label="people solved at least one test set"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <NumberStatistic
                        number={results.filter(r => didQualify(r, round.qualification)).length}
                        label="people qualified for the next round"
                    />
                </Grid>
                <Grid item xs={12}>
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
                            datasets: [
                                {
                                    label: "number of participants",
                                    backgroundColor: theme.palette.primary.light,
                                    hoverBackgroundColor: theme.palette.secondary.light,
                                    data: Array.from(groupsByScore.values())
                                }
                            ]
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ResultsTable
                        results={results}
                        qualification={round.qualification}
                        showCountry={false}
                    />
                </Grid>
            </Grid>
        );
    }
);