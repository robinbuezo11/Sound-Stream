import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Song from './Song';
import Swal from 'sweetalert2';

const Favorites = ({ darkMode, onSongSelect, playingSongIndex }) => {
    const [songs, setSongs] = useState([]);
    const [likedSongs, setLikedSongs] = useState(JSON.parse(localStorage.getItem('likedSongs')) || []);
    const [playingSong, setPlayingSong] = useState(() => {
        const savedIndex = localStorage.getItem('playingSongIndex');
        return savedIndex !== null ? parseInt(savedIndex, 10) : null;
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        fetch(process.env.REACT_APP_API_URL + '/canciones/favoritas?idUsuario=' + user.id)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error
                });
                return;
            }
            setSongs(data);
            setLikedSongs(data.map((song, index) => index));
        })
    }, []);

    useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }, [likedSongs]);

    useEffect(() => {
        const savedIndex = localStorage.getItem('playingSongIndex');
        if (savedIndex === null) {
            setPlayingSong(null);
        } else {
            setPlayingSong(parseInt(savedIndex, 10));
        }
    }, [playingSongIndex]);

    const toggleLike = (index) => {
        setLikedSongs((prev) =>
            prev.includes(index) ? prev.filter(id => id !== index) : [...prev, index]
        );
    };

    const handleSongClick = (index, file) => {
        if (onSongSelect) {
            onSongSelect(file, index, songs);
        }
        setPlayingSong(index);
        localStorage.setItem('playingSongIndex', index);
    };

    return (
        <div className={`p-6 ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <div className="flex items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#645FFB] to-[#63E2FF] rounded-lg flex items-center justify-center mr-4">
                    <FaHeart className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-2">Favoritos</h2>
                    <p className="text-sm text-gray-500">{songs.length} Canciones</p>
                </div>
            </div>
            <table className={`min-w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                <thead>
                    <tr className={`w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                        <th className="p-2 text-left text-sm w-10">No.</th>
                        <th className="p-2 text-left text-sm">Título</th>
                        <th className="p-2 text-left text-sm w-20">Duración</th>
                        <th className="p-2 text-left text-sm w-16"></th>
                        <th className="p-2 text-left text-sm w-16"></th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <Song
                            key={index}
                            index={index}
                            song={song}
                            likedSongs={likedSongs}
                            toggleLike={toggleLike}
                            darkMode={darkMode}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Favorites;