import React, { useState, useEffect } from 'react';
import { FaHome, FaHeart } from 'react-icons/fa';
import { IoIosRadio } from 'react-icons/io'; 
import { SlEarphones } from 'react-icons/sl';
import { isDarkMode } from '../../Utils/DarkMode';
import { FaMusic } from 'react-icons/fa';

const playlists = [
    { name: 'Chill Vibes', songCount: 12, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Top Hits', songCount: 24, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Rock Classics', songCount: 18, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Jazz Essentials', songCount: 10, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Hip Hop Hits', songCount: 14, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Classical Music', songCount: 22, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Electronic', songCount: 18, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];
const crudamin =[
    { name: 'CRUD Canción', icon: <FaMusic className="text-xl text-white" />, bgColor: 'bg-blue-500',}   
]
const options = [
    { name: 'Inicio', icon: <FaHome className="text-xl text-white" />, bgColor: 'bg-blue-500', panel: 'Home' },
    { name: 'Favoritos', icon: <FaHeart className="text-xl text-white" />, bgColor: 'bg-purple-500', panel: 'Favorites' },
    { name: 'Radio', icon: <IoIosRadio className="text-xl text-white" />, bgColor: 'bg-green-500', panel: 'Radio' },
];

const Menu = ({ setActivePanel }) => {
    const [darkMode, setDarkMode] = useState(isDarkMode());

    useEffect(() => {
        const darkModeListener = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeListener.addEventListener('change', (e) => {
            setDarkMode(e.matches);
        });

        return () => {
            darkModeListener.removeEventListener('change', (e) => {
                setDarkMode(e.matches);
            });
        };
    }, []);

    return (
        <>
            <div className="mb-2">
                <h2 className="mb-4 flex items-center justify-center" style={{ fontSize: '1.7rem' }}>
                    <SlEarphones className="mr-2" />
                    <span className="font-bold">Sound</span>
                    <span className="font-light"> Stream</span>
                </h2>
                <div className="space-y-1">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`${darkMode ? 'bg-secondaryBackground' : 'bg-gray-200'} p-2 rounded-lg flex items-center space-x-2 cursor-pointer`}
                            onClick={() => setActivePanel(option.panel)} // Cambia el panel acivo
                        >
                            <div className={`${option.bgColor} w-11 h-11 flex items-center justify-center rounded`}>
                                {option.icon}
                            </div>
                            <span className={`text-xl ${darkMode ? 'text-colorText' : 'text-gray-700'}`}>{option.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-colorText' : 'text-gray-700'}`}>Playlists</h3>
            <div className="space-y-1">
                {playlists.map((playlist, index) => (
                    <div key={index} className={`p-2 rounded-lg flex items-center space-x-2 cursor-pointer ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-200 text-gray-700'} ${index === playlists.length - 1 ? 'mb-4' : ''}`}>
                        <img
                            src={playlist.image}
                            alt="Playlist"
                            className="w-11 h-11 object-cover rounded" />
                        <div>
                            <h4 className="text-base font-semibold">{playlist.name}</h4>
                            <p className={`text-sm text-gray-500 `}>Canciones: {playlist.songCount}</p>
                        </div>
                    </div>
                ))}
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-colorText' : 'text-gray-700'}`}>CRUD Administrador</h3>   
            <div className="space-y-1">
                    {crudamin.map((option, index) => (
                        <div
                            key={index}
                            className={`${darkMode ? 'bg-secondaryBackground' : 'bg-gray-200'} p-2 rounded-lg flex items-center space-x-2 cursor-pointer`}
                            onClick={() => setActivePanel(option.panel)} // Cambia el panel acivo
                        >
                            <div className={`${option.bgColor} w-11 h-11 flex items-center justify-center rounded`}>
                                {option.icon}
                            </div>
                            <span className={`text-xl ${darkMode ? 'text-colorText' : 'text-gray-700'}`}>{option.name}</span>
                        </div>
                    ))}
                </div> 
            </div>
        </>
    );
};

export default Menu;
