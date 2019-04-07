import { Theme, createStyles } from "@material-ui/core";

const drawerWidth = 240;
export const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    progress: {
        margin: theme.spacing.unit*2,
        alignSelf: "center"
    }
});