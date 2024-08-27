import React, { useState, useEffect } from 'react';

const Home = ({ darkMode }) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const date = new Date();
            const hour = date.getHours();

            if (hour >= 0 && hour < 12) {
                setGreeting('Buenos días');
            } else if (hour >= 12 && hour < 19) {
                setGreeting('Buenas tardes');
            } else if (hour >= 19 && hour < 24) {
                setGreeting('Buenas noches');
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
        </div>
    );
};

export default Home;
