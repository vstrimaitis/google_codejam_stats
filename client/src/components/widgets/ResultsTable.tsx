import React from "react";
import { mainStyles } from "../../styles/main";
import { WithStyles, WithTheme, withStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody, Icon } from "@material-ui/core";
import { isQualificationEnabled, didQualify } from "../../utils/stats";
import { RoundResult } from "../../model/RoundResult";
import { RoundQualification } from "../../model/Round";
import { Check, Clear } from "@material-ui/icons";

interface ResultsTableProps extends WithStyles<typeof mainStyles>, WithTheme {
    results: RoundResult[];
    qualification?: RoundQualification;
}

export const ResultsTable = withStyles(mainStyles, { withTheme: true })(
    ({ classes, qualification, results }: ResultsTableProps) => (
        <Paper className={classes.tableRoot}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Score</TableCell>
                        {isQualificationEnabled(qualification)
                            ? <TableCell>Qualified</TableCell>
                            : null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results
                        .sort((a, b) => a.rank - b.rank)
                        .map((result, i) =>
                            <TableRow key={i}>
                                <TableCell>{result.rank}</TableCell>
                                <TableCell>{result.displayname}</TableCell>
                                <TableCell>{result.score1}</TableCell>
                                {isQualificationEnabled(qualification)
                                    ? didQualify(result, qualification)
                                        ? <TableCell><Icon><Check /></Icon></TableCell>
                                        : <TableCell><Icon><Clear /></Icon></TableCell>
                                    : null
                                }
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </Paper>
    )
);