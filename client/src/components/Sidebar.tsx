import { CircularProgress, Drawer, Hidden, List, ListItem, ListItemText, WithStyles, withStyles, WithTheme } from "@material-ui/core";
import React, { Component } from "react";
import { Round } from "../model/Round";
import { mainStyles } from "../styles/main";
import { Header } from "./Header";

interface SidebarProps extends WithStyles<typeof mainStyles>, WithTheme {
    isLoading: boolean;
    rounds: Round[];
    onRoundClicked: (round: Round) => void;
}

interface SidebarState {
    isDrawerOpen: boolean;
}

export const Sidebar = withStyles(mainStyles, { withTheme: true })(class extends Component<SidebarProps, SidebarState> {
    state: SidebarState = {
        isDrawerOpen: false
    }

    renderDrawer(toggleDrawer: boolean) {
        const { classes, isLoading, rounds, onRoundClicked } = this.props;
        return (
            isLoading
                ? <CircularProgress className={classes.progress} />
                :
                <List>
                    {rounds.map(round =>
                        <ListItem key={round.id} button>
                            <ListItemText
                                primary={`${round.displayName} ${round.year}`}
                                onClick={() => {
                                    if (toggleDrawer) this.handleDrawerToggle();
                                    onRoundClicked(round);
                                }}
                            />
                        </ListItem>
                    )}
                </List>
        );
    }

    handleDrawerToggle = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header onDrawerToggle={this.handleDrawerToggle} />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            className={classes.drawer}
                            variant="temporary"
                            anchor={this.props.theme.direction === "rtl" ? "right" : "left"}
                            open={this.state.isDrawerOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            {this.renderDrawer(true)}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            open
                        >
                            <div className={classes.toolbar} />
                            {this.renderDrawer(false)}
                        </Drawer>
                    </Hidden>
                </nav>
            </div>
        );
    }
});