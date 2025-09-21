import useRecipeStore from "./recipeStore"
import DeleteRecipeButton from "./DeleteRecipeButton"
import EditRecipeForm from "./EditRecipeForm";



const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <button onClick={() => navigate(-1)}>Back to List</button>
    </div>
  );
};






