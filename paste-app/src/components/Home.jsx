import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

function Home() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste?.title || '');
      setValue(paste?.content || '');
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleDateString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-10 px-6">
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="mr-2">🖋️</span>Create or Update Your Paste
          </h1>
          <p className="text-gray-500">Effortlessly save and manage your notes!</p>
        </div>

        {/* Title Input */}
        <div className="flex flex-row gap-4 items-center mb-6">
          <input
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-gray-100 text-gray-700 shadow-sm"
            type="text"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="p-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium shadow transition duration-200"
          >
            {pasteId ? 'Update My Paste ✏️' : 'Create My Paste 📄'}
          </button>
        </div>

        {/* Content Input */}
        <div>
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-gray-100 text-gray-700 shadow-sm"
            placeholder="Enter content here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            <span className="text-pink-500">💾</span> Your notes are safely stored for future reference.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
