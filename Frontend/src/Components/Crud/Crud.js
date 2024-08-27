import React, { useState } from 'react';

const Crud = ({ darkMode }) => {
    const [songFile, setSongFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [photo, setPhoto] = useState(null);
    const [duration, setDuration] = useState(null);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const [songsList, setSongsList] = useState([]); // Nueva lista para las canciones
    const [selectedSong, setSelectedSong] = useState(null); // Canción seleccionada para detalles

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

            // Agregar la nueva canción a la lista
            setSongsList([...songsList, newSong]);

            // Limpiar el formulario
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
        // Filtrar la canción a eliminar por su id
        const updatedList = songsList.filter(song => song.id !== id);
        setSongsList(updatedList);
    };

    const handleViewDetails = (song) => {
        setSelectedSong(song);
    };

    const handleCloseDetails = () => {
        setSelectedSong(null);
    };

    return (
        <div className={`w-full ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <h1 className="text-4xl font-semibold text-center mt-4 ml-4">Gestión de Canciones</h1>
            
            <form onSubmit={handleAddSong} className="mt-8 mx-4">
                {!showDetailsForm ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Agrega una Canción</label>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                                required
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Título</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Artista</label>
                            <input
                                type="text"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Fotografía</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Duración</label>
                            <input
                                type="text"
                                value={duration ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : ''}
                                readOnly
                                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white'} hover:bg-blue-600`}
                        >
                            Guardar Canción
                        </button>
                    </div>
                )}
            </form>

            {/* Tabla de canciones cargadas */}
            {songsList.length > 0 && (
                <div className="mt-8 mx-4">
                    <h2 className="text-2xl font-semibold mb-4">Canciones Cargadas</h2>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Portada</th>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Artista</th>
                                <th className="px-4 py-2">Actualizar</th>
                                <th className="px-4 py-2">Eliminar</th>
                                <th className="px-4 py-2">Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songsList.map((song) => (
                                <tr key={song.id}>
                                    <td className="border px-4 py-2">
                                        <img src={song.photo} alt="Foto de canción" className="w-16 h-16" />
                                    </td>
                                    <td className="border px-4 py-2">{song.title}</td>
                                    <td className="border px-4 py-2">{song.artist}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                                        ⟳
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button 
                                            onClick={() => handleDeleteSong(song.id)} 
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button 
                                            onClick={() => handleViewDetails(song)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            ⓘ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Panel de detalles de la canción seleccionada */}
            {selectedSong && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Detalles de la Canción</h2>
                        <button 
                            onClick={handleCloseDetails}
                            className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            ❌
                        </button>
                        <div className="mb-4">
                            <img src={selectedSong.photo} alt="Foto de canción" className="w-32 h-32 object-cover mb-2" />
                        </div>
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
                            <audio controls>
                                <source src={URL.createObjectURL(selectedSong.file)} type="audio/mpeg" />
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crud;
