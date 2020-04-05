import React from "react";
import { withStyles, Card, CardContent, Typography, WithStyles, Link, Theme, createStyles, Tooltip } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { Task, RoundInfo } from "../model/RoundInfo";
import { TaskStatsCapsule } from "./TaskStatsCapsule";
import LaunchIcon from '@material-ui/icons/Launch';

const styles = (theme: Theme) => createStyles({
    ...mainStyles,
    taskTitle: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    titleContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    pointsContainer: {
        marginBottom: 10
    }
});

interface TaskCardProps extends WithStyles<typeof styles> {
    task: Task;
    roundInfo: RoundInfo;
}

const renderPoints = (task: Task): string =>
    task.tests.filter(t => t.value > 0).map(t => `${t.value} pts`).join(", ");

export const TaskCard = withStyles(styles, { withTheme: true })((props: TaskCardProps) =>
    <Card>
        <CardContent>
            <div className={props.classes.titleContainer}>
                <Tooltip title={props.task.title} placement="top">
                    <Typography variant="h6" className={props.classes.taskTitle}>
                        {props.task.title}
                    </Typography>
                </Tooltip>
                <Link target="_blank" href={`https://codingcompetitions.withgoogle.com/codejam/round/${props.roundInfo.challenge.id}/${props.task.id}`}>
                    <LaunchIcon fontSize="small" />
                </Link>
            </div>
            <div className={props.classes.pointsContainer}>
                <Typography variant="caption">{renderPoints(props.task)}</Typography>
            </div>
            <TaskStatsCapsule task={props.task} roundInfo={props.roundInfo} />
        </CardContent>
    </Card >
);