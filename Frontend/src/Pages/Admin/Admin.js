import React, { useState, useEffect } from 'react';
import Menu from '../../Components/Menu/Menu';
import Player from '../../Components/Player/Player';
import Crud from '../../Components/Crud/Crud';
import TopBar from '../../Components/TopBar/TopBar';
import Home from '../../Components/Panels/Home';
import Favorites from '../../Components/Panels/Favorites';
import Radio from "../../Components/Panels/Radio"//Importación de Radio
//import Crud from '../../Components/Crud/Crud';
import '../../Utils/Scroll.css';
import '../../Utils/Normalize.css';
import { isDarkMode } from '../../Utils/DarkMode';

const Admin = ({ userName }) => {
    const [darkMode, setDarkMode] = useState(isDarkMode());
    const [activePanel, setActivePanel] = useState('Home'); // Panel activo

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
        <div className={`flex flex-col h-screen ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <TopBar darkMode={darkMode} userName={userName} />
            <div className="flex flex-1 overflow-hidden">
                <div className={`p-6 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-200 text-gray-700'} overflow-y-auto custom-scrollbar`} style={{ width: '20rem', height: 'calc(100vh - 5.5rem)'}}>
                    <Menu setActivePanel={setActivePanel} /> {/* Pasamos la función para cambiar el panel activo */}
                </div>
                <div className={`flex-1 overflow-y-auto custom-scrollbar ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-background text-gray-700'}`} style={{height: 'calc(100vh - 10.5rem)', marginTop: '5rem'}}>
                    {activePanel === 'Home' && <Home darkMode={darkMode} />}
                    {activePanel === 'Favorites' && <Favorites darkMode={darkMode} />}
                    {activePanel === 'Radio' && <Radio darkMode={darkMode} />}
                    {activePanel === 'Crud' && <Crud darkMode={darkMode} />} {/* Añadido Crud aquí */}

                </div>
            </div>
            <div className={`fixed bottom-0 w-full p-4 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-300 text-gray-700'}`} style={{ height: '5.5rem' }}>
                <div className="flex items-center justify-between mb-2">
                    <Player />
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

export default Admin;
