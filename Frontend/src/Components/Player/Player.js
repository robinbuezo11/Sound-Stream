import React, { useState } from "react";
import { FaBackward, FaPlay, FaForward, FaVolumeUp } from 'react-icons/fa';
import './Player.css';

const Player = () => {
    const currentTime = '0:54';
    const duration = '-3:12';
    const songImage = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const songTitle = 'Rosa Pastel';
    const songArtist = 'Belanova';

    const [progress, setProgress] = useState(35);
    const [volume, setVolume] = useState(50);  // Estado para la barra de volumen
    const [isHoveringProgress, setIsHoveringProgress] = useState(false); // Hover independiente para la barra de progreso
    const [isHoveringVolume, setIsHoveringVolume] = useState(false); // Hover independiente para la barra de volumen

    const handleProgressChange = (e) => {
        setProgress(e.target.value);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <><><div className="flex items-center space-x-4 pb-3">
            <><img src={songImage} alt="Song" className="w-14 h-14 object-cover rounded-lg" /><div className="flex flex-col">
                <span className="text-lg font-semibold">{songTitle}</span>
                <span className="text-sm text-gray-600">{songArtist}</span>
            </div></>
        </div>
        <div className="flex flex-col items-center space-y-2 mb-5">
            <div className="flex items-center space-x-4">
                <FaBackward className="text-lg cursor-pointer" />
                <button className="p-2">
                    <FaPlay className="text-2xl" />
                </button>
                <FaForward className="text-lg cursor-pointer" />
            </div>
            <div className="flex items-center justify-between w-full mb-2" style={{ position: 'relative', width: '40rem' }}>
                <span className="text-sm absolute left-0 -top-5">{currentTime}</span>
                <span className="text-sm absolute right-0 -top-5">{duration}</span>
                <div
                    className="relative w-full"
                    onMouseEnter={() => setIsHoveringProgress(true)}
                    onMouseLeave={() => setIsHoveringProgress(false)}
                >
                    <div className="h-1.5 bg-gray-400 rounded-lg w-full absolute top-0 left-0"></div>
                    <div
                        className={`h-1.5 rounded-lg absolute top-0 left-0 ${isHoveringProgress ? 'bg-green-500' : 'bg-white'}`}
                        style={{ width: `${progress}%` }} />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="absolute w-full top-0 left-0 appearance-none bg-transparent pointer-events-auto"
                        style={{ zIndex: 101 }} />
                </div>
            </div>
        </div></><div className="flex items-center space-x-3">
            <FaVolumeUp className="text-lg cursor-pointer" />
            <div
                className="relative w-24"
                onMouseEnter={() => setIsHoveringVolume(true)}
                onMouseLeave={() => setIsHoveringVolume(false)}
            >
                <div className="h-1.5 bg-gray-400 rounded-lg w-full absolute top-0 left-0"></div>
                <div
                    className={`h-1.5 rounded-lg absolute top-0 left-0 ${isHoveringVolume ? 'bg-green-500' : 'bg-white'}`}
                    style={{ width: `${volume}%` }} />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="absolute w-full top-0 left-0 appearance-none bg-transparent pointer-events-auto"
                    style={{ zIndex: 101 }} />
            </div>
        </div></>
    );
};

export default Player;