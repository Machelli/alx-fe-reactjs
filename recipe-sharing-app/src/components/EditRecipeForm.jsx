import { useState } from "react"
import useRecipeStore from "./recipeStore"


const EditRecipeForm = ({ recipeId, navigateToList }) => {
  const recipes = useRecipeStore(state => state.recipes);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const recipeToEdit = recipes.find(r => r.id === recipeId);

  const [title, setTitle] = useState(recipeToEdit.title);
  const [description, setDescription] = useState(recipeToEdit.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      
      updateRecipe({ id: recipeId, title, description });
      navigateToList();
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Recipe Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div>
          <button
            type="submit"
           >
            Save Changes
          </button>
          <button
            type="button"
            onClick={navigateToList}
           >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};