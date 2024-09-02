import React, { useState, useEffect, useRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineDotsVertical } from "react-icons/hi";

const Song = ({ index, song, songs, likedSongs, toggleLike, darkMode, handleSongClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (dropdownVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownVisible]);

    const handleAddToPlaylist = () => {
        setDropdownVisible(false);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const playlists = [
        { id: 1, name: 'Playlist 1' },
        { id: 2, name: 'Playlist 2' },
        { id: 3, name: 'Playlist 3' },
    ];

    return (
        <>
            <tr
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`${darkMode ? 'bg-darkBackground text-colorText hover:bg-hover' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSongClick(song.cancion, index, songs)}
            >
                <td className="p-2 text-sm w-10">{index + 1}</td>
                <td className="p-2 text-sm flex items-center space-x-3">
                    <img src={song.imagen} alt={song.nombre} className="w-12 h-12 object-cover" />
                    <div>
                        <div>{song.nombre}</div>
                        <div className="text-gray-500">{song.artista}</div>
                    </div>
                </td>
                <td className="p-2 text-sm w-20 text-left">{`${Math.floor(song.duracion / 60)}:${Math.floor(song.duracion % 60).toString().padStart(2, '0')}`}</td>
                <td className="p-2 text-sm w-16 text-center">
                    <button onClick={(event) => { event.stopPropagation(); toggleLike(song.id); }}>
                        <FaHeart
                            className={`w-6 h-6 cursor-pointer ${likedSongs.includes(song.id) ? 'text-red-500' : 'text-gray-400'}`}
                        />
                    </button>
                </td>
                <td className="p-2 text-sm w-16 text-center relative" ref={dropdownRef}>
                    <button onClick={(event) => { event.stopPropagation(); toggleDropdown(); }}>
                        <HiOutlineDotsVertical className="w-6 h-6 text-gray-400 cursor-pointer" />
                    </button>
                    {dropdownVisible && (
                        <div className={`absolute top-full right-0 mt-2 rounded-lg shadow-lg w-48 z-50 ${darkMode ? 'bg-inputBackground text-white border-gray-100' : 'bg-white text-gray-800 border-gray-300'}`}>
                            <p className={`px-4 py-2 cursor-pointer ${darkMode ? 'hover:bg-secondaryBackground' : 'hover:bg-gray-100'}`} onClick={handleAddToPlaylist}>Agregar a playlist</p>
                            <p className={`px-4 py-2 cursor-pointer ${darkMode ? 'hover:bg-secondaryBackground' : 'hover:bg-gray-100'}`}>Eliminar de la playlist</p>
                        </div>
                    )}
                </td>
            </tr>
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className={`relative rounded-lg shadow-lg w-80 p-4 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-white text-gray-700'}`}>
                        <h3 className="text-lg font-semibold mb-4">Selecciona una playlist</h3>
                        <ul>
                            {playlists.map(playlist => (
                                <li key={playlist.id} className="py-2">
                                    <button className="w-full text-left">
                                        {playlist.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300" onClick={handleCloseModal}>X</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Song;
