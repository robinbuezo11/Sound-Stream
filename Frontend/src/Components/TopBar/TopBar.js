import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const TopBar = ({ darkMode, userName }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        console.log('Cerrando sesión...');
        localStorage.removeItem('isAuthenticated');  
        localStorage.removeItem('userName');         
        navigate('/'); 
    };
    const EditProfile =() =>{
        console.log('Redirigiendo a la edición de Perfil...')
        console.log(userName)
        navigate('/Profile')
    }
    return (
        <div 
            className={`fixed top-0 right-0 p-4 flex items-center ${darkMode ? 'bg-inputBackground text-white' : 'bg-gray-200 text-gray-800'}`} 
            style={{ height: '5rem', width: 'calc(100% - 20rem)' }}
        >
            <IoIosArrowBack className="ml-10 mr-1 text-3xl cursor-pointer" />
            <IoIosArrowForward className="ml-1 mr-10 text-3xl cursor-pointer" />
            <div className="flex items-center">
                <div className="relative mx-8 flex-1 max-w-xs">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="¿Qué quieres reproducir?" 
                        className={`h-11 w-96 pl-10 py-2 border rounded-lg outline-none ${darkMode ? 'bg-inputBackground text-white border-gray-700' : 'bg-white border-gray-300'}`}
                    />
                </div>
            </div>

            <div className={`relative flex items-center justify-end bg-purple-600 rounded-full px-3 py-1 ml-auto cursor-pointer text-white`} onClick={toggleDropdown}>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%20387w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%20687w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%20774w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%20987w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201287w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201374w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201587w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201887w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201974w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202187w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202487w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202574w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202787w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203087w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203174w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203387w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203687w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203887w,%20https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=4074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%204074w" 
                        alt="User Avatar" 
                        className="object-cover w-full h-full" 
                    />
                </div>
                <span className="ml-2 text-xl">{userName}</span>
                <IoIosArrowDown className="ml-2 text-xl cursor-pointer" />
                {dropdownVisible && (
                    <ul className={`absolute top-full right-0 mt-2 rounded-lg shadow-lg w-48 ${darkMode ? 'bg-inputBackground text-white border-gray-100' : 'bg-white text-gray-800 border-gray-300'}`}>
                        <li 
                            className={`px-4 py-2 cursor-pointer hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`} 
                            onClick={EditProfile} 
                        >
                            Perfil
                        </li>
                        <li 
                            className={`px-4 py-2 cursor-pointer hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`} 
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TopBar;
