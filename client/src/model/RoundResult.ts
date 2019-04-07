interface TaskResult {
    penaltyAttempts: number;
    penaltyMicros: number;
    score: number;
    taskId: string;
    testsDefinitelySolved: number;
    testsPossiblySolved: number;
    totalAttempts: number;
}

export interface RoundResult {
    country: string;
    displayname: string;
    rank: number;
    score_1: number;
    score_2: number;
    taskInfo: TaskResult[];
}