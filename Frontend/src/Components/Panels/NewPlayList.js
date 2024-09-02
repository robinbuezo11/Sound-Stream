import React, { useState } from 'react';
import Swal from 'sweetalert2';

const NewPlayList = ({ darkMode }) => {
    const [song, setSong] = useState(null);
    const [name, setName] = useState('');
    const [descripcion, setDesc] = useState('');
    const [photo, setPhoto] = useState(null);
    const [duration, setDuration] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSong, setUpdateSong] = useState(null);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newSong, setNewSong] = useState(null);
    const [newDuration, setNewDuration] = useState(null);
    const [newPhoto, setNewPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNewSongChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const audio = new Audio(e.target.result);
                audio.onloadedmetadata = () => {
                    setNewSong(e.target.result);
                    setNewDuration(audio.duration);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNewPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddPlayList = (e) => {
        e.preventDefault();
        if (song && name && descripcion && photo) {
            fetch(process.env.REACT_APP_API_URL + '/canciones/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: name,
                    cancion: song,
                    imagen: photo,
                    duracion: duration,
                    descripcion: descripcion
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.message);
                    Swal.fire({
                        icon: 'error',
                        name: 'Error',
                        text: data.error
                    });
                    return;
                } else {
                    Swal.fire({
                        icon: 'success',
                        name: 'Canción registrada',
                        text: 'La canción se ha registrado correctamente'
                    });
                    setSong(null);
                    setName('');
                    setDesc('');
                    setPhoto(null);
                    setDuration(null);
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                name: 'Error',
                text: 'Por favor, completa todos los campos'
            });
        }
    };

    const handleCancelAddPlayList = () => {
        setSong(null);
        setName('');
        setDesc('');
        setPhoto(null);
        setDuration(null);
    };

    const handleCancelUpdate = () => {
        setUpdateSong(null);
        setNewName('');
        setNewDesc('');
        setNewSong(null);
        setNewPhoto(null);
        setIsUpdating(false);
    };

    const handleCloseDetails = () => {
        setSelectedSong(null);
    };

    const handleUpdateClick = (song) => {
        setUpdateSong(song);
        setNewName(song.nombre);
        setNewDesc(song.descripcion);
        setIsUpdating(true);
    };

    const handleUpdateSong = (e) => {
        e.preventDefault();
        if (newName && newDesc) {
            fetch(process.env.REACT_APP_API_URL + '/canciones/actualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: updateSong.id,
                    nombre: newName,
                    cancion: newSong,
                    imagen: newPhoto,
                    duracion: newDuration,
                    descripcion: newDesc
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.message);
                    Swal.fire({
                        icon: 'error',
                        name: 'Error',
                        text: data.error
                    });
                    return;
                } else {
                    Swal.fire({
                        icon: 'success',
                        name: 'Canción actualizada',
                        text: 'La canción se ha actualizado correctamente'
                    });
                    setUpdateSong(null);
                    setNewName('');
                    setNewDesc('');
                    setNewSong(null);
                    setNewPhoto(null);
                    setIsUpdating(false);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                name: 'Error',
                text: 'Por favor, completa todos los campos'
            });
        }
    };

    return (
        <div className={`w-full ${darkMode ? 'text-white bg-mainBackground' : 'text-gray-700 bg-white'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <h1 className="text-4xl font-semibold text-center mt-4 ml-4">Creación de Playlist</h1>
            
            <form onSubmit={handleAddPlayList} className="mt-8 mx-4">
                <div>
                    <div className="mb-4">
                        <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Descripcion</label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDesc(e.target.value)}
                            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Portada</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                    >
                        Guardar Playlist
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelAddPlayList}
                        className={`w-full py-2 px-4 mt-2 rounded ${darkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            {/* Formulario para actualizar canción */}
            {isUpdating && (
                <div className={`mt-8 mx-4 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border rounded`}>
                    <h2 className="text-2xl font-semibold mb-4">Actualizar Canción</h2>
                    <form onSubmit={handleUpdateSong}>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Descripción</label>
                            <input
                                type="text"
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cambiar Canción</label>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleNewSongChange}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cambiar Portada</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleNewPhotoChange}
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

            {selectedSong && (
                <div className={`fixed inset-0 ${darkMode ? 'bg-mainBackground' : 'bg-gray-900'} bg-opacity-75 flex justify-center items-center z-50`}>
                    <div className={`relative bg-${darkMode ? 'secondaryBackground' : 'white'} p-6 rounded-lg shadow-lg w-3/4 max-w-2xl`}>
                        <h2 className="text-2xl font-semibold mb-4">Detalles de la PlayList</h2>
                        <button 
                            onClick={handleCloseDetails}
                            className={`absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-gray-700`}
                            style={{ fontSize: '1.5rem' }}
                        >
                            &times;
                        </button>
                        <div className="flex items-start mb-4">
                            <div className="w-1/3 mr-4">
                                <img src={selectedSong.imagen} alt="Foto de canción" className="w-full h-auto object-cover" />
                            </div>
                            <div className="w-2/3">
                                <div className="mb-4">
                                    <p className="font-medium">Nombre:</p>
                                    <p>{selectedSong.nombre}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="font-medium">Descripción:</p>
                                    <p>{selectedSong.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewPlayList;