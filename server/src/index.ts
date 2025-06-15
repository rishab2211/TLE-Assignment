import express, { Application, Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/user-info", async (req: Request, res: Response): Promise<any> => {
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



app.get("/user-rating", async (req: Request, res: Response): Promise<any> => {
    const handle = req.query.handle as string;

    if (!handle) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }

    try {
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
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


app.get("/user-status", async (req: Request, res: Response): Promise<any> => {
    const handle = req.query.handle as string;

    if (!handle) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }

    try {
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
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



app.get("/user-standing", async (req: Request, res: Response): Promise<any> => {
    const contest_id = req.query.handle as string;

    if (!contest_id) {
        return res.status(400).json({ error: "Missing 'handle' query parameter" });
    }

    try {
        const response = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contest_id}&from=1&count=1`);
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


// GET https://codeforces.com/api/contest.standings?contestId=2115&from=1&count=1



app.get("/contest-problems", async (req: Request, res: Response): Promise<any> => {
    // const contest_id = req.query.handle as string;

    // if (!contest_id) {
    //     return res.status(400).json({ error: "Missing 'handle' query parameter" });
    // }

    try {
        const response = await fetch(`https://codeforces.com/api/contest.standings?contestId=2115&from=1&count=1

`);
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




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
