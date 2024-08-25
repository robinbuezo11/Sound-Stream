import React from 'react';
// import { IoMdHome } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaMusic } from 'react-icons/fa';
import { FaCompactDisc } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaBackward, FaPlay, FaForward, FaVolumeUp } from 'react-icons/fa';

import { IoIosRadio } from 'react-icons/io'; 
import { SlEarphones } from 'react-icons/sl';
import '../../Utils/Scroll.css';

const playlists = [
    { name: 'Chill Vibes', songCount: 12, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Top Hits', songCount: 24, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Rock Classics', songCount: 18, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Jazz Essentials', songCount: 10, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Hip Hop Hits', songCount: 14, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Classical Music', songCount: 22, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Electronic', songCount: 18, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const options = [
    { name: 'Inicio', icon: <FaHome className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'Buscar', icon: <FaSearch className="text-xl text-white" />, bgColor: 'bg-green-500' },
    { name: 'Perfil', icon: <FaUser className="text-xl text-white" />, bgColor: 'bg-green-500' },
    { name: 'Radio', icon: <IoIosRadio className="text-xl text-white" />, bgColor: 'bg-green-500' },
];
const historico =[
    { name: 'Canciones más reproducidas', icon: <FaMusic className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'Artistas más reproducidos', icon: <FaMusic className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'Álbumes más reproducidos', icon: <FaCompactDisc className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'Mi historial', icon: <FaHistory className="text-xl text-white" />, bgColor: 'bg-purple-500' },
]

const crudalbum =[
    { name: 'CRUD Artista', icon: <FaUserAlt className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'CRUD Álbum', icon: <FaCompactDisc className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'CRUD Canción', icon: <FaMusic className="text-xl text-white" />, bgColor: 'bg-purple-500' },
]


const User = () => {
    const currentTime = '01:23';
    const duration = '03:45';
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                {/* Menu lateral */}
                <div className="bg-gray-200 p-6 text-gray-700 overflow-y-auto custom-scrollbar" style={{ width: '20rem' }}>
                    <div className="mb-2">
                        <h2 className="mb-4 flex items-center justify-center" style={{ fontSize: '1.7rem' }}>
                            <SlEarphones className="mr-2" />
                            <span className="font-bold">Sound</span>
                            <span className="font-light"> Stream</span>
                        </h2>
                        <div className="space-y-1">
                            {options.map((option, index) => (
                                <div key={index} className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2 cursor-pointer">
                                    <div className={`${option.bgColor} w-11 h-11 flex items-center justify-center rounded`}>
                                        {option.icon}
                                    </div>
                                    <span className="text-xl">{option.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Historico</h3>
                    <div className="space-y-1">
                            {historico.map((option, index) => (
                                <div key={index} className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2 cursor-pointer">
                                    <div className={`${option.bgColor} w-11 h-11 flex items-center justify-center rounded`}>
                                        {option.icon}
                                    </div>
                                    <span className="text-xl">{option.name}</span>
                                </div>
                            ))}
                        </div>
                    <h3 className="text-xl font-bold mb-2">Funcionalidades CRUD</h3>
                    <div className="space-y-1">
                            {crudalbum.map((option, index) => (
                                <div key={index} className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2 cursor-pointer">
                                    <div className={`${option.bgColor} w-11 h-11 flex items-center justify-center rounded`}>
                                        {option.icon}
                                    </div>
                                    <span className="text-xl">{option.name}</span>
                                </div>
                            ))}
                        </div>                    
                    <h3 className="text-xl font-bold mb-2">Playlists</h3>
                    <div className="overflow-y-auto pb-4 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 20rem)' }}>
                        <div className="space-y-1">
                            {playlists.map((playlist, index) => (
                                <div key={index} className={`bg-gray-200 p-2 rounded-lg flex items-center space-x-2 cursor-pointer ${index === playlists.length - 1 ? 'mb-4' : ''}`}>
                                    <img 
                                        src={playlist.image}
                                        alt="Playlist"
                                        className="w-11 h-11 object-cover rounded"
                                    />
                                    <div>
                                        <h4 className="text-base font-semibold">{playlist.name}</h4>
                                        <p className="text-sm text-gray-600">Canciones: {playlist.songCount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-background p-4 text-gray-700 overflow-y-auto">
                    {/* Contenido del panel principal */}
                </div>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-gray-200 text-gray-700 overflow-y-auto custom-scrollbar">
    <div className="flex items-center space-x-4 mb-2">
        <button className="p-2">
            <FaBackward className="text-2xl" />
        </button>
        <button className="p-2">
            <FaPlay className="text-2xl" />
        </button>
        <button className="p-2">
            <FaForward className="text-2xl" />
        </button>
        <div className="flex items-center space-x-2">
            <FaVolumeUp className="text-2xl" />
            <input type="range" min="0" max="100" className="w-24 h-1.5 bg-gray-400 rounded-lg appearance-none cursor-pointer" />
        </div>
    </div>
    <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm">{currentTime}</span>
        <input type="range" min="0" max="100" className="w-64 h-1.5 bg-gray-400 rounded-lg appearance-none cursor-pointer" />
        <span className="text-sm">{duration}</span>
    </div>
    <div>
        <span className="text-sm font-medium">Reproduciendo: Canción Ejemplo</span>
    </div>
</div>

            </div>

    );
};

export default User;
