import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Amala and ewedu', description: 'A proper western nigerian dish ' },
    { id: 2, title: 'Jollof rice', description: 'A delicious West African cuisine' },
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

export const deleteRecipe = (id) => {
    useRecipeStore.getState().deleteRecipe(id);
};
