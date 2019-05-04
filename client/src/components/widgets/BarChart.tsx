import { WithStyles, withStyles, WithTheme } from "@material-ui/core";
import React from "react";
import { HorizontalBar, Bar } from "react-chartjs-2";
import { mainStyles } from "../../styles/main";

interface BarChartProps extends WithStyles<typeof mainStyles>, WithTheme {
    data: Map<string | number, number>;
    title: string;
    label: string;
    type: BarChartType;
}

export enum BarChartType {
    VERTICAL,
    HORIZONTAL
};

const renderHorizontal = ({ data, title, label, theme }: BarChartProps) => (
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
            datasets: [
                {
                    label,
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
);

const renderVertical = ({ data, title, label, theme }: BarChartProps) => (
    <Bar
        options={{
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    barPercentage: 1.0,
                    categoryPercentage: 1.0
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
            datasets: [
                {
                    label: label,
                    backgroundColor: theme.palette.primary.light,
                    hoverBackgroundColor: theme.palette.secondary.light,
                    data: Array.from(data.values())
                }
            ]
        }}
    />
);

export const BarChart = withStyles(mainStyles, { withTheme: true })(
    (props: BarChartProps) => (
        props.type == BarChartType.HORIZONTAL
            ? renderHorizontal(props)
            : renderVertical(props)
    ));