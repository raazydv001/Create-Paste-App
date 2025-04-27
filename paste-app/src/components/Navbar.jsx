import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPaste } from 'react-icons/fa'; // Importing icons from react-icons

function Navbar() {
  return (
    <div className="flex flex-row justify-around items-center bg-pink-600 p-4 rounded-lg shadow-lg">
      {/* Home Link with Icon */}
      <NavLink
        to="/"
        className="flex items-center text-white hover:text-pink-200 transition-colors duration-300"
      >
        <FaHome className="mr-2 text-xl" />
        Home
      </NavLink>

      {/* Paste Link with Icon */}
      <NavLink
        to="/pastes"
        className="flex items-center text-white hover:text-pink-200 transition-colors duration-300"
      >
        <FaPaste className="mr-2 text-xl" />
        Paste
      </NavLink>
    </div>
  );
}

export default Navbar;
