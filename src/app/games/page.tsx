"use client";
import React from "react";

export default function page() {
    const fetchGenre = async(genre: string) => {
        const res = await fetch(`/api/games?genre=${genre}`);
        const data = await res.json();
        console.log(data);
    }
    fetchGenre("RPG");
    
    return (
        <div>Games</div>
    );
}