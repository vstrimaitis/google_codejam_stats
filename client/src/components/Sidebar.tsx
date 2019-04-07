import React from "react";
import { Round } from "../model/Round";
import { StyledComponentProps, Drawer, List, ListItem, ListItemText, WithStyles, CircularProgress } from "@material-ui/core";
import { styles } from "../views/MainStyles";

interface SidebarProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    rounds: Round[];
    onRoundClicked: (round: Round) => void;
}

export const Sidebar = ({isLoading, rounds, onRoundClicked, classes}: SidebarProps) => (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper
        }}
    >
        <div className={classes.toolbar}/>
        { isLoading
        ? <CircularProgress className={classes.progress} />
        :
        <List>
            {rounds.map(round =>
                <ListItem key={round.id} button>
                    <ListItemText
                        primary={`${round.displayName} ${round.year}`}
                        onClick={() => onRoundClicked(round)}
                    />
                </ListItem>
            )}
        </List>
        }
    </Drawer>
);