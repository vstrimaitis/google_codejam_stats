import axios, { AxiosResponse, AxiosInstance } from "axios";
import { Config } from "../model/Config";
import { RoundInfo } from "../model/RoundInfo";
import applyConverters from "axios-case-converter";
import { RoundResult } from "../model/RoundResult";

const client = applyConverters(axios.create() as any) as AxiosInstance;

const handleErrors = <T>(r: AxiosResponse<T>) => {
    if (r.status < 200 || r.status >= 300) throw new Error(r.status + ": " + r.statusText);
    return r.data;
};

export const fetchConfig = () =>
    client
        .get<Config>("config.json")
        .then(handleErrors)

export const fetchRoundInfo = (roundId: string) =>
    client
        .get<RoundInfo>(`round_data/info/${roundId}.json`)
        .then(handleErrors);

export const fetchRoundResults = (roundId: string) =>
    client
        .get<RoundResult[]>(`round_data/scores/${roundId}.json`)
        .then(handleErrors);