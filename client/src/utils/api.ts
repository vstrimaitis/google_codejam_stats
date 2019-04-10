import axios, { AxiosResponse } from "axios";
import { Config } from "../model/Config";
import { RoundInfo } from "../model/RoundInfo";
import { RoundResult } from "../model/RoundResult";

const handleErrors = <T>(r: AxiosResponse<T>) => {
    if (r.status < 200 || r.status >= 300) throw new Error(r.status + ": " + r.statusText);
    return r.data;
};

export const fetchConfig = () =>
    axios
        .get<Config>("config.json")
        .then(handleErrors)

export const fetchRoundInfo = (roundId: string) =>
    axios
        .get<RoundInfo>(`round_data/info/${roundId}.json`)
        .then(handleErrors);

export const fetchRoundResults = (roundId: string) =>
    axios
        .get<RoundResult[]>(`round_data/scores/${roundId}.json`)
        .then(handleErrors);