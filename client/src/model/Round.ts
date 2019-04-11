export enum QualificationType {
    NONE = "NONE",
    SCORE = "SCORE",
    RANK = "RANK"
}

type DisabledRoundQualification = {
    type: QualificationType.NONE
};

type EnabledRoundQualification = {
    type: QualificationType.SCORE | QualificationType.RANK,
    threshold: number
};

type RoundQualification = DisabledRoundQualification | EnabledRoundQualification;

export interface Round {
    id: string;
    year: number;
    displayName: string;
    qualification: RoundQualification;
}

// const f = (q:RoundQualification) => {
//     if(q.type == QualificationType.SCORE) {
//         const x = q.value;
//     } else if(q.type == QualificationType.RANK) {
        
//     } else {
//         q.
//     }
// }

// export const isQualificationEnabled = (q: RoundQualification): q is DisabledRoundQualification =>
//     q.type === QualificationType.NONE;
