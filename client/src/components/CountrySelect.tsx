import React from "react";
import { withStyles, WithTheme, WithStyles, Theme, createStyles } from "@material-ui/core";
import { mainStyles } from "../styles/main";
import { countries } from "../utils/countries";
import Select from "react-select";

const styles = (theme: Theme) => createStyles({
    ...mainStyles(theme),
    countrySelect: {
        fontFamily: theme.typography.fontFamily
    }
})

interface CountrySelectProps extends WithStyles<typeof styles>, WithTheme {
    selectedCountry?: string;
    onSelectionChanged: (country?: string) => void;
}

const getValue = (country?: string) =>
    country ? country : "Worldwide";

export const CountrySelect = withStyles(styles, { withTheme: true })(
    ({ selectedCountry, onSelectionChanged, classes }: CountrySelectProps) => (
        <Select
            className={classes.countrySelect}
            defaultValue={{ value: getValue(selectedCountry), label: getValue(selectedCountry) }}
            isSearchable
            options={["Worldwide"].concat(countries.map(c => c.readableName)).map(c => ({ value: c, label: c }))}
            onChange={(e: any) => onSelectionChanged(e.label === "Worldwide" ? undefined : e.label)}
        />
    )
);