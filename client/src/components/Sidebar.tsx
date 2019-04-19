import { CircularProgress, Drawer, Hidden, List, ListItem, ListItemText, WithStyles, withStyles, WithTheme, Badge, Typography, Chip, Icon, Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import { Round } from "../model/Round";
import { mainStyles } from "../styles/main";
import { Header } from "./Header";
import { Warning } from "@material-ui/icons";

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

    renderOfficialRoundLink = (toggleDrawer: boolean, round: Round) => (
        <ListItem key={round.id} button>
            <ListItemText
                disableTypography={true}
                onClick={() => {
                    if (toggleDrawer) this.handleDrawerToggle();
                    this.props.onRoundClicked(round);
                }}
            >
                <Typography>
                    {`${round.displayName} ${round.year}`}
                </Typography>
            </ListItemText>
        </ListItem>
    );

    renderUnofficialRoundLink = (toggleDrawer: boolean, round: Round) => (
        <Tooltip title="Results are not official yet" placement="right">
            <ListItem key={round.id} button>
                <ListItemText
                    disableTypography={true}
                    onClick={() => {
                        if (toggleDrawer) this.handleDrawerToggle();
                        this.props.onRoundClicked(round);
                    }}
                >
                    <Badge variant="dot" color="secondary">
                        <Typography>
                            {`${round.displayName} ${round.year}`}
                        </Typography>
                    </Badge>
                </ListItemText>
            </ListItem>
        </Tooltip>
    );

    renderDrawer(toggleDrawer: boolean) {
        const { classes, isLoading, rounds, onRoundClicked } = this.props;
        return (
            isLoading
                ? <CircularProgress className={classes.progress} />
                :
                <List>
                    {rounds.map(round =>
                        round.areResultsOfficial
                            ? this.renderOfficialRoundLink(toggleDrawer, round)
                            : this.renderUnofficialRoundLink(toggleDrawer,
                                round)
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