import React, { useState, useEffect } from 'react';

const Home = ({ darkMode }) => {
    const [greeting, setGreeting] = useState('');
    const [songs, setSongs] = useState([]);
    const [songsMessage, setSongsMessage] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || 'Usuario'); // Si no existe, usa 'Usuario' como valor por defecto

        const updateGreeting = () => {
            const date = new Date();
            const hour = date.getHours();

            if (hour >= 0 && hour < 12) {
                setGreeting(`¡Buenos días, ${storedUserName}!`);
                setSongsMessage('Empieza tu día con estas canciones llenas de energía y optimismo:');
                setSongs([
                    '☀️ Here Comes the Sun - The Beatles',
                    '🌅 Good Morning - Kanye West',
                    '🌻 Lovely Day - Bill Withers'
                ]);
            } else if (hour >= 12 && hour < 19) {
                setGreeting(`¡Buenas tardes, ${storedUserName}!`);
                setSongsMessage('Disfruta de tu tarde con estas melodías relajantes y llenas de vida:');
                setSongs([
                    '🌤️ Afternoon Delight - Starland Vocal Band',
                    '☕ Sunny Afternoon - The Kinks',
                    '🎉 Good Life - OneRepublic'
                ]);
            } else if (hour >= 19 && hour < 24) {
                setGreeting(`¡Buenas noches, ${storedUserName}!`);
                setSongsMessage('Relájate y disfruta de estas canciones perfectas para terminar el día:');
                setSongs([
                    '🌙 Night Changes - One Direction',
                    '✨ Blinding Lights - The Weeknd',
                    '⭐ Starry Night - Peggy Lee'
                ]);
            }

            const nextUpdate = new Date();
            nextUpdate.setHours(hour < 12 ? 12 : hour < 19 ? 19 : 24, 0, 0, 0);
            const timeout = nextUpdate - date;

            setTimeout(updateGreeting, timeout);
        };

        updateGreeting();

        return () => clearTimeout(updateGreeting);
    }, []);

    return (
        <div className={`w-full ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <h1 className="text-4xl font-semibold mt-4 ml-4">{greeting}</h1>
            <p className="text-2xl mt-2 ml-4">{songsMessage}</p>
            <ul className="list-disc ml-8 mt-2">
                {songs.map((song, index) => (
                    <li key={index} className="text-lg">{song}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
