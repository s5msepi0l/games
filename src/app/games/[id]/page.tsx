'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SearchBar from '@/app/components/searchBar';

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

export default function GamePage() {
  const params = useParams();
  const id = params?.id as string;

  const [gameData, setGameData] = useState<Game | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const response = await fetch(`/api/games?single=true&id=${id}`);
      const data = await response.json();
      console.log(data);
      setGameData(data);
    };

    fetchData();
  }, [id]);

  if (!gameData) return <p>Loading...</p>;

  return (
    <main className="w-screen h-screen">
        <SearchBar/>

        <div className="w-full flex justify-center">
            <div className="mt-40 flex flex-row items-center justify-around w-2/3">
                <img
                    className='
                    shadow-md
                    rounded-sm
                    '
                    width={500}
                    src={gameData.thumbnail} alt={gameData.title} 
                />
            

                
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{gameData.title}</h1>
                    
                    <div className=' flex justify-between w-40'>
                        <p>{gameData.genre}</p>
                        <p>{gameData.release_date}</p>
                    </div>

                    <a
                        className="
                        bg-sky-500
                        font-bold text-2xl
                        w-36
                        h-12
                        
                        mb-8

                        flex
                        items-center
                        justify-center
                        rounded-lg

                        text-gray-50
                        text-center
                        "
                        href={gameData.game_url}><p>Play <strong>Now</strong></p></a>
                    
                    <hr className="
                        border-1
                        rounded-full
                        bg-gray-700
                        border-gray-700
                    "/>
                    <p>{gameData.short_description}</p>
                </div>
            </div>
        </div>
    </main>
  );
}
