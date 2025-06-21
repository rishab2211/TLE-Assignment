import { Request, Response, Router } from "express";
import { studentInfoModel } from "../model/student";
import { contestRatingHistoryModel } from "../model/contestInfo";
import { submissionHistoryModel } from "../model/submissions";
import { SubmissionDocument } from "../utils/types";

export const studentRoute = Router();

studentRoute.get("/students", async (req: Request, res: Response) => {
    try {
        const students = await studentInfoModel.find({});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

studentRoute.get("/info", async (req: Request, res: Response): Promise<any> => {
    const handle = req.query.handle as string;

    if (!handle) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }

    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();

        if (data.status !== "OK") {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(data.result);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to fetch data from Codeforces" });
    }
});



studentRoute.post("/add", async (req: Request, res: Response): Promise<any> => {
    const handle = req.query.handle as string;

    if (!handle) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }

    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();

        if (data.status !== "OK" || !data.result || !Array.isArray(data.result)) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = data.result[0];

        const createdUser = await studentInfoModel.create({
            handle: user.handle,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            lastOnlineTimeSeconds: user.lastOnlineTimeSeconds,
            currentRating: user.rating,
            maxRating: user.maxRating,
            rank: user.rank,
            maxRank: user.maxRank,
            avatar: user.avatar,
            titlePhoto: user.titlePhoto,
        });

        return res.status(201).json({ message: "User created successfully", data: createdUser });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
});




studentRoute.post("/rating.history", async (req: Request, res: Response): Promise<any> => {
    const handle = req.query.handle as string;

    if (!handle) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }

    try {
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const data = await response.json();

        if (data.status !== "OK") {
            return res.status(404).json({ error: "User not found or has no rating history" });
        }

        const contests = data.result;
        let updatedCount = 0;

        for (const contest of contests) {
            const filter = { handle, contestId: contest.contestId.toString() };

            const update = {
                contestName: contest.contestName,
                oldRating: contest.oldRating,
                newRating: contest.newRating,
                rank: contest.rank ?? null, // optional; Codeforces includes rank sometimes
                contestTimestamp: contest.ratingUpdateTimeSeconds, // in UNIX seconds
                handle,
                contestId: contest.contestId.toString(),
            };

            const result = await contestRatingHistoryModel.updateOne(
                filter,
                { $set: update },
                { upsert: true }
            );

            if (result.upsertedCount > 0 || result.modifiedCount > 0) {
                updatedCount++;
            }
        }

        return res.status(200).json({
            message: "Rating history upserted successfully",
            updated: updatedCount,
            total: contests.length,
            handle,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to fetch or update rating history" });
    }
});




studentRoute.post("/submissions.sync", async (req: Request, res: Response): Promise<any> => {
    const handle = req.query.handle as string;

    if (!handle) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }


    const from = req.query.from || 1;
    const count = req.query.count || 30;



    try {

        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=${from}&count=${count}`);
        const data = await response.json();




        if (data.status !== "OK") {
            return res.status(400).json({ error: "Invalid Codeforces response" });
        }
        let insertedCount = 0;
        for (const submission of data.result) {

            const filter = { submissionId: submission.id };
            const update = {
                submissionId: submission.id,
                handle: submission.author?.members?.[0]?.handle || handle,
                contestId: submission.contestId,
                creationTimeSeconds: submission.creationTimeSeconds,
                relativeTimeSeconds: submission.relativeTimeSeconds,
                problem: {
                    contestId: submission.problem?.contestId,
                    index: submission.problem?.index,
                    name: submission.problem?.name,
                    type: submission.problem?.type,
                    points: submission.problem?.points,
                    rating: submission.problem?.rating,
                    tags: submission.problem?.tags,
                },
                author: {
                    participantId: submission.author?.participantId,
                    participantType: submission.author?.participantType,
                    ghost: submission.author?.ghost,
                    startTimeSeconds: submission.author?.startTimeSeconds,
                },
                programmingLanguage: submission.programmingLanguage,
                verdict: submission.verdict,
                testset: submission.testset,
                passedTestCount: submission.passedTestCount,
                timeConsumedMillis: submission.timeConsumedMillis,
                memoryConsumedBytes: submission.memoryConsumedBytes,
            };

            const result = await submissionHistoryModel.updateOne(filter, { $set: update }, { upsert: true });
            if (result.upsertedCount > 0 || result.modifiedCount > 0) insertedCount++;
        }

        // Update student's lastUpdatedAt
        await studentInfoModel.updateOne({ handle }, { $set: { lastUpdatedAt: new Date() } });

        res.status(200).json({ message: "Submissions synced", count: insertedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to sync submissions" });
    }
});



studentRoute.get("/students/:id/problem-stats", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const days = parseInt(req.query.days as string) || 30;

    try {
        const student = await studentInfoModel.findById(id);
        if (!student) return res.status(404).json({ error: "Student not found" });

        const handle = student.handle;
        const fromTimestamp = Math.floor(Date.now() / 1000) - days * 86400;

        const submissions: SubmissionDocument[] = await submissionHistoryModel.find({
            handle,
            creationTimeSeconds: { $gte: fromTimestamp },
            verdict: "OK"
        });

        if (submissions.length === 0) {
            return res.status(200).json({ message: "No submissions in given period", data: {} });
        }

        const totalSolved = submissions.length;
        const avgProblemsPerDay = totalSolved / days;

        // Fix: Extract rating numbers, not problem objects
        const ratings = submissions
            .map((s) => s.problem?.rating)
            .filter((rating): rating is number => rating != null && rating > 0);

        console.log("RATINGS:", ratings);

        if (ratings.length === 0) {
            return res.status(200).json({
                message: "No rated problems in given period",
                totalSolved,
                avgProblemsPerDay: avgProblemsPerDay.toFixed(2),
                heatmap: {},
                data: {}
            });
        }

        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

        const mostDifficult = submissions.reduce((max, sub) => {
            if ((sub.problem?.rating || 0) > (max.problem?.rating || 0)) return sub;
            return max;
        }, submissions[0]);

        // Bar chart: { 800: 3, 900: 5, ... }
        const ratingBuckets: Record<string, number> = {};
        for (const rating of ratings) {
            const bucket = Math.floor(rating / 100) * 100;
            ratingBuckets[bucket] = (ratingBuckets[bucket] || 0) + 1;
        }

        // Heatmap: { "2024-06-17": 3, "2024-06-18": 5, ... }
        const heatmap: Record<string, number> = {};
        for (const s of submissions) {
            const dateStr = new Date(s.creationTimeSeconds * 1000).toISOString().split("T")[0];
            heatmap[dateStr] = (heatmap[dateStr] || 0) + 1;
        }

        res.status(200).json({
            mostDifficultProblem: {
                name: mostDifficult.problem?.name,
                rating: mostDifficult.problem?.rating,
                url: `https://codeforces.com/contest/${mostDifficult.problem?.contestId}/problem/${mostDifficult.problem?.index}`
            },
            totalSolved,
            avgRating: Math.round(avgRating),
            avgProblemsPerDay: avgProblemsPerDay.toFixed(2),
            ratingBuckets,
            heatmap,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to compute problem stats" });
    }
});





studentRoute.get("/contest-history", async (req: Request, res: Response): Promise<any> => {
    try {
        const handle = req.query.handle as string;
        const days = parseInt(req.query.days as string) || 365;

        if (!handle) {
            return res.status(400).json({ error: "Missing handle" });
        }

        const fromTimestamp = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

        // 1. Fetch rating history
        const ratingHistory = await contestRatingHistoryModel.find({
            handle,
            updatedAt: { $gte: new Date(fromTimestamp * 1000) },
        }).sort({ updatedAt: 1 });

        // 2. Fetch submissions in the same period
        const submissions = await submissionHistoryModel.find({
            handle,
            creationTimeSeconds: { $gte: fromTimestamp },
        });

        const submissionsByContest: Record<number, { attempted: Set<string>; solved: Set<string> }> = {};

        submissions.forEach(sub => {
            const contestId = sub.contestId;
            const key = `${sub.problem?.index}`;

            if (!submissionsByContest[contestId]) {
                submissionsByContest[contestId] = {
                    attempted: new Set(),
                    solved: new Set(),
                };
            }

            submissionsByContest[contestId].attempted.add(key);
            if (sub.verdict === "OK") {
                submissionsByContest[contestId].solved.add(key);
            }
        });

        // 3. Prepare response
        const ratingGraph = [];
        const contestList = [];

        for (const contest of ratingHistory) {
            const contestId = parseInt(contest.contestId);
            const contestSubmissions = submissionsByContest[contestId] || { attempted: new Set(), solved: new Set() };
            const unsolvedCount = Array.from(contestSubmissions.attempted).filter(
                (prob) => !contestSubmissions.solved.has(prob)
            ).length;

            ratingGraph.push({
                timestamp: contest.updatedAt,
                oldRating: contest.oldRating,
                newRating: contest.newRating,
            });

            contestList.push({
                contestName: contest.contestName,
                date: contest.updatedAt,
                // rank: contest.rank || "-", // add rank if stored in future
                ratingChange: contest.newRating - contest.oldRating,
                problemsAttempted: contestSubmissions.attempted.size,
                problemsUnsolved: unsolvedCount,
            });
        }

        return res.status(200).json({
            handle,
            days,
            ratingGraph,
            contestList,
        });

    } catch (error) {
        console.error("Error in /contest-history:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



