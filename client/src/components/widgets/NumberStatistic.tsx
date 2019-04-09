import React from "react";
import { withStyles, WithStyles, Theme, createStyles, Card, CardContent, Typography } from "@material-ui/core";
import { mainStyles } from "../../styles/main";

const styles = (theme: Theme) => createStyles({
    ...mainStyles,
    card: {
        textAlign: "center"
    }
});

interface NumberStatisticProps extends WithStyles<typeof styles> {
    number: number;
    label: string;
}

export const NumberStatistic = withStyles(styles)(
    ({number, label, classes}: NumberStatisticProps) => (
        <Card>
            <CardContent className={classes.card}>
                <Typography variant="h2">
                    {number}
                </Typography>
                <Typography color="textSecondary">
                    {label}
                </Typography>
            </CardContent>
        </Card>
    )
);