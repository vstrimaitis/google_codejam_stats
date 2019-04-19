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
    score1: number;
    score2: number;
    taskInfo: TaskResult[];
}
