import useNavigate  from "react-router-dom"
import useRecipeStore from "./recipeStore"
import deleteRecipe  from "./recipeStore"

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  
  const handleClick = () => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  return (
    <button
      onClick={handleClick}
    >
      Delete
    </button>
  );
};

deleteRecipe()

export default DeleteRecipeButton;
