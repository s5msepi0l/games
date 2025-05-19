"use client";

import { useEffect, useState } from "react"

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async() => {
      const response = await fetch("/api/games");
      const data = await response.json();

      setGames(data);
    })();
  }, []);

  const searchUpdate = () => {
    
  }

  const handleSubmit = async() => {

  } 

  return ( <main className="w-screen h-screen">
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-row bg-gray-500 rounded-xl mt-1">
        <input onChange={(e) => setSearch(e.target.value)} className="border-none outline-none text-white p-1" placeholder="Search..."/>
        <img
          className="invert "
          width={32}
          src="search.svg" 
          onClick={handleSubmit}
          />
      </div>
    </div>
    
  </main>)
}