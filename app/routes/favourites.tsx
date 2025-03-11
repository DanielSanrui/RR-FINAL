import React, { useEffect, useState } from "react";
import type { Track } from "../types/interfaces";
import { Link } from "react-router-dom";

const Favourites = () => {
    const [favorites, setFavorites] = useState<Track[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
    }, []);

    const removeFromFavorites = (index: number) => {
        const updatedFavorites = favorites.filter((_, i) => i !== index);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">Favorites</h1>
            {favorites.length === 0 ? (
                <p>You do not have favourites yet</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((music, index) => (
                        <div key={music.id} className="bg-zinc-900 p-4 rounded-lg shadow-md">
                            <img
                                src={music.album.cover_big}
                                alt={`Cover of ${music.album.title}`}
                                className="w-full rounded-md"
                            />
                            <h3 className="text-white text-lg font-semibold mt-3 truncate">{music.title}</h3>
                            <div className="text-gray-400 text-sm truncate">{music.artist.name}</div>
                            <audio src={music.preview} controls className="w-full mt-3" />
                            <button
                                onClick={() => removeFromFavorites(index)}
                                className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/" className="mt-6 inline-block bg-green-400 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                Back to Search
            </Link>
        </div>
    );
};

export default Favourites;