import React, { useState, useRef, useEffect } from "react";
import { FaBackward, FaPlay, FaPause, FaForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './Player.css';

const Player = ({ rute, onSongEnd }) => {
    const songImage = 'https://images.unsplash.com/photo-1569519576545-fa1e60738b37?q=80&w=1597&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const songTitle = 'El Amar y el Querer';
    const songArtist = 'José José';
    var audioSrc = require('../../Cancion/c1.mp3');
    if (rute != null) {
        audioSrc = require('../../Cancion/'+rute);
    }

    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isHoveringProgress, setIsHoveringProgress] = useState(false);
    const [isHoveringVolume, setIsHoveringVolume] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('-0:00');

    const audioRef = useRef(null);
    const [curretVolume, setCurretVolume] = useState(1.0);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleLoadedMetadata = () => {
                if (!isFinite(audio.duration)) {
                    console.error('Duración no válida después de cargar los metadatos');
                }
            };

            const handleTimeUpdate = () => {
                const current = audio.currentTime;
                const duration = audio.duration;
                const progress = (current / duration) * 100;
                setProgress(progress);

                const formatTime = (time) => {
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.floor(time % 60);
                    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                };

                setCurrentTime(formatTime(current));
                setDuration(`-${formatTime(duration - current)}`);
            };

            const handleEnded = () => {
                if (onSongEnd) {
                    onSongEnd();
                }
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [onSongEnd]);

    useEffect(() => {
        if (rute != null && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [rute]);

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        setProgress(newProgress);

        const audio = audioRef.current;
        if (audio && audio.duration && isFinite(audio.duration)) {
            audio.currentTime = (newProgress / 100) * audio.duration;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
            setCurretVolume(newVolume / 100);
        }
    };

    const mute = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isMute) {
                audio.volume = curretVolume;
                setVolume(curretVolume * 100);
                setIsMute(false);
            } else {
                setCurretVolume(audio.volume);
                audio.volume = 0;
                setVolume(0);
                setIsMute(true);
            }
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <div className="flex items-center space-x-4 pb-3">
                <img src={songImage} alt="Song" className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{songTitle}</span>
                    <span className="text-sm text-gray-500">{songArtist}</span>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-2 mb-5">
                <div className="flex items-center space-x-4">
                    <FaBackward className="text-lg cursor-pointer" />
                    <button className="p-2" onClick={togglePlayPause}>
                        {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
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
                            style={{ zIndex: 101 }}
                            disabled={!isFinite(audioRef.current?.duration)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div onClick={mute}>
                    {isMute ? <FaVolumeMute className="text-lg cursor-pointer" /> : <FaVolumeUp className="text-lg cursor-pointer" />}
                </div>
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
                        style={{ zIndex: 101 }}
                    />
                </div>
            </div>
            <audio ref={audioRef} src={audioSrc}></audio>
        </>
    );
};

export default Player;
