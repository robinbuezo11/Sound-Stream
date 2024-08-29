import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const PlayList = ({ darkMode, playListName }) => {

    const [likedSongs, setLikedSongs] = useState([]);
    const coverImage = 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const songs = [
        { image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Song 1', artist: 'Artist 1', duration: '3:45' },
        { image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Song 2', artist: 'Artist 2', duration: '4:20' },
    ];

    const toggleLike = (index) => {
        setLikedSongs((prev) =>
            prev.includes(index) ? prev.filter(id => id !== index) : [...prev, index]
        );
    };

    return (
        <div className={`p-6 ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <div className="flex items-center mb-6">
                <img src={coverImage} alt="Playlist Cover" className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                    <h2 className="text-3xl font-bold mb-2">{playListName}</h2>
                    <p className="text-sm text-gray-500">{songs.length} Songs</p>
                </div>
            </div>
            <table className={`min-w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                <thead>
                    <tr className={`w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                        <th className="p-2 text-left text-sm w-10">No.</th>
                        <th className="p-2 text-left text-sm">Título</th>
                        <th className="p-2 text-left text-sm w-20 text-right">Duration</th>
                        <th className="p-2 text-left text-sm w-16"></th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={index} className={`${darkMode ? 'bg-darkBackground text-colorText hover:bg-hover' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                            <td className="p-2 text-sm w-10">{index + 1}</td>
                            <td className="p-2 text-sm flex items-center space-x-3">
                                <img src={song.image} alt={song.name} className="w-12 h-12 object-cover" />
                                <div>
                                    <div>{song.name}</div>
                                    <div className="text-gray-500">{song.artist}</div>
                                </div>
                            </td>
                            <td className="p-2 text-sm w-20 text-right">{song.duration}</td>
                            <td className="p-2 text-sm w-16 text-center">
                                <button onClick={() => toggleLike(index)}>
                                    <FaHeart
                                        className={`w-6 h-6 ${likedSongs.includes(index) ? 'text-red-500' : 'text-gray-400'} transition-colors duration-200`}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayList;
