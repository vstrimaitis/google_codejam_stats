import React from "react";
import { WithStyles, WithTheme, withStyles, Grid } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { RoundResult } from "../model/RoundResult";
import { Round } from "../model/Round";
import { RoundInfo } from "../model/RoundInfo";
import { NumberStatistic } from "./widgets/NumberStatistic";
import { getParticipantsWithScore, getParticipantsWithAtLeastOneSolved, didQualify, getMaxScore, groupByScore } from "../utils/stats";
import { ResultsTable } from "./widgets/ResultsTable";
import { BarChartType, BarChart } from "./widgets/BarChart";

interface CountryResultsGridProps extends WithStyles<typeof mainStyles>, WithTheme {
    results: RoundResult[];
    round: Round;
    roundInfo: RoundInfo;
}

export const CountryResultsGrid = withStyles(mainStyles, { withTheme: true })(
    ({ results, round, roundInfo, theme }: CountryResultsGridProps) => {
        const maxScore = getMaxScore(roundInfo);
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
                        qualification={round.qualification}
                        showCountry={false}
                    />
                </Grid>
            </Grid>
        );
    }
);