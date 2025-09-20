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

/**
 * Component for adding a new recipe.
 */
const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const addRecipe = useRecipeStore(state => state.addRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    addRecipe(newRecipe);
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated, e.g., 'italian, pasta, dinner')"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Add Recipe</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

/**
 * Component for editing an existing recipe.
 */
const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();
  const recipeToEdit = recipes.find(r => r.id === parseInt(id));

  const [title, setTitle] = useState(recipeToEdit?.title || '');
  const [description, setDescription] = useState(recipeToEdit?.description || '');
  const [tags, setTags] = useState(recipeToEdit?.tags.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      id: parseInt(id),
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isFavorite: recipeToEdit.isFavorite // Preserve the favorite status
    };
    updateRecipe(updatedRecipe);
    navigate('/');
  };

  if (!recipeToEdit) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Update Recipe</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};
