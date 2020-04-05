import React from "react";
import { withStyles, WithStyles, WithTheme, Grid } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { RoundResult } from "../model/RoundResult";
import { Round } from "../model/Round";
import { RoundInfo } from "../model/RoundInfo";
import { getMaxScore, getNumberOfParticipantsByCountry, getAverageScoreByCountry, getNumberOfParticipantsWithScoreByCountry, groupByScore, getParticipantsWithScore, getTotalSubmissions, getParticipantsWithAtLeastOneSolved } from "../utils/stats";
import { NumberStatistic } from "./widgets/NumberStatistic";
import { ResultsTable } from "./widgets/ResultsTable";
import { BarChartType, BarChart } from "./widgets/BarChart";

interface GlobalResultsGridProps extends WithStyles<typeof mainStyles>, WithTheme {
    results: RoundResult[];
    round: Round;
    roundInfo: RoundInfo;
}

export const GlobalResultsGrid = withStyles(mainStyles, { withTheme: true })(
    ({ results, round, roundInfo }: GlobalResultsGridProps) => {
        const maxScore = getMaxScore(roundInfo);
        const maxEntries = 10;
        const groupsByParticipants = getNumberOfParticipantsByCountry(results, maxEntries);
        const groupsByAverageScore = getAverageScoreByCountry(results, maxEntries);
        const groupsByTopScorers = getNumberOfParticipantsWithScoreByCountry(results, maxScore, maxEntries);
        const groupsByScore = groupByScore(results, 0, maxScore);
        return (
            <Grid container spacing={2}>
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
                    <BarChart
                        type={BarChartType.HORIZONTAL}
                        data={groupsByParticipants}
                        title={`Number of participants per country (top ${groupsByParticipants.size})`}
                        label="number of participants"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BarChart
                        type={BarChartType.HORIZONTAL}
                        data={groupsByAverageScore}
                        title={`Top ${groupsByAverageScore.size} countries by average score`}
                        label="average score"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BarChart
                        type={BarChartType.HORIZONTAL}
                        data={groupsByTopScorers}
                        title={`Top ${groupsByTopScorers.size} countries with the most top-scorers`}
                        label="number of top-scorers"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BarChart
                        type={BarChartType.VERTICAL}
                        data={groupsByScore}
                        title="Score distribution"
                        label="number of participants"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ResultsTable
                        results={results}
                        round={round}
                        showCountry={true}
                    />
                </Grid>
            </Grid>
        );
    }
);