import { withStyles, WithStyles } from "@material-ui/core";
import React, { FunctionComponent, useState, useEffect } from "react";
import { RoundContainer } from "../components/RoundContainer";
import { Sidebar } from "../components/Sidebar";
import { Round } from "../model/Round";
import { fetchConfig } from "../utils/api";
import { mainStyles } from "../styles/main";

interface MainViewProps extends WithStyles<typeof mainStyles> { }

const MainViewComponent: FunctionComponent<MainViewProps> = (props) => {
    const classes = props.classes;
    const [rounds, setRounds] = useState<Round[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRound, setSelectedRound] = useState<Round | undefined>(undefined);

    useEffect(() => {
        async function setup() {
            const config = await fetchConfig();
            await new Promise(resolve => setTimeout(resolve, 1000));
            setRounds(config.rounds);
            setIsLoading(false);
        }
        setup();
    }, []);

    return (
        <div className={classes.root}>
            <Sidebar
                {...props}
                isLoading={isLoading}
                rounds={rounds}
                onRoundClicked={setSelectedRound}
            />
            <RoundContainer
                {...props}
                round={selectedRound}
            />
        </div>
    );
}

export const MainView = withStyles(mainStyles)(MainViewComponent);
