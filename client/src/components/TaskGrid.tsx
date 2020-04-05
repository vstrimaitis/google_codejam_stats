import React from "react";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { Task, RoundInfo } from "../model/RoundInfo";
import { TaskCard } from "./TaskCard";
import { sortByTotalValue } from "../utils/task";

const styles = (theme: Theme) => createStyles({
    ...mainStyles,
    taskContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridGap: "15px"
    }
});

interface TaskGridProps extends WithStyles<typeof styles> {
    tasks: Task[];
    roundInfo: RoundInfo;
}

export const TaskGrid = withStyles(styles, { withTheme: true })((props: TaskGridProps) =>
    <div className={props.classes.taskContainer}>
        {sortByTotalValue(props.tasks).map(task =>
            <div key={task.id}>
                <TaskCard task={task} roundInfo={props.roundInfo} />
            </div>
        )}
    </div>
);