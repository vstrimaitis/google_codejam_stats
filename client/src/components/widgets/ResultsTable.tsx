import React from "react";
import { mainStyles } from "../../styles/main";
import { WithStyles, WithTheme, withStyles, Paper, Icon, Link } from "@material-ui/core";
import { isQualificationEnabled, didQualify } from "../../utils/stats";
import { RoundResult } from "../../model/RoundResult";
import { RoundQualification, Round } from "../../model/Round";
import { Check, Clear } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import CodeIcon from '@material-ui/icons/Code';
import b64url from "base64url";

interface ResultsTableProps extends WithStyles<typeof mainStyles>, WithTheme {
    results: RoundResult[];
    round: Round;
    showCountry: boolean;
}

const buildRowData = (result: RoundResult, showCountry: boolean, round: Round) =>
    [
        result.rank,
        showCountry ? result.country : null,
        result.displayname,
        result.score1,
        <Link
            target="_blank"
            href={`https://codingcompetitions.withgoogle.com/codejam/submissions/${round.id}/${b64url.encode(result.displayname)}`}>
            <CodeIcon />
        </Link>,
        isQualificationEnabled(round.qualification)
            ? didQualify(result, round.qualification)
                ? <Icon><Check /></Icon> as any
                : <Icon><Clear /></Icon> as any
            : null
    ].filter(r => r != null);

const buildColumnHeadersList = (showCountry: boolean, round: Round) =>
    [
        "Rank",
        showCountry ? "Country" : null,
        "Username",
        "Score",
        "Solutions",
        isQualificationEnabled(round.qualification)
            ? { name: "qualified", label: "Qualified", options: { filter: false, sort: false, searchable: false, download: false } }
            : null
    ].filter(r => r != null) as any

export const ResultsTable = withStyles(mainStyles, { withTheme: true })(
    ({ classes, round, results, showCountry }: ResultsTableProps) => (
        <Paper className={classes.tableRoot}>
            <MUIDataTable
                title="Scoreboard"
                data={
                    results.sort((a, b) => a.rank - b.rank)
                        .map((result, i) =>
                            buildRowData(result, showCountry, round)
                        )
                }
                columns={buildColumnHeadersList(showCountry, round)}
                options={{
                    print: false,
                    rowsPerPageOptions: [10, 25, 50, 100, 500],
                    rowsPerPage: 50,
                    responsive: "scrollMaxHeight",
                    filter: false,
                    selectableRows: "none",
                    viewColumns: false
                }}
            />
        </Paper>
    )
);