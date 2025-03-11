import React from 'react';
import spotifyLogo from '../img/Spotify_Full_Logo_RGB_Green.png';

function Header() {
    return (
        <div className="container flex justify-center items-center my-4 bg-black p-2">
            <a href="index.html">
                <img src={spotifyLogo} alt="Spotify Logo" width="280" />
            </a>
        </div>
    );
}

export default Header;
