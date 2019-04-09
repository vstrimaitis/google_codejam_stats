import { AppBar, IconButton, Toolbar, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import { styles } from "../views/MainStyles";

interface HeaderProps extends WithStyles<typeof styles> {
    onDrawerToggle: () => void;
}

export const Header = withStyles(styles)(({classes, onDrawerToggle}: HeaderProps) => (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                className={classes.menuButton}
            >
                <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
                Google Code Jam Statistics
            </Typography>
        </Toolbar>
    </AppBar>
));