import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Amala and ewedu', description: 'A proper western nigerian dish ' },
    { id: 2, title: 'Jollof rice', description: 'A delicious West African cuisine' },
    { id: 3, title: 'Classic Beef Lasagna', description: 'Layers of pasta, rich bolognese sauce, creamy béchamel, and melted cheese baked to perfection.' },
  ],
   searchTerm: '',
  filteredRecipes: [],

  
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now(), isFavorite: false, tags: newRecipe.tags || [] }]
  })),

  
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),

  
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),

  
  toggleFavorite: (id) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    )
  })),

  
  setSearchTerm: (term) => set({ searchTerm: term }),

  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
}));

export default useRecipeStore;