import Database from "better-sqlite3";
import { NextRequest } from "next/server";

const db = new Database("./games.db");

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    console.log(searchParams);

    if (searchParams.has("genre")) {
        const publisher = searchParams.get("genre");
        const game = db.prepare(`SELECT * FROM Games WHERE genre = ?`).all(publisher);
        return Response.json(game);
    }

    const games = db.prepare(`SELECT * FROM Games`).all();
    return Response.json(games);
}