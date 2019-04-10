import { RoundInfo } from "../model/RoundInfo";
import "typescript-array-extensions";
import { RoundResult } from "../model/RoundResult";

export const getMaxScore = (roundInfo: RoundInfo) =>
    roundInfo
        .challenge
        .tasks
        .map(task =>
            task.tests
                .map(test=>test.value)
                .sum()
        )
        .sum();

export const getParticipantsWithScore = (results: RoundResult[], score: number) =>
    results.filter(r => r.score_1 === score);

export const getTotalSubmissions = (results: RoundResult[]) =>
    results.map(result =>
        result
            .taskInfo
            .map(task => task.totalAttempts)
            .sum()
    )
    .sum();

export const getParticipantsWithAtLeastOneSolved = (results: RoundResult[]) =>
    results.filter(result =>
        result
            .taskInfo
            .filter(task => task.score > 0)
            .length > 0
    );

export const getNumberOfParticipantsByCountry = (results: RoundResult[], maxEntries?: number) =>
    getStatsByCountry(
        results,
        r => r.length,
        (a, b) => -a+b,
        maxEntries
    );

export const getAverageScoreByCountry = (results: RoundResult[], maxEntries?: number) =>
    getStatsByCountry(
        results,
        r => r.map(result => result.score_1).average(),
        (a, b) => -a+b,
        maxEntries
    );

export const getNumberOfParticipantsWithScoreByCountry = (results: RoundResult[], score: number, maxEntries?: number) => 
    getStatsByCountry(
        results,
        r => r.filter(result => result.score_1 === score).length,
        (a, b) => -a+b,
        maxEntries
    );

export const groupByScore = (results: RoundResult[], minScore: number, maxScore: number) => {
    const groups = new Map(Array.from(
            results.groupBy((result, index, arr) => result.score_1)
        )
        .map(kvp => [kvp[0], kvp[1].length] as [number, number])
        .sort((a, b) => a[0]-b[0])
    );
    const scores = [];
    for(let i = minScore; i <= maxScore; i++) scores.push(i);
    return new Map(scores.map(score => [score, groups.get(score) || 0]));
}

export const getStatsByCountry = <T>(
        results: RoundResult[],
        convert: (result: RoundResult[]) => T,
        compare: (a: T, b: T) => number,
        maxEntries?: number) =>
            new Map(Array.from(
                results
                    .groupBy((result, index, arr) => result.country)
                    .entries()
            )
            .map(kvp => [kvp[0], convert(kvp[1])] as [string, T])
            .sort((a, b) => compare(a[1], b[1]))
            .slice(0, maxEntries)
)
