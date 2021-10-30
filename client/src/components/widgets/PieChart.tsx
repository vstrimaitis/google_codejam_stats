import React, { useMemo } from 'react';
// import { countries as allCountries } from '../../utils/countries';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  groupsByParticipants: Map<string, number>;
}

const constructData = (countries: string[], participants: number[]) => {
  const colorsLength = Math.ceil(countries.length / 6);
  return {
    labels: countries,
    datasets: [
      {
        label: '# of Participants',
        data: participants,
        backgroundColor: new Array(colorsLength)
          .fill([
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ])
          .flat(),
        borderColor: new Array(colorsLength)
          .fill([
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ])
          .flat(),
        borderWidth: 1
      }
    ]
  };
};
export const PieChart = ({ groupsByParticipants }: PieChartProps) => {
  const countries = useMemo(
    () => Array.from(groupsByParticipants.keys()),
    [groupsByParticipants]
  );
  const participants = useMemo(
    () => Array.from(groupsByParticipants.values()),
    [groupsByParticipants]
  );
  return (
    <div>
      <Pie
        data={constructData(countries, participants)}
        legend={{ position: 'top' }}
        options={{
          responsive: true
        }}
        type='pie'
      />
    </div>
  );
};
