import React from "react";
import { withStyles, WithStyles, Grid, createStyles, Theme, Tooltip } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { Task, RoundInfo } from "../model/RoundInfo";

const styles = (theme: Theme) => createStyles({
    ...mainStyles,
    capsule: {
        backgroundColor: "#B7B9C7",
        height: 10,
        display: "flex",
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden"
    },
    capsulePart: {
        height: "100%"
    }
});


interface Props extends WithStyles<typeof styles> {
    task: Task;
    roundInfo: RoundInfo;
}

// const gray = "#dedede";
// const red = "#c5221f";
// const blues = [
//     "#3F51B5",
//     "#6475D9",
//     "#768AFC",
//     "#8FA0FC"
// ];

const red = "#f50057";
const blues = [
    "#3F51B5",
    "#7380C9",
    "#A7AFDD",
    "#DCDFF1"
];

interface Stat {
    participantCount: number;
    participantPercentage: number;
    solvedTestSetCount: number;
    points: number;
}

const getStatText = (stat: Stat): string => {
    // N participants (p%) failed Test Set 1
    // N participants (p%) solved 1 test set for P pts
    // N participants (p%) solved K test sets for P total pts
    const N = stat.participantCount;
    const p = (stat.participantPercentage * 100).toFixed(0);
    const P = stat.points;
    const K = stat.solvedTestSetCount;
    if (K === 0) {
        return `${N} participants (${p}%) failed Test Set 1`;
    }
    if (K === 1) {
        return `${N} participants (${p}%) solved 1 test set for ${P} pts`;
    }
    return `${N} participants (${p}%) solved ${K} test sets for ${P} total pts`;
}

const calculateSolvedParts = (task: Task, roundInfo: RoundInfo): Stat[] => {
    const tests = task.tests.filter(t => t.value > 0).reverse();
    let totalValue = tests.map(t => t.value).reduce((a, s) => a + s);
    let testSetCount = tests.length;
    let countedParticipants = 0;
    return tests.map(test => {
        const participantCount = (test.numSolved || 0) - countedParticipants;
        const res = {
            participantCount,
            participantPercentage: (participantCount) / roundInfo.fullScoreboardSize,
            solvedTestSetCount: testSetCount,
            points: totalValue
        };
        testSetCount--;
        totalValue -= test.value;
        countedParticipants += participantCount;
        return res;
    }).concat([{
        participantCount: task.numAttempted - countedParticipants,
        participantPercentage: (task.numAttempted - countedParticipants) / roundInfo.fullScoreboardSize,
        solvedTestSetCount: 0,
        points: 0
    }]);
}

export const TaskStatsCapsule = withStyles(styles, { withTheme: true })((props: Props) =>
    <div className={props.classes.capsule}>
        {
            calculateSolvedParts(props.task, props.roundInfo).map((stat, i) =>
                <Tooltip placement="bottom" title={getStatText(stat)} key={i}>
                    <div
                        className={props.classes.capsulePart}
                        style={{
                            width: `${Math.max(5, stat.participantPercentage * 100)}%`,
                            backgroundColor: stat.solvedTestSetCount > 0 ? blues[i] : red
                        }}
                    />
                </Tooltip>
            ).reverse()
        }
    </div>
);