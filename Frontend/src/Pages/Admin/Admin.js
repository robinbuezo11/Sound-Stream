import React, { useState, useEffect } from 'react';
import MenuAdmin from '../../Components/Menu/MenuAdmin';
import Player from '../../Components/Player/Player';
import Crud from '../../Components/Crud/Crud';
import TopBar from '../../Components/TopBar/TopBar';
import Home from '../../Components/Panels/Home';
import Favorites from '../../Components/Panels/Favorites';
import Radio from "../../Components/Panels/Radio";
import NewPlayList from "../../Components/Panels/NewPlayList";
import PlayList from '../../Components/Panels/PlayList';
import ProfilePanel from '../../Components/Panels/ProfilePanel';
import '../../Utils/Scroll.css';
import '../../Utils/Normalize.css';
import { isDarkMode } from '../../Utils/DarkMode';

const Admin = ({ userName }) => {
    const [darkMode, setDarkMode] = useState(isDarkMode());
    const [activePanel, setActivePanel] = useState(() => {
        return localStorage.getItem('activePanel') || 'Home';
    });
    const [previousPanel, setPreviousPanel] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [currentSong, setCurrentSong] = useState(localStorage.getItem('currentSong') || null);
    const [songList, setSongList] = useState(JSON.parse(localStorage.getItem('songList')) || []);
    const [playingSongIndex, setPlayingSongIndex] = useState(() => {
        return parseInt(localStorage.getItem('playingSongIndex'), 10) || 0;
    });

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

    const handlePanelChange = (panel, playlistName = '') => {
        if (panel === 'ProfilePanel') {
            setPreviousPanel(activePanel);
        }
        setActivePanel(panel);
        localStorage.setItem('activePanel', panel);
        if (panel === 'PlayList') {
            setSelectedPlaylist(playlistName);
        }
    };

    const handleSongSelect = (file, index, songList) => {
        setCurrentSong(file);
        setPlayingSongIndex(index);
        setSongList(songList);
        localStorage.setItem('currentSong', file);
        localStorage.setItem('playingSongIndex', index);
        localStorage.setItem('songList', JSON.stringify(songList));
    };

    const handleSongEnd = () => {
        const nextIndex = (playingSongIndex + 1) % songList.length;
        setPlayingSongIndex(nextIndex);
        setCurrentSong(songList[nextIndex]);
        localStorage.setItem('playingSongIndex', nextIndex);
        localStorage.setItem('currentSong', songList[nextIndex]);
    };

    // Mostrar el panel desde el que se llama al perfil
    const onCloseProfilePanel = () => {
        console.log('Cerrando panel de perfil...');
        setActivePanel(previousPanel || 'Home');
    };

    return (
        <div className={`flex flex-col h-screen ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <TopBar darkMode={darkMode} userName={userName} setActivePanel={handlePanelChange} />
            <div className="flex flex-1 overflow-hidden">
                <div className={`p-6 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-200 text-gray-700'} overflow-y-auto custom-scrollbar`} style={{ width: '20rem', height: 'calc(100vh - 5.5rem)'}}>
                    <MenuAdmin setActivePanel={handlePanelChange} />
                </div>
                <div className={`flex-1 overflow-y-auto custom-scrollbar ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-background text-gray-700'}`} style={{height: 'calc(100vh - 10.5rem)', marginTop: '5rem'}}>
                    {activePanel === 'Home' && <Home darkMode={darkMode} setActivePanel={handlePanelChange} />}
                    {activePanel === 'Favorites' && <Favorites darkMode={darkMode} onSongSelect={handleSongSelect} playingSongIndex={playingSongIndex} />}
                    {activePanel === 'NewPlayList' && <NewPlayList darkMode={darkMode} />}
                    {activePanel === 'Radio' && <Radio darkMode={darkMode} />}
                    {activePanel === 'PlayList' && <PlayList darkMode={darkMode} playListName={selectedPlaylist} />}
                    {activePanel === 'Crud' && <Crud darkMode={darkMode} />}
                    {/* {activePanel === 'ProfilePanel' && <ProfilePanel darkMode={darkMode} />} */}
                    {activePanel === 'ProfilePanel' && <ProfilePanel onClose={onCloseProfilePanel} onSave={onCloseProfilePanel} />}
                </div>
            </div>
            <div className={`fixed bottom-0 w-full p-4 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-300 text-gray-700'}`} style={{ height: '5.5rem' }}>
                <div className="flex items-center justify-between mb-2">
                    <Player rute={currentSong} onSongEnd={handleSongEnd} />
                </div>
            </div>
        </div>
    );
};

export default Admin;
