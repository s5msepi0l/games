import Database from "better-sqlite3";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

const db = new Database("./games.db");

const filters = [
    "genre",
    "title",
    "platform",
    "publisher",
    "developer",
    "release_date"
]

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    
    if (searchParams.size > 0){
        if (searchParams.has("single")) {
            if (searchParams.has("id")) {
                const id = searchParams.get("id");
                const data = db.prepare("SELECT * FROM Games WHERE id = ?").get(id);

                return Response.json(data);
            }
        }

        let genre = "%", title = "%", platform = "%", publisher = "%", developer = "%", release_date = "%";


        for (let i = 0; i < filters.length; i++) {
            if (searchParams.has(filters[i])) {
                const filter = String(searchParams.get(filters[i]));
                
                switch(i) {
                    case 0:
                        genre = filter;
                        break;
                
                    case 1:
                        title = `${filter}%`;
                        break;

                    case 2:
                        platform = `%${filter}%`;
                        break;
                        
                    case 3:
                        publisher = `%${filter}%`;
                        break;

                    case 4:
                        developer = `%${filter}%`;
                        break;

                    case 5:
                        release_date = `%${filter}%`;
                        break;
                }    
            }
        }

        console.log(genre, title, platform, publisher, developer, release_date);

        let data = db.prepare(`
            SELECT * FROM Games WHERE
            genre LIKE ? AND
            title LIKE ? AND
            platform LIKE ? AND
            publisher LIKE ? AND
            developer LIKE ? AND
            release_date LIKE ?
        `).all(genre, title, platform, publisher, developer, release_date);

        console.log(data);

        return Response.json(data);
    }

    const games = db.prepare(`SELECT * FROM Games`).all();
    return Response.json(games);
}