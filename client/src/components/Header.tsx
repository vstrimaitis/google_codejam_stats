import React from "react";
import { WithStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { styles } from "../views/MainStyles";

interface HeaderProps extends WithStyles<typeof styles> {}

export const Header = ({classes}: HeaderProps) => (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                Google Code Jam Statistics
            </Typography>
        </Toolbar>
    </AppBar>
);