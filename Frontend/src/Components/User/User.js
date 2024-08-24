import React from 'react';
// import { IoMdHome } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
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
    { name: 'Favoritos', icon: <FaHeart className="text-xl text-white" />, bgColor: 'bg-purple-500' },
    { name: 'Radio', icon: <IoIosRadio className="text-xl text-white" />, bgColor: 'bg-green-500' },
];

const User = () => {
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
            <div className="bg-gray-300 p-2 text-gray-700 fixed bottom-0 w-full" style={{ height: '5.5rem' }}>
                {/* Contenido del reproductor */}
            </div>
        </div>
    );
};

export default User;
