import React from "react";
import { withStyles, Card, CardContent, Typography, WithStyles, Link, Theme, createStyles, Tooltip } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { Task, RoundInfo } from "../model/RoundInfo";
import { TaskStatsCapsule } from "./TaskStatsCapsule";

const styles = (theme: Theme) => createStyles({
    ...mainStyles,
    taskTitle: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
});

interface TaskCardProps extends WithStyles<typeof styles> {
    task: Task;
    roundInfo: RoundInfo;
}

export const TaskCard = withStyles(styles, { withTheme: true })((props: TaskCardProps) =>
    <Card>
        <CardContent>
            <Tooltip title={props.task.title} placement="top">
                <Typography variant="h6" className={props.classes.taskTitle}>
                    {props.task.title}
                </Typography>
            </Tooltip>
            <TaskStatsCapsule task={props.task} roundInfo={props.roundInfo} />
        </CardContent>
    </Card >
);