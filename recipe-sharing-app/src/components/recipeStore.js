import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Amala and ewedu', description: 'A proper western nigerian dish ' },
    { id: 2, title: 'Jollof rice', description: 'A delicious West African cuisine' },
    { id: 3, title: 'Classic Beef Lasagna', description: 'Layers of pasta, rich bolognese sauce, creamy béchamel, and melted cheese baked to perfection.' },
  ],
   favorites: [],
  recommendations: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),

  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),

  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),

  toggleFavorite: (recipeId) => set(state => {
    const isCurrentlyFavorite = state.favorites.includes(recipeId);
    if (isCurrentlyFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) };
    } else {
      return { favorites: [...state.favorites, recipeId] };
    }
  }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),

  generateRecommendations: () => set(state => {
    const favoriteRecipes = state.recipes.filter(r => state.favorites.includes(r.id));
    if (favoriteRecipes.length === 0) {
      return { recommendations: [] };
    }

    const favoriteTags = favoriteRecipes.flatMap(r => r.tags);
    const tagCounts = favoriteTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const recommendations = state.recipes
      .filter(r => !state.favorites.includes(r.id))
      .map(recipe => {
        let score = 0;
        if (recipe.tags) {
          recipe.tags.forEach(tag => {
            score += tagCounts[tag] || 0;
          });
        }
        return { ...recipe, score };
      })
      .sort((a, b) => b.score - a.score)
      .filter(r => r.score > 0)
      .slice(0, 3);

    return { recommendations };
  }),
}));



export default useRecipeStore;