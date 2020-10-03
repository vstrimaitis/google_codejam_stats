import { withStyles, WithStyles } from "@material-ui/core";
import React, { FunctionComponent, useState, useEffect } from "react";
import { RoundContainer } from "../components/RoundContainer";
import { Sidebar } from "../components/Sidebar";
import { Round } from "../model/Round";
import { fetchConfig } from "../utils/api";
import { mainStyles } from "../styles/main";
import { useParams } from 'react-router-dom'

interface PathParams {
    roundId: string;
}

interface MainViewProps extends WithStyles<typeof mainStyles> { }

const MainViewComponent: FunctionComponent<MainViewProps> = (props) => {
    const classes = props.classes;
    const { roundId } = useParams<PathParams>();
    const [rounds, setRounds] = useState<Round[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRound, setSelectedRound] = useState<Round | undefined>(undefined);

    const selectRound = (rounds: Round[], roundId?: string) => {
        const round = roundId ? rounds.filter(x => x.id === roundId)[0] : undefined;
        setSelectedRound(round);
    };

    useEffect(() => {
        async function setup() {
            const config = await fetchConfig();
            await new Promise(resolve => setTimeout(resolve, 1000));
            setRounds(config.rounds);
            setIsLoading(false);
        }
        setup();
    }, []);

    useEffect(() => selectRound(rounds, roundId), [roundId, rounds]);

    return (
        <div className={classes.root}>
            <Sidebar
                {...props}
                isLoading={isLoading}
                rounds={rounds}
                openYear={selectedRound?.year}
            />
            <RoundContainer
                {...props}
                round={selectedRound}
            />
        </div>
    );
}

export const MainView = withStyles(mainStyles)(MainViewComponent);
