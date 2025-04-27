import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { removeFromPastes } from '../redux/pasteSlice';
import { FaEdit, FaEye, FaTrash, FaLink, FaClipboard } from 'react-icons/fa';

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes); 
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Filter pastes based on search term
  const filteredPastes = Array.isArray(pastes)
    ? pastes.filter((paste) =>
        paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Delete a paste
  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId)); // Dispatch remove action
  };

  // Generate a shareable link for the paste
  const generateShareableLink = (pasteId) => `https://your-app-url.com/paste/${pasteId}`;

  // Handle sharing by copying the shareable link to the clipboard
  const handleShare = (pasteId) => {
    const shareableLink = generateShareableLink(pasteId);
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success('Shareable Link Copied to Clipboard 🔗'))
      .catch(() => toast.error('Failed to Copy Shareable Link 😔'));
  };

  return (
    <div className="bg-pink-50 min-h-screen min-w-[600px] p-9">
      {/* Search Input */}
      <input
        className="p-3 rounded-2xl w-full max-w-md mt-5 bg-white shadow-lg border border-pink-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        type="search"
        placeholder="Search for a paste"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display filtered pastes */}
      <div className="flex flex-col gap-5 mt-4 mb-3">
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all h-34" key={paste._id}>
              {/* Paste Title */}
              <div className="mb-2">
                <h3 className="font-semibold text-lg text-pink-700 truncate">{paste.title}</h3>
              </div>

              {/* Paste Content */}
              <div className="mb-2">
                <p className="text-gray-600 text-md truncate">{paste.content}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-4 place-content-around">
                <button className="flex items-center text-pink-600 hover:text-pink-800">
                  <a href={`/?pasteId=${paste?._id}`}>
                    <FaEdit className="text-sm" />
                  </a>
                </button>

                <button className="flex items-center text-pink-600 hover:text-pink-800">
                  <a href={`/pastes/${paste._id}`}>
                    <FaEye className="text-sm" />
                  </a>
                </button>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="flex items-center text-pink-600 hover:text-pink-800"
                >
                  <FaTrash className="text-sm" />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to clipboard');
                  }}
                  className="flex items-center text-pink-600 hover:text-pink-800"
                >
                  <FaClipboard className="text-sm" />
                </button>

                <button
                  onClick={() => handleShare(paste._id)}
                  className="flex items-center text-pink-600 hover:text-pink-800"
                >
                  <FaLink className="text-sm" />
                </button>
              </div>

              {/* Created Date */}
              <div className="mt-2 text-xs text-gray-500">{paste.createdAt}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No pastes found.</p>
        )}
      </div>
    </div>
  );
}

export default Paste;


