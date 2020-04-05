interface TaskTest {
    type: number;
    typeStr: string;
    value: number;
    numSolved?: number;
}

export interface Task {
    id: string;
    numAttempted: number;
    tests: TaskTest[];
    title: string;
}

interface RoundChallenge {
    additionalInfo: string;
    areResultsFinal: boolean;
    endMs: number;
    id: string;
    isPracticeAvailable: boolean;
    resultStatus: number;
    resultStatusStr: string;
    showScoreboard: boolean;
    startMs: number;
    tasks: Task[];
    title: string;
}

export interface RoundInfo {
    fullScoreboardSize: number;
    challenge: RoundChallenge;
}
