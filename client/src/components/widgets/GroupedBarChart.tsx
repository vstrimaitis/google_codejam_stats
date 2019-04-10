import { WithStyles, withStyles, WithTheme } from "@material-ui/core";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { mainStyles } from "../../styles/main";

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
            },
            title: { 
                display: true,
                text: title
            },
            legend: {
                display: false
            }
        }}
        data={{
            labels: Array.from(data.keys()),
            datasets:[
                {
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