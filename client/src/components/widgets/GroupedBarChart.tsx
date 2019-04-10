import React from "react";
import { WithTheme, WithStyles, withStyles } from "@material-ui/core";
import { mainStyles } from "../../styles/main";
import { HorizontalBar } from "react-chartjs-2";

interface GroupedBarChartProps extends WithStyles<typeof mainStyles>, WithTheme {
    data: Map<string, number>;
    title: string;
}

export const GroupedBarChart = withStyles(mainStyles, {withTheme: true})(({data, title, theme}: GroupedBarChartProps) => (
    <HorizontalBar
        options={{
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }}
        data={{
            labels: Array.from(data.keys()),
            datasets:[
                {
                    label: title,
                    backgroundColor: theme.palette.primary.light,
                    borderColor: theme.palette.primary.dark,
                    borderWidth: 1,
                    hoverBackgroundColor: theme.palette.secondary.light,
                    hoverBorderColor: theme.palette.secondary.dark,
                    data: Array.from(data.values())
                }
            ]
        }}
    />
));