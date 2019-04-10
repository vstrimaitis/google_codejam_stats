import { createStyles, Theme } from "@material-ui/core";

const drawerWidth = 240;
export const mainStyles = (theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        display: "flex",
        flexDirection: "column",
        overflowX: "auto"
    },
    toolbar: theme.mixins.toolbar,
    progress: {
        margin: theme.spacing.unit*2,
        alignSelf: "center"
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
        display: "none",
        },
    },
    tableRoot: {
        overflowX: "auto"
    }
});