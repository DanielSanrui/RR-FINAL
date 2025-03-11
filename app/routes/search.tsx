import React, { useState } from "react";
import type { Track } from "../types/interfaces";
import { getSongsByName } from "../services/api";
import CardList from "../components/CardList";
import SearchBar from "../components/SearchBar";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

const Alert = ({ message, type, onClose }: { message: string; type: "success" | "warning"; onClose: () => void }) => {
  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300
        ${type === "success" ? "bg-green-600 text-white" : "bg-yellow-600 text-black"}`}
    >
      {type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
      <span className="font-medium">{message}</span>
      <button className="ml-2 text-lg font-bold opacity-80 hover:opacity-100 transition" onClick={onClose}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [songs, setSongs] = useState<Track[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "warning" } | null>(null);

  const handleSearchSubmit = async () => {
    if (search.trim() === "") return;

    setIsLoading(true);
    try {
      const fetchedSongs = await getSongsByName(search);
      setSongs(fetchedSongs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
    setIsLoading(false);
  };

  const addToFavorites = (index: number) => {
    const music = songs[index];
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favorites.some((fav: Track) => fav.id === music.id)) {
      favorites.push(music);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setAlert({ message: `"${music.title}" added to favorites!`, type: "success" });
    } else {
      setAlert({ message: `"${music.title}" is already in favorites!`, type: "warning" });
    }

    setTimeout(() => setAlert(null), 3000); // Oculta la alerta después de 3s
  };

  return (
    <div className="p-4">
      <SearchBar
        placeholder="Search a song"
        onSearchChange={setSearch}
        onSearchSubmit={handleSearchSubmit}
      />

      {isLoading ? (
        <p className="text-gray-500 mt-4">Loading...</p>
      ) : songs.length === 0 ? (
        <p className="text-gray-500 mt-4">No songs found.</p>
      ) : (
        <CardList
          tracks={songs}
          addToFavorites={addToFavorites}
          showAlbum={(albumTitle) => console.log(`Showing album: ${albumTitle}`)}
          showArtist={(artistName) => console.log(`Showing artist: ${artistName}`)}
        />
      )}
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
};

export default Search;
