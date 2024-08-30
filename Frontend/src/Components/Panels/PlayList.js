import React, { useState } from 'react';
import Song from './Song';

const PlayList = ({ darkMode, playListName }) => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlayListName, setNewPlayListName] = useState(playListName);
    const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

    const songs = [
        { image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Song 1', artist: 'Artist 1', duration: '3:45' },
        { image: 'https://images.unsplash.com/photo-1724368202143-3781f7b30d23?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Song 2', artist: 'Artist 2', duration: '4:20' },
    ];

    const toggleLike = (index) => {
        setLikedSongs((prev) =>
            prev.includes(index) ? prev.filter(id => id !== index) : [...prev, index]
        );
    };

    const handleTitleClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setNewPlayListName(playListName);
        setIsModalOpen(false);
    };

    const handleCoverImageClick = () => {
        document.getElementById('coverImageInput').click();
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImage(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className={`p-6 ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
            <div className="flex items-center mb-6">
                <img
                    src={coverImage}
                    alt="Playlist Cover"
                    className="w-24 h-24 object-cover rounded-lg mr-4 cursor-pointer"
                    onClick={handleCoverImageClick}
                />
                <input
                    type="file"
                    id="coverImageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <div>
                    <h2 onClick={handleTitleClick} className="text-3xl font-bold mb-2 cursor-pointer">{newPlayListName}</h2>
                    <p className="text-sm text-gray-500">{songs.length} Songs</p>
                </div>
            </div>
            <table className={`min-w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                <thead>
                    <tr className={`w-full ${darkMode ? 'bg-mainBackground text-colorText' : 'bg-white text-gray-700'}`}>
                        <th className="p-2 text-left text-sm w-10">No.</th>
                        <th className="p-2 text-left text-sm">Título</th>
                        <th className="p-2 text-left text-sm w-20">Duration</th>
                        <th className="p-2 text-left text-sm w-16"></th>
                        <th className="p-2 text-left text-sm w-16"></th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <Song
                            key={index}
                            index={index}
                            song={song}
                            likedSongs={likedSongs}
                            toggleLike={toggleLike}
                            darkMode={darkMode}
                        />
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`bg-${darkMode ? 'mainBackground' : 'white'} p-6 rounded-lg shadow-lg`}>
                        <h3 className="text-xl mb-4">Edit Playlist Name</h3>
                        <input
                            type="text"
                            value={newPlayListName}
                            onChange={(e) => setNewPlayListName(e.target.value)}
                            className={`w-full p-2 mb-4 outline-none ${darkMode ? 'bg-inputBackground text-colorText' : 'bg-gray-100 text-gray-700'} rounded-lg`}
                        />
                        <div className="flex justify-end space-x-3">
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400">Cancel</button>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayList;
