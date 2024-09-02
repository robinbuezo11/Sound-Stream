import React, { useState, useEffect } from 'react';
import Menu from '../../Components/Menu/Menu';
import Player from '../../Components/Player/Player';
import TopBar from '../../Components/TopBar/TopBar';
import Home from '../../Components/Panels/Home';
import Favorites from '../../Components/Panels/Favorites';
import Radio from "../../Components/Panels/Radio";
import PlayList from '../../Components/Panels/PlayList';
import NewPlayList from '../../Components/Panels/NewPlayList';
import ProfilePanel from '../../Components/Panels/ProfilePanel';
import '../../Utils/Scroll.css';
import '../../Utils/Normalize.css';
import { isDarkMode } from '../../Utils/DarkMode';
import Swal from 'sweetalert2';

const User = ({ userName }) => {
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
        localStorage.setItem('activePanel', panel); // Guardar el panel activo en localStorage
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
        setCurrentSong(songList[nextIndex].cancion);
        localStorage.setItem('playingSongIndex', nextIndex);
        localStorage.setItem('currentSong', songList[nextIndex].cancion);
    };

    const handleProfileSave = (userId, newUserName, newUserLastName, profilePicture, newUserPassword, newUserDoB, password) => {
        fetch(process.env.REACT_APP_API_URL + '/usuarios/actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                nombre: newUserName,
                apellido: newUserLastName,
                foto: profilePicture,
                password: newUserPassword,
                fecha_nacimiento: newUserDoB,
                actualPassword: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Perfil actualizado',
                    text: 'Tu perfil ha sido actualizado correctamente'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                localStorage.setItem('user', JSON.stringify(data));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el perfil'
            });
        });

        // Cerrar el panel de perfil
        setPreviousPanel('');
        handlePanelChange(previousPanel);
    };

    const handleProfileClose = () => {
        setPreviousPanel('');
        handlePanelChange(previousPanel);
    };

    return (
        <div className={`flex flex-col h-screen ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <TopBar darkMode={darkMode} userName={userName} setActivePanel={handlePanelChange} />
            <div className="flex flex-1 overflow-hidden">
                <div className={`p-6 ${darkMode ? 'bg-secondaryBackground text-colorText' : 'bg-gray-200 text-gray-700'} overflow-y-auto custom-scrollbar`} style={{ width: '20rem', height: 'calc(100vh - 5.5rem)'}}>
                    <Menu setActivePanel={handlePanelChange} /> {/* Pasamos la función para cambiar el panel activo */}
                </div>
                <div className={`flex-1 overflow-y-auto custom-scrollbar ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-background text-gray-700'}`} style={{height: 'calc(100vh - 10.5rem)', marginTop: '5rem'}}>
                    {activePanel === 'Home' && <Home darkMode={darkMode} setActivePanel={handlePanelChange} handleSongSelect={handleSongSelect} />}
                    {activePanel === 'Favorites' && <Favorites darkMode={darkMode} onSongSelect={handleSongSelect} playingSongIndex={playingSongIndex} />}
                    {activePanel === 'NewPlayList' && <NewPlayList darkMode={darkMode} />}
                    {activePanel === 'Radio' && <Radio darkMode={darkMode} />}
                    {activePanel === 'PlayList' && <PlayList darkMode={darkMode} playListName={selectedPlaylist} />}
                    {activePanel === 'ProfilePanel' && <ProfilePanel onSave={handleProfileSave} onClose={handleProfileClose} />}
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

export default User;
