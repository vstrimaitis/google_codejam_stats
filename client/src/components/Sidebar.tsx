import { CircularProgress, Drawer, Hidden, List, ListItem, ListItemText, WithStyles, withStyles, WithTheme, Badge, Typography, Tooltip, Collapse, Theme, createStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Round } from "../model/Round";
import { mainStyles } from "../styles/main";
import { Header } from "./Header";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "typescript-array-extensions";

const styles = (theme: Theme) => createStyles({
    ...mainStyles(theme),
    nested: {
        paddingLeft: theme.spacing(4)
    }
});

interface SidebarProps extends WithStyles<typeof styles>, WithTheme {
    isLoading: boolean;
    rounds: Round[];
    onRoundClicked: (round: Round) => void;
}

interface SidebarState {
    isDrawerOpen: boolean;
    openYear: number | undefined
}

export const Sidebar = withStyles(styles, { withTheme: true })(class extends Component<SidebarProps, SidebarState> {
    state: SidebarState = {
        isDrawerOpen: false,
        openYear: undefined
    }

    handleYearClick = (clickedYear: number) =>
        this.setState({ openYear: this.state.openYear === clickedYear ? undefined : clickedYear });

    renderOfficialRoundLink = (toggleDrawer: boolean, round: Round) => (
        <ListItem key={round.id} button className={this.props.classes.nested}>
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
        <Tooltip title="Results are not official yet" placement="right" key={round.id}>
            <ListItem key={round.id} button className={this.props.classes.nested}>
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
        const { classes, isLoading, rounds } = this.props;
        return (
            isLoading
                ? <CircularProgress className={classes.progress} />
                :
                <List>
                    {Array.from(rounds.groupBy(x => x.year).entries())
                        .map(x =>
                            <>
                                <ListItem button onClick={() => this.handleYearClick(x[0])}>
                                    <ListItemText primary={x[0]} />
                                    {this.state.openYear === x[0] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={this.state.openYear === x[0]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            x[1].map(round =>
                                                round.areResultsOfficial
                                                    ? this.renderOfficialRoundLink(toggleDrawer, round)
                                                    : this.renderUnofficialRoundLink(toggleDrawer,
                                                        round)
                                            )
                                        }
                                    </List>
                                </Collapse>
                            </>
                        )
                    }
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