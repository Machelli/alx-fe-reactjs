import React, { useState } from 'react';
import { create } from 'zustand';

export default function App () {
const useRecipeStore = create(set => ({

  recipes: [
    { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish with eggs, cheese, and pork.' },
    { id: 2, title: 'Chicken Tikka Masala', description: 'A staple of Indian cuisine with marinated chicken in a creamy curry sauce.' },
    { id: 3, title: 'Classic Beef Lasagna', description: 'Layers of pasta, rich bolognese, creamy béchamel, and melted cheese.' },
  ],

  addRecipe: (newRecipe) => set(state => ({

    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),

  
  deleteRecipe: (id) => set(state => ({
    
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),

  
  updateRecipe: (updatedRecipe) => set(state => ({
    
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
}));


const useRouting = () => {
  const [view, setView] = useState('list'); // Tracks the current "page": 'list', 'details', 'add', 'edit'
  const [selectedId, setSelectedId] = useState(null); // Stores the ID of the recipe being viewed or edited.

  // Helper functions to change the view state.
  const navigateToList = () => { setView('list'); setSelectedId(null); };
  const navigateToDetails = (id) => { setView('details'); setSelectedId(id); };
  const navigateToAdd = () => setView('add');
  const navigateToEdit = (id) => { setView('edit'); setSelectedId(id); };

  return { view, selectedId, navigateToList, navigateToDetails, navigateToAdd, navigateToEdit };
}};

