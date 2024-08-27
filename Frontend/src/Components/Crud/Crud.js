import React, { useState } from 'react';

const Crud = ({ darkMode }) => {
    const [songFile, setSongFile] = useState(null);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    const handleFileChange = (e) => {
        setSongFile(e.target.files[0]);
        setShowDetailsForm(true); // Mostrar formulario de detalles cuando se carga un archivo
    };

    const handleAddSong = (e) => {
        e.preventDefault();
        if (songFile && title && artist) {
            // Lógica para manejar la carga del archivo y los detalles
            console.log('Archivo de canción cargado:', songFile);
            console.log('Título:', title);
            console.log('Artista:', artist);
            // Limpiar el formulario
            setSongFile(null);
            setTitle('');
            setArtist('');
            setShowDetailsForm(false);
        } else {
            console.error('Por favor, completa todos los campos');
        }
    };

    return (
        <div className={`w-full ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <h1 className="text-4xl font-semibold text-center mt-4 ml-4">Gestión de Canciones</h1>
            
            <form onSubmit={handleAddSong} className="mt-8 mx-4">
                {!songFile ? (
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
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white'} hover:bg-blue-600`}
                        >
                            Cargar Canción
                        </button>
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
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white'} hover:bg-blue-600`}
                        >
                            Guardar Canción
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Crud;
