import React from "react";
import type { Track } from "../types/interfaces";
import Button from "./Button";

interface CardProps {
    track: Track;
    index: number;
    addToFavorites: (index: number) => void;
    removeFromFavorites: (index: number) => void;
    isFavorite: boolean; // Nuevo prop para saber si la canción está en favoritos
    showAlbum: (albumTitle: string) => void;
    showArtist: (artistName: string) => void;
}

const Card = ({ track, index, addToFavorites, removeFromFavorites, isFavorite }: CardProps) => {
    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(index); // Elimina de favoritos
        } else {
            addToFavorites(index); // Añade a favoritos
        }
    };

    return (
        <div className="bg-zinc-900 p-4 rounded-lg shadow-md hover:bg-zinc-800 transition duration-200 flex flex-col items-center">
            <img
                src={track.album.cover_big}
                alt={`Cover of ${track.album.title}`}
                className="w-80 h-80 rounded-md shadow-lg"
            />
            <h3 className="text-white text-lg font-semibold mt-3 truncate w-40 text-center">{track.title}</h3>
            <div className="text-gray-400 text-sm truncate w-40 text-center">{track.artist.name}</div>
            <div className="flex gap-3 mt-3">
                <Button
                    text={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    variant={isFavorite ? "remove" : "add"} // Cambia el variant según si es favorito o no
                    onClick={handleFavoriteClick}
                />
            </div>
        </div>
    );
};

export default Card;