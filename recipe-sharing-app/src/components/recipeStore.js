import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Spaghetti Carbonara', description: 'A simple and delicious Italian pasta dish with eggs, hard cheese, cured pork, and black pepper.' },
    { id: 2, title: 'Chicken Tikka Masala', description: 'Chunks of roasted marinated chicken in a spiced curry sauce. A staple of Indian cuisine.' },
    { id: 3, title: 'Classic Beef Lasagna', description: 'Layers of pasta, rich bolognese sauce, creamy béchamel, and melted cheese baked to perfection.' },
  ],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
}));

export default useRecipeStore;