import { Document } from "mongoose";

export interface SubmissionDocument extends Document {
    submissionId: number;
    handle: string;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;

    problem: {
        type: Object
        contestId: number;
        index: string;
        name: string;
        points?: number;
        rating?: number;
        tags: string[];
    }

    author: {
        participantId: number;
        participantType: string;
        ghost: boolean;
        startTimeSeconds: number;
    };

    programmingLanguage: string;
    verdict: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
}
