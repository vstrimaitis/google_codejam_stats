import React from "react";
import { withStyles, WithStyles, Grid } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { Task, RoundInfo } from "../model/RoundInfo";
import { TaskCard } from "./TaskCard";
import { sortByTotalValue } from "../utils/task";

interface TaskGridProps extends WithStyles<typeof mainStyles> {
    tasks: Task[];
    roundInfo: RoundInfo;
}

export const TaskGrid = withStyles(mainStyles, { withTheme: true })((props: TaskGridProps) =>
    <Grid container spacing={2}>
        {sortByTotalValue(props.tasks).map(task =>
            <Grid item xs={12} sm={4} md={3} lg={2} key={task.id}>
                <TaskCard task={task} roundInfo={props.roundInfo} />
            </Grid>
        )}
    </Grid>
);