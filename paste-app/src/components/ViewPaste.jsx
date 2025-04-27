import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id == id)[0];

  return (
    <div className="min-h-screen min-w-[600px] bg-gradient-to-b from-indigo-50 to-indigo-100 py-10 px-6">
      {/* Container */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📋</span> View Paste
          </h1>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Title <span className="text-indigo-500">📝</span>
          </label>
          <input
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-100 text-gray-700"
            type="text"
            placeholder="Enter title here..."
            value={paste.title}
            disabled
          />
        </div>

        {/* Content Section */}
        <div>
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Content <span className="text-indigo-500">✍️</span>
          </label>
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-100 text-gray-700"
            value={paste.content}
            placeholder="Enter content here..."
            disabled
            rows={10}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Created with ❤️ and stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;
