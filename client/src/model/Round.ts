export enum QualificationType {
    NONE = "NONE",
    SCORE = "SCORE",
    RANK = "RANK"
}

type DisabledRoundQualification = {
    type: QualificationType.NONE;
};

type EnabledRoundQualification = {
    type: QualificationType.SCORE | QualificationType.RANK;
    threshold: number;
};

export type RoundQualification =
    | DisabledRoundQualification
    | EnabledRoundQualification;

export interface Round {
    id: string;
    year: number;
    displayName: string;
    qualification: RoundQualification;
    areResultsOfficial: boolean;
}
