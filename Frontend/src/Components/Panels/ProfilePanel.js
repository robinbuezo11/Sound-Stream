import React, { useState } from 'react';

const ProfilePanel = ({ userName, userLastName, userEmail, onClose, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [newUserLastName, setNewUserLastName] = useState(userLastName);
    const [newUserEmail, setNewUserEmail] = useState(userEmail);
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop');

    const handleSave = () => {
        if (password === 'correct-password') { 
            onSave(newUserName, newUserLastName, newUserEmail, profilePicture);
            setIsEditing(false);
        } else {
            alert('Contraseña incorrecta. No se pueden guardar los cambios.');
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfilePicture(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl mb-4">Mi Perfil</h2>
                <div className="flex flex-col items-center">
                    <label className="relative cursor-pointer">
                        <img 
                            src={profilePicture} 
                            alt="User Avatar" 
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={handleProfilePictureChange} 
                        />
                    </label>
                    {!isEditing ? (
                        <>
                            <p><strong>Nombre:</strong> {newUserName}</p>
                            <p><strong>Apellido:</strong> {newUserLastName}</p>
                            <p><strong>Correo electrónico:</strong> {newUserEmail}</p>
                            <button 
                                onClick={() => setIsEditing(true)} 
                                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                            >
                                Editar
                            </button>
                        </>
                    ) : (
                        <>
                            <input 
                                className="border border-gray-600 rounded p-2 mt-2 bg-gray-700 text-white w-full"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                placeholder="Nuevo nombre"
                            />
                            <input 
                                className="border border-gray-600 rounded p-2 mt-2 bg-gray-700 text-white w-full"
                                value={newUserLastName}
                                onChange={(e) => setNewUserLastName(e.target.value)}
                                placeholder="Nuevo apellido"
                            />
                            <input 
                                className="border border-gray-600 rounded p-2 mt-2 bg-gray-700 text-white w-full"
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                placeholder="Nuevo correo"
                            />
                            <input 
                                type="password"
                                className="border border-gray-600 rounded p-2 mt-2 bg-gray-700 text-white w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña para confirmar"
                            />
                            <button 
                                onClick={handleSave} 
                                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            >
                                Guardar
                            </button>
                        </>
                    )}
                    <button 
                        onClick={onClose} 
                        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePanel;

