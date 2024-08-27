import React from 'react';

const Crud = ({ darkMode }) => {

    return (
        <div className={`w-full ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ height: 'calc(100vh - 11.5rem)' }}>
            <h1 className="text-4xl font-semibold mt-4 ml-4">Soy Crud ADMINISTRADOR</h1>
        </div>
    );
};

export default Crud;
