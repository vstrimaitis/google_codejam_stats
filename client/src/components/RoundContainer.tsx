import { CircularProgress, Grid, Typography, WithStyles, withStyles, WithTheme } from "@material-ui/core";
import React, { useState, FunctionComponent, useEffect } from "react";
import { Round } from "../model/Round";
import { RoundInfo } from "../model/RoundInfo";
import { RoundResult } from "../model/RoundResult";
import { mainStyles } from "../styles/main";
import { fetchRoundInfo, fetchRoundResults } from "../utils/api";
import { GlobalResultsGrid } from "./GlobalResultsGrid";
import { CountryResultsGrid } from "./CountryResultsGrid";
import { CountrySelect } from "./CountrySelect";
import { TaskGrid } from "./TaskGrid";

interface RoundContainerProps extends WithStyles<typeof mainStyles>, WithTheme {
    round?: Round;
}

const RoundContainerComponent: FunctionComponent<RoundContainerProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [roundInfo, setRoundInfo] = useState<RoundInfo | undefined>(undefined);
    const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        async function setup() {
            if (!props.round) {
                setIsLoading(false);
                setRoundInfo(undefined);
                setRoundResults([]);
                return;
            }
            setIsLoading(true);
            const roundId = props.round.id;
            const info = await fetchRoundInfo(roundId);
            const results = await fetchRoundResults(roundId);
            console.log(info, results);
            setIsLoading(false);
            setRoundInfo(info);
            setRoundResults(results);
        }
        setup();
    }, [props.round]);

    const renderHelp = () => (
        <Typography paragraph>
            Please select a round from the side menu.
        </Typography>
    );

    const renderStats = () => {
        if (!props.round || !roundInfo) {
            return null;
        }
        const country = selectedCountry;
        let results = roundResults;
        if (country !== undefined) {
            results = results.filter(r => r.country.toUpperCase() === country.toUpperCase());
        }
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom>
                        Problems
                    </Typography>
                    <TaskGrid
                        tasks={roundInfo?.challenge.tasks || []}
                        roundInfo={roundInfo}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom>
                        Country stats
                    </Typography>
                    <CountrySelect
                        selectedCountry={selectedCountry}
                        onSelectionChanged={setSelectedCountry}
                    />
                </Grid>
                <Grid item xs={12}>
                    {!selectedCountry
                        ? <GlobalResultsGrid round={props.round} roundInfo={roundInfo} results={results} />
                        : <CountryResultsGrid round={props.round} roundInfo={roundInfo} results={results} />
                    }
                </Grid>
            </Grid>
        );
    };

    return (
        <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            {isLoading
                ? <CircularProgress className={props.classes.progress} color="secondary" />
                : !roundInfo
                    ? renderHelp()
                    : renderStats()
            }
        </main>
    )
}

export const RoundContainer = withStyles(mainStyles, { withTheme: true })(RoundContainerComponent);
