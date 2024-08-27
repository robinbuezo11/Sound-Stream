import React from 'react';

const Radio = ({ darkMode }) => {
    return (
        <div 
            className={`w-full ${darkMode ? 'text-white' : 'text-gray-700'}`} 
            style={{
                height: 'calc(100vh - 11.5rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                background: 'linear-gradient(to bottom, #d53369, #cb3837)',
                borderRadius: '10px',
                color: 'white'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-music" style={{ fontSize: '3rem', marginRight: '20px' }}></i>
                <div>
                    <h1 className="text-4xl font-semibold">Radio</h1>
                    <p>Descubre nuevas canciones</p>
                </div>
            </div>
            <button 
                style={{
                    backgroundColor: '#6C63FF',
                    borderRadius: '50%',
                    padding: '15px',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <i className="fas fa-play" style={{ color: 'white', fontSize: '1.5rem' }}></i>
            </button>
        </div>
    );
};

export default Radio;
