import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Initialize the state with the pastes array from localStorage or as an empty array
const initialState = {
  pastes: localStorage.getItem('pastes') 
    ? JSON.parse(localStorage.getItem('pastes')) 
    : [],
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste); // Add a new paste
      localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Sync to localStorage
      toast.success('Paste Created Successfully 🚀');
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);
      if (index !== -1) {
        state.pastes[index] = paste; // Update the paste at the found index
        localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Sync to localStorage
        toast.success('Paste Updated ✔️');
      }
    },
    resetAllPastes: (state) => {
      state.pastes = []; // Clear the array
      localStorage.removeItem('pastes'); // Clear localStorage
      toast.success('All Pastes Reset');
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) =>
         item._id === pasteId);
      if(index >= 0){
        state.pastes.splice(index, 1); // Remove the paste at the found index
        localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Sync to localStorage
        toast.success('Paste Deleted Successfully 😔');
      }

      
    },
  },
});

// Export the action creators
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;

