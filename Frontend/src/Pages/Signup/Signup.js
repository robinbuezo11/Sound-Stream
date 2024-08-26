import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isMatch, setIsMatch] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar Formulario
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (password === value) {
            setIsMatch(true);
        } else {
            setIsMatch(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex max-w-6xl bg-white shadow-md rounded-lg">
                {/* Formulario de registro a la izquierda */}
                <div className="p-12 w-full max-w-2xl min-h-[700px] flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center mb-6 text-text">¡Hola, Regístrate en Sound Stream!</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">Nombres:</label>
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">Apellidos:</label>
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">Fecha de Nacimiento:</label>
                            <input 
                                type="date" 
                                value={dob} 
                                onChange={(e) => setDob(e.target.value)} 
                                required 
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">Contraseña:</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} // Mostrar u ocultar contraseña
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <div
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad de la contraseña
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">Confirmar Contraseña:</label>
                            <div className="relative">
                                <input 
                                    type={'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange} 
                                    required 
                                    className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                {/* Solo mostrar el ícono si confirmPassword no está vacío */}
                                {confirmPassword && (
                                    <div
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {isMatch === true ? (
                                            <FaCheck className="text-green-500" />
                                        ) : isMatch === false ? (
                                            <FaTimes className="text-red-500" />
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 mb-2">Foto de Perfil:</label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    id="profilePic" 
                                    onChange={(e) => setProfilePic(e.target.files[0])} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <label htmlFor="profilePic" className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                                    {profilePic ? profilePic.name : 'Selecciona una foto'}
                                </label>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <button 
                                type="submit" 
                                className="w-full font-bold bg-primary text-white py-3 rounded-lg hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">¿Ya tiénes una cuenta? <Link to="/" className="font-bold hover:underline">Inicia Sesión aquí</Link></p>
                    </div>
                </div>

                {/* Imagen a la derecha */}
                <div className="hidden md:block w-1/2">
                    <img 
                        src="https://cdn.dribbble.com/userupload/13158082/file/original-d38ff239c3a4664b7bd18c92ffca497f.png?resize=752x" 
                        alt="Register illustration"
                        className="w-full h-full object-cover rounded-r-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;