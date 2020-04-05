import { CircularProgress, Grid, Typography, WithStyles, withStyles, WithTheme } from "@material-ui/core";
import React, { Component } from "react";
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

interface RoundContainerState {
    isLoading: boolean;
    roundInfo?: RoundInfo;
    roundResults: RoundResult[];
    selectedCountry?: string;
}

export const RoundContainer = withStyles(mainStyles, { withTheme: true })(
    class extends Component<RoundContainerProps, RoundContainerState> {
        state: RoundContainerState = {
            isLoading: false,
            roundInfo: undefined,
            roundResults: [],
            selectedCountry: undefined
        }

        async componentWillReceiveProps(nextProps: RoundContainerProps) {
            if (this.props === nextProps) return;
            if (!nextProps.round) {
                this.setState({ isLoading: false, roundInfo: undefined, roundResults: [] });
                return;
            }
            this.setState({ isLoading: true });
            const roundId = nextProps.round.id;
            const info = await fetchRoundInfo(roundId);
            const results = await fetchRoundResults(roundId);
            console.log(info, results);
            this.setState({ isLoading: false, roundInfo: info, roundResults: results });
        }

        renderHelp() {
            return (
                <Typography paragraph>
                    Please select a round from the side menu.
                </Typography>
            )
        }

        renderStats(roundInfo: RoundInfo, results: RoundResult[]) {
            if (!this.props.round || !this.state.roundInfo) {
                return null;
            }
            const country = this.state.selectedCountry;
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
                            tasks={this.state.roundInfo?.challenge.tasks || []}
                            roundInfo={this.state.roundInfo}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            Country stats
                        </Typography>
                        <CountrySelect
                            selectedCountry={this.state.selectedCountry}
                            onSelectionChanged={country => this.setState({ selectedCountry: country })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {!this.state.selectedCountry
                            ? <GlobalResultsGrid round={this.props.round} roundInfo={roundInfo} results={results} />
                            : <CountryResultsGrid round={this.props.round} roundInfo={roundInfo} results={results} />
                        }
                    </Grid>
                </Grid>
            )
        }

        render() {
            return (
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.toolbar} />
                    {this.state.isLoading
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