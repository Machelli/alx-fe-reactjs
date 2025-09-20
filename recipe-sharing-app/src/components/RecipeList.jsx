import useRecipeStore from "./recipeStore"
import DeleteRecipeButton from "./DeleteRecipeButton"
import { Link, react-router-dom } from 'react-router-dom';




const generateRecommendations = (recipes) => {

  const favoriteRecipes = recipes.filter(r => r.isFavorite);
  if (favoriteRecipes.length === 0) {
    return [];
  }

  
  const favoriteTags = favoriteRecipes.flatMap(r => r.tags);
  const tagCounts = favoriteTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  
  const rankedRecommendations = recipes
    .filter(r => !r.isFavorite)
    .map(recipe => {
      let score = 0;
    
      recipe.tags.forEach(tag => {
        score += tagCounts[tag] || 0;
      });
      return { ...recipe, score };
    })
  
    .sort((a, b) => b.score - a.score)
    .filter(recipe => recipe.score > 0);

  return rankedRecommendations;
};

const RecipeList = ({ navigateToDetails, navigateToEdit, navigateToAdd, openModal }) => {
  const {
    recipes,
    toggleFavorite,
    searchTerm,
    setSearchTerm,
    filteredRecipes,
    filterRecipes
  } = useRecipeStore(state => ({
    recipes: state.recipes,
    toggleFavorite: state.toggleFavorite,
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
    filteredRecipes: state.filteredRecipes,
    filterRecipes: state.filterRecipes,
  }));

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes, filterRecipes]);

  
  const favoriteRecipes = recipes.filter(r => r.isFavorite);
  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  
  const recommendedRecipes = generateRecommendations(recipes);

  const renderRecipeList = (list, title, noRecipesMessage) => (
    <>
      <h3>{title}</h3>
      {list.length > 0 ? (
        <ul>
          {list.map(recipe => (
            <li key={recipe.id}>
              <div>
                <h4>{recipe.title}</h4>
                <p>{recipe.description.substring(0, 75)}...</p>
              </div>
                <div>
                  <button onClick={() => toggleFavorite(recipe.id)}>
                    <span>{recipe.isFavorite ? '★' : '☆'}</span>
                  </button>
                  <Link to={`/recipe/${recipe.id}`}>
                    <button>View</button>
                  </Link>
                  <Link to={`/edit/${recipe.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => openModal(recipe.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}}
          </ul>}
        <h3>{title}</h3>
        {list.length > 0 ? (
          <ul>
            {list.map(recipe => (
              <li key={recipe.id}>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>{noRecipesMessage}</p>
      )}
    </>
  ;

  return (
    <div>
      <div>
        <h2>Available Recipes</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={navigateToToAdd}>
          Add New Recipe
        </button>
      </div>

      <hr />

      {renderRecipeList(recommendedRecipes, 'Recommended for You', 'Favorite a few recipes to see personalized recommendations!')}

      <hr />

  
      {renderRecipeList(favoriteRecipes, 'Your Favorites', 'You have not favorited any recipes yet.')}

      <hr />

      {renderRecipeList(recipesToDisplay, 'All Recipes', 'No recipes found. Try adjusting your search.')}
    </div>
  );
;

DeleteRecipeButton ()

export default RecipeList;