import useRecipeStore from "./recipeStore"
import DeleteRecipeButton from "./DeleteRecipeButton"



const RecipeList = ({ navigateToDetails, navigateToEdit, navigateToAdd, openModal }) => {
 
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <div>
        <h2>Available Recipes</h2>
        <button
          onClick={navigateToToAdd}
        
        >
          Add New Recipe
        </button>
      </div>

      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <div>
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 75)}...</p>
              </div>
              <div>
                <button
                  onClick={() => navigateToDetails(recipe.id)}
                 
                >
                  View
                </button>
                <button
                  onClick={() => navigateToEdit(recipe.id)}

                >
                  Edit
                </button>
                {<DeleteRecipeButton recipeId={recipe.id} openModal={openModal} />}
                
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes added yet. Get started by adding a new one!</p>
      )}
    </div>
  );
};

export default RecipeList