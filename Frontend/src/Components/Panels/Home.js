import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';

// Array de playlists con imágenes de portada
const playlists = [
    { name: 'Chill Vibes', songCount: 12, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', panel: 'PlayList' },
    { name: 'Top Hits', songCount: 24, image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', panel: 'PlayList' },
];

const Home = ({ darkMode, setActivePanel }) => {
    const [greeting, setGreeting] = useState('');
    const [songs, setSongs] = useState([]);
    const [songsMessage, setSongsMessage] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName') || 'Usuario';
        setUserName(storedUserName);

        const updateGreeting = () => {
            const date = new Date();
            const hour = date.getHours();

            if (hour < 12) {
                setGreeting(`¡Buenos días, ${storedUserName}!`);
                setSongsMessage('Empieza tu día con canciones llenas de energía y optimismo:');
                setSongs([
                    '☀️ Here Comes the Sun - The Beatles',
                    '🌅 Good Morning - Kanye West',
                    '🌻 Lovely Day - Bill Withers'
                ]);
            } else if (hour < 19) {
                setGreeting(`¡Buenas tardes, ${storedUserName}!`);
                setSongsMessage('Disfruta de tu tarde con melodías relajantes y llenas de vida:');
                setSongs([
                    '🌤️ Afternoon Delight - Starland Vocal Band',
                    '☕ Sunny Afternoon - The Kinks',
                    '🎉 Good Life - OneRepublic'
                ]);
            } else {
                setGreeting(`¡Buenas noches, ${storedUserName}!`);
                setSongsMessage('Relájate y disfruta de canciones perfectas para terminar el día:');
                setSongs([
                    '🌙 Night Changes - One Direction',
                    '✨ Blinding Lights - The Weeknd',
                    '⭐ Starry Night - Peggy Lee'
                ]);
            }

            const nextUpdate = new Date();
            nextUpdate.setHours(hour < 12 ? 12 : hour < 19 ? 19 : 24, 0, 0, 0);
            setTimeout(updateGreeting, nextUpdate - date);
        };

        updateGreeting();
        return () => clearTimeout(updateGreeting);

    }, []);

    return (
        <div className={`w-full p-4 ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <div
                className=" relative w-full h-64 bg-cover bg-center flex items-center justify-center text-white"
                style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop")',
                    borderRadius: '.75rem'
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                <div className="relative text-center p-4">
                    <h1 className="text-4xl font-semibold mb-2">{greeting}</h1>
                    <p className="text-2xl">{songsMessage}</p>
                </div>
            </div>

            {/* Lista de playlists */}
            <h2 className="text-2xl font-semibold mt-6">Tus Playlists</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6`}>
                <div className={`flex items-center p-2 rounded-lg shadow-md cursor-pointer ${darkMode ? 'bg-secondaryBackground text-colorText hover:bg-hover' : 'bg-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                    <div className={`w-24 h-24 flex items-center justify-center rounded-lg mr-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                        <IoMdAdd className="text-3xl" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-1">Crear Playlist</h3>
                        <p className="text-sm">Agrega tu propia lista de canciones</p>
                    </div>
                </div>

                {playlists.map((playlist, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center p-2 rounded-lg shadow-md cursor-pointer ${darkMode ? 'bg-secondaryBackground text-colorText hover:bg-hover' : 'bg-gray-200 text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setActivePanel('PlayList', playlist.name)}
                    >
                        <img src={playlist.image} alt={playlist.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">{playlist.name}</h3>
                            <p className={`text-sm text-gray-500 `}>{playlist.songCount} Canciones</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
