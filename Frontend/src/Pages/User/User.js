import React, { useState, useEffect } from 'react';
import Menu from '../../Components/Menu/Menu';
import Player from '../../Components/Player/Player';
import '../../Utils/Scroll.css';
import '../../Utils/Normalize.css';
import { isDarkMode } from '../../Utils/DarkMode';

const User = () => {
    const [darkMode, setDarkMode] = useState(isDarkMode()); // Estado para el modo oscuro

    useEffect(() => {
        // Actualiza el estado cuando cambian las preferencias del sistema
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
        <div className={`flex flex-col h-screen ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <div className="flex flex-1 overflow-hidden">
                <div className={`p-6 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-200 text-gray-700'} overflow-y-auto custom-scrollbar`} style={{ width: '20rem', height: 'calc(100vh - 5.5rem)'}}>
                    <Menu />
                </div>
                <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-background text-gray-700'}`}>
                    {/* Contenido del panel principal */}
                </div>
            </div>
            <div className={`fixed bottom-0 w-full p-4 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-300 text-gray-700'}`} style={{ height: '5.5rem' }}>
                <div className="flex items-center justify-between mb-2">
                    <Player />
                </div>
            </div>
        </div>
    );
};

export default User;
