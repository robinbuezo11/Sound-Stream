import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Hook para redireccionar
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Verificar si el usuario es "admin"
        const isAdminAuthenticated = email === 'admin@sound-stream.com' && password === 'admin';
        
        // Verificar si el usuario es "grupo15"
        const isUserAuthenticated = email === 'grupo15@gmail.com' && password === 'grupo15';
    
        if (isAdminAuthenticated) {
            onLogin(true); // Llama a onLogin con el estado de autenticación
            navigate('/User');
        } else if (isUserAuthenticated) {
            onLogin(true); // Llama a onLogin con el estado de autenticación
            navigate('/AdminPanel');
        } else {
            alert('Credenciales incorrectas');
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex max-w-4xl bg-white shadow-md rounded-lg">
                {/* Formulario de login a la izquierda */}
                <div className="p-12 w-full max-w-md min-h-[500px] flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center mb-6 text-text">Inicia Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 mb-2">Contraseña:</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} // Mostrar u ocultar contraseña
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <label
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad de la contraseña
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                </label>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full font-bold bg-primary text-white py-3 rounded-lg hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">¿No tienes una cuenta? <Link to="/Signup" className="font-bold hover:underline">Regístrate aquí</Link></p>
                    </div>
                </div>

                {/* Imagen a la derecha */}
                <div className="hidden md:block">
                    <img 
                        src="https://cdn.dribbble.com/userupload/13158084/file/original-94b389fa3f7186b518c8ef2369081c32.png?resize=752x" 
                        alt="Login illustration"
                        className="w-100 h-full object-cover rounded-r-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
