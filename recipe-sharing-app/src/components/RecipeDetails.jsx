import useRecipeStore from "./recipeStore"
import DeleteRecipeButton from "./DeleteRecipeButton"

const RecipeDetails = ({ recipeId, navigateToEdit, navigateToList, openModal }) => {

  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId));

  
  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <p>The recipe you are looking for does not exist.</p>
        <button
          onClick={navigateToList}
          >
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <div>
        <button
          onClick={() => navigateToEdit(recipe.id)}
          >
          Edit Recipe
        </button>
        {<DeleteRecipeButton recipeId={recipe.id} openModal={openModal} />}
        
        <button
          onClick={navigateToList}
         >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails 