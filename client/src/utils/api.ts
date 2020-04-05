import axios, { AxiosResponse } from "axios";
import { Config } from "../model/Config";
import { RoundInfo } from "../model/RoundInfo";
import { RoundResult } from "../model/RoundResult";

const axiosInstance = axios.create({
    baseURL: "/google_codejam_stats"
})

const handleErrors = <T>(r: AxiosResponse<T>) => {
    if (r.status < 200 || r.status >= 300)
        throw new Error(r.status + ": " + r.statusText);
    return r.data;
};

export const fetchConfig = () =>
    axiosInstance.get<Config>("config.json").then(handleErrors);

export const fetchRoundInfo = (roundId: string) =>
    axiosInstance.get<RoundInfo>(`round_data/info/${roundId}.json`).then(handleErrors);

export const fetchRoundResults = (roundId: string) =>
    axiosInstance
        .get<RoundResult[]>(`round_data/scores/${roundId}.json`)
        .then(handleErrors);
