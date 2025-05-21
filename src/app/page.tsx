"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/searchBar";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}


export default function Home() {
  const router = useRouter();

  const [games, setGames] = useState(new Array<Game>());

  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<{title: string, id: number}[]>([]);
  const [searchSuggestionMenu, setSearchSuggesionMenu] = useState(false);

  const [category, setCategory] = useState<string | null>(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/games");
      const data = await response.json();
      setGames(data);
      console.log(data);
    })();
  }, []);

  const ViewGame = (index: number) => {
    router.push(`/games/${index}`);
  }

  if (games.length === 0) {
    return <h1>Loading...</h1>
  }

  return (
    <main className="w-screen h-screen">
      <SearchBar/>

      <div className="grid grid-cols-3 gap-6 p-4 ml-50">
        {games.map((item) => (
          <div key={item.id} className="w-[320px] h-[300px] bg-gray-100 rounded-md p-3 shadow-lg">
            <img
              onClick={() => ViewGame(item.id)}
              className="w-full h-[200px] object-cover rounded-md cursor-pointer"
              src={item.thumbnail}
              alt={item.title}
            />

          <div className="flex items-center justify-around bg-blue-300 mt-3 rounded-md">
            <div className="mt-2">
              <h1 className="text-lg font-bold  text-white">{item.title}</h1>
              <p className="text-sm text-white mb-2">{item.genre}</p>
            </div>

            <a href={item.game_url} className=" bg-sky-600 text-xl text-gray-50 font-bold p-2 rounded-lg">Play now</a>
          
          </div>
          </div>
        ))}
      </div>

    </main>
  );
}
