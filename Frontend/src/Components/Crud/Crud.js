import React, { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { IoTrashOutline } from 'react-icons/io5';

const Crud = ({ darkMode }) => {
    const [songFile, setSongFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [photo, setPhoto] = useState(null);
    const [duration, setDuration] = useState(null);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const [songsList, setSongsList] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSong, setUpdateSong] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newArtist, setNewArtist] = useState('');
    const [newSongFile, setNewSongFile] = useState(null);
    const [newPhoto, setNewPhoto] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSongFile(file);

        const audio = new Audio(URL.createObjectURL(file));
        audio.onloadedmetadata = () => {
            setDuration(audio.duration);
        };

        setShowDetailsForm(true);
    };

    const handleAddSong = (e) => {
        e.preventDefault();
        if (songFile && title && artist && photo) {
            const newSong = {
                id: songsList.length + 1,
                file: songFile,
                title: title,
                artist: artist,
                photo: URL.createObjectURL(photo),
                duration: `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
            };

            setSongsList([...songsList, newSong]);

            setSongFile(null);
            setTitle('');
            setArtist('');
            setPhoto(null);
            setDuration(null);
            setShowDetailsForm(false);
        } else {
            console.error('Por favor, completa todos los campos');
        }
    };

    const handleDeleteSong = (id) => {
        const updatedList = songsList.filter(song => song.id !== id);
        setSongsList(updatedList);
    };

    const handleViewDetails = (song) => {
        setSelectedSong(song);
    };

    const handleCancelAddSong = () => {
        setSongFile(null);
        setTitle('');
        setArtist('');
        setPhoto(null);
        setDuration(null);
        setShowDetailsForm(false);
    };

    const handleCancelUpdate = () => {
        setUpdateSong(null);
        setNewTitle('');
        setNewArtist('');
        setNewSongFile(null);
        setNewPhoto(null);
        setIsUpdating(false);
    };

    const handleCloseDetails = () => {
        setSelectedSong(null);
    };

    const handleUpdateClick = (song) => {
        setUpdateSong(song);
        setNewTitle(song.title);
        setNewArtist(song.artist);
        setNewPhoto(null); // Reset photo to allow new upload
        setIsUpdating(true);
    };

    const handleUpdateSong = (e) => {
        e.preventDefault();
        if (newTitle && newArtist) {
            const updatedSongsList = songsList.map(song =>
                song.id === updateSong.id
                    ? {
                        ...song,
                        title: newTitle,
                        artist: newArtist,
                        file: newSongFile ? newSongFile : song.file,
                        photo: newPhoto ? URL.createObjectURL(newPhoto) : song.photo
                    }
                    : song
            );

            setSongsList(updatedSongsList);
            setUpdateSong(null);
            setNewTitle('');
            setNewArtist('');
            setNewSongFile(null);
            setNewPhoto(null);
            setIsUpdating(false);
        } else {
            console.error('Por favor, completa todos los campos');
        }
    };

    return (
        <div className={`w-full ${darkMode ? 'text-white bg-mainBackground' : 'text-gray-700 bg-white'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <h1 className="text-4xl font-semibold text-center mt-4 ml-4">Gestión de Canciones</h1>
            
            <form onSubmit={handleAddSong} className="mt-8 mx-4">
                {!showDetailsForm ? (
                    <>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Agrega una Canción</label>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Título</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Artista</label>
                            <input
                                type="text"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fotografía</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Duración</label>
                            <input
                                type="text"
                                value={duration ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : ''}
                                readOnly
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                        >
                            Guardar Canción
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelAddSong}
                            className={`w-full py-2 px-4 mt-2 rounded ${darkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>

            {/* Formulario para actualizar canción */}
            {isUpdating && (
                <div className={`mt-8 mx-4 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border rounded`}>
                    <h2 className="text-2xl font-semibold mb-4">Actualizar Canción</h2>
                    <form onSubmit={handleUpdateSong}>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Título</label>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Artista</label>
                            <input
                                type="text"
                                value={newArtist}
                                onChange={(e) => setNewArtist(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cambiar Canción</label>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={(e) => setNewSongFile(e.target.files[0])}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cambiar Fotografía</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewPhoto(e.target.files[0])}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                        >
                            Actualizar Canción
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelUpdate}
                            className={`w-full py-2 px-4 mt-2 rounded ${darkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}

            <div className="mt-8 mx-4">
                <h2 className="text-2xl font-semibold mb-4">Lista de Canciones</h2>
                {songsList.length > 0 ? (
                    <table className={`min-w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                        <thead className="bg-gray-200">
                            <tr className={`w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                                <th className="py-2 px-4 text-left">Título</th>
                                <th className="py-2 px-4 text-left">Artista</th>
                                <th className="py-2 px-4 text-left">Duración</th>
                                <th className="py-2 px-4 text-left">Fotografía</th>
                                <th className="py-2 px-4 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songsList.map(song => (
                                <tr key={song.id}>
                                    <td className="py-2 px-4 ">{song.title}</td>
                                    <td className="py-2 px-4 ">{song.artist}</td>
                                    <td className="py-2 px-4 ">{song.duration}</td>
                                    <td className="py-2 px-4 ">
                                        <img src={song.photo} alt={song.title} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleViewDetails(song)}
                                            className={`mr-2 py-1 px-3 rounded ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                                        >
                                            <MdInfoOutline size={24} />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateClick(song)}
                                            className={`mr-2 py-1 px-3 rounded ${darkMode ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-yellow-700 text-white hover:bg-yellow-800'}`}
                                        >
                                            <RxUpdate size={24} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSong(song.id)}
                                            className={`py-1 px-3 rounded ${darkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-700 text-white hover:bg-red-800'}`}
                                        >
                                            <IoTrashOutline size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay canciones en la lista.</p>
                )}
            </div>

            {selectedSong && (
    <div className={`fixed inset-0 ${darkMode ? 'bg-mainBackground' : 'bg-gray-900'} bg-opacity-75 flex justify-center items-center z-50`}>
        <div className={`relative bg-${darkMode ? 'secondaryBackground' : 'white'} p-6 rounded-lg shadow-lg w-3/4 max-w-2xl`}>
            <h2 className="text-2xl font-semibold mb-4">Detalles de la Canción</h2>
            <button 
                onClick={handleCloseDetails}
                className={`absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-gray-700`}
                style={{ fontSize: '1.5rem' }}
            >
                &times;
            </button>
            <div className="flex items-start mb-4">
                <div className="w-1/3 mr-4">
                    <img src={selectedSong.photo} alt="Foto de canción" className="w-full h-auto object-cover" />
                </div>
                <div className="w-2/3">
                    <div className="mb-4">
                        <p className="font-medium">Nombre:</p>
                        <p>{selectedSong.title}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium">Artista:</p>
                        <p>{selectedSong.artist}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium">Duración:</p>
                        <p>{selectedSong.duration}</p>
                    </div>
                    <div className="mb-4">
                        <audio controls className="w-full">
                            <source src={URL.createObjectURL(selectedSong.file)} type="audio/mpeg" />
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default Crud;