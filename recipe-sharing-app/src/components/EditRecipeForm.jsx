import { useState } from "react"
import useRecipeStore from "./recipeStore"


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
      isFavorite: recipeToEdit.isFavorite 
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