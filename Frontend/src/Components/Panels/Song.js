import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';

const Song = ({ index, song, likedSongs, toggleLike, darkMode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <tr
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${darkMode ? 'bg-darkBackground text-colorText hover:bg-hover' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
            <td className="p-2 text-sm w-10">{index + 1}</td>
            <td className="p-2 text-sm flex items-center space-x-3">
                <img src={song.image} alt={song.name} className="w-12 h-12 object-cover" />
                <div>
                    <div>{song.name}</div>
                    <div className="text-gray-500">{song.artist}</div>
                </div>
            </td>
            <td className="p-2 text-sm w-20 text-left">{song.duration}</td>
            <td className="p-2 text-sm w-16 text-center">
                <button onClick={() => toggleLike(index)}>
                    <FaHeart
                        className={`w-6 h-6 ${likedSongs.includes(index) ? 'text-like' : 'text-gray-400'} transition-colors duration-200`}
                    />
                </button>
            </td>
            {isHovered && (
                <td className="p-2 text-sm w-16 text-center">
                    <IoTrashOutline className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer" />
                </td>
            )}
        </tr>
    );
};

export default Song;
