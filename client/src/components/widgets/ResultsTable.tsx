import React from "react";
import { mainStyles } from "../../styles/main";
import { WithStyles, WithTheme, withStyles, Paper, Icon } from "@material-ui/core";
import { isQualificationEnabled, didQualify } from "../../utils/stats";
import { RoundResult } from "../../model/RoundResult";
import { RoundQualification } from "../../model/Round";
import { Check, Clear } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

interface ResultsTableProps extends WithStyles<typeof mainStyles>, WithTheme {
    results: RoundResult[];
    qualification?: RoundQualification;
    showCountry: boolean;
}

const buildRowData = (result: RoundResult, showCountry: boolean, qualification?: RoundQualification) =>
    [
        result.rank,
        showCountry ? result.country : null,
        result.displayname,
        result.score1,
        isQualificationEnabled(qualification)
            ? didQualify(result, qualification)
                ? <Icon><Check /></Icon> as any
                : <Icon><Clear /></Icon> as any
            : null
    ].filter(r => r != null);

const buildColumnHeadersList = (showCountry: boolean, qualification?: RoundQualification) =>
    [
        "Rank",
        showCountry ? "Country" : null,
        "Username",
        "Score",
        isQualificationEnabled(qualification)
            ? { name: "qualified", label: "Qualified", options: { filter: false, sort: false, searchable: false, download: false } }
            : null
    ].filter(r => r != null) as any

export const ResultsTable = withStyles(mainStyles, { withTheme: true })(
    ({ classes, qualification, results, showCountry }: ResultsTableProps) => (
        <Paper className={classes.tableRoot}>
            <MUIDataTable
                title="Scoreboard"
                data={
                    results.sort((a, b) => a.rank - b.rank)
                        .map((result, i) =>
                            buildRowData(result, showCountry, qualification)
                        )
                }
                columns={buildColumnHeadersList(showCountry, qualification)}
                options={{
                    print: false,
                    rowsPerPageOptions: [10, 25, 50, 100, 500],
                    rowsPerPage: 50,
                    responsive: "scroll",
                    filter: false,
                    selectableRows: false,
                    viewColumns: false
                }}
            />
        </Paper>
    )
);