import useRecipeStore from "./recipeStore"
import { useState } from "react";

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

