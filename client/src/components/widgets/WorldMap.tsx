import React, { useMemo } from 'react';
import {
  WithStyles,
  withStyles,
  WithTheme,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import ReactWorldMap from 'react-svg-worldmap';
import { isoCodesByCountry } from '../../utils/countries';
import { mainStyles } from '../../styles/main';

interface WorldMapProps extends WithStyles<typeof mainStyles>, WithTheme {
  data: Map<string, number>;
  title: string;
}

const constructData = (countries: string[], participants: number[]) => {
  return countries
    .filter((c) => isoCodesByCountry.has(c))
    .map((c, idx) => ({
      country: isoCodesByCountry.get(c) || '',
      value: participants[idx]
    }));
};

const WorldMapComponent = ({ data, theme, title }: WorldMapProps) => {
  const countries = useMemo(() => Array.from(data.keys()), [data]);
  const participants = useMemo(() => Array.from(data.values()), [data]);
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {title}
        </Typography>
        <ReactWorldMap
          color={theme.palette.primary.main}
          value-suffix='people'
          size='responsive'
          data={constructData(countries, participants)}
          backgroundColor='none'
        />
      </CardContent>
    </Card>
  );
};

export const WorldMap = withStyles(mainStyles, { withTheme: true })(
  WorldMapComponent
);
