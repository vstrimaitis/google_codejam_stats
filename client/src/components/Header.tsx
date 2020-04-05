import { AppBar, IconButton, Toolbar, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import { mainStyles } from "../styles/main";
import { Github } from "./icons/Github";

interface HeaderProps extends WithStyles<typeof mainStyles> {
    onDrawerToggle: () => void;
}

const formatLastUpdateDate = () => {
    const d = new Date(document.lastModified);
    return "v" +
        d.getUTCFullYear().toString().padStart(4, "0") +
        (d.getUTCMonth() + 1).toString().padStart(2, "0") +
        d.getUTCDate().toString().padStart(2, "0") +
        "." +
        d.getUTCHours().toString().padStart(2, "0") +
        d.getUTCMinutes().toString().padStart(2, "0");
}

export const Header = withStyles(mainStyles)(({ classes, onDrawerToggle }: HeaderProps) => (
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
            <div style={{ flexGrow: 1 }}>
                <Typography variant="h6" color="inherit" noWrap>
                    Google Code Jam Stats
                </Typography>
                <Typography variant="caption" color="inherit" noWrap>
                    {formatLastUpdateDate()}
                </Typography>
            </div>
            <IconButton
                component="a"
                title="GitHub"
                color="inherit"
                href="https://github.com/vstrimaitis/google_codejam_stats"
                target="_blank"
            >
                <Github />
            </IconButton>
        </Toolbar>
    </AppBar >
));