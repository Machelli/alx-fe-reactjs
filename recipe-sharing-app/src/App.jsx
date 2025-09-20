import React, { useState } from 'react';
import { create } from 'zustand';
import { createBrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import AddRecipeForm from './AddRecipeForm';
import EditRecipeForm from './EditRecipeForm';


const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish with eggs, cheese, and pork.', tags: ['italian', 'pasta', 'dinner'], isFavorite: false },
    { id: 2, title: 'Chicken Tikka Masala', description: 'A staple of Indian cuisine with marinated chicken in a creamy curry sauce.', tags: ['indian', 'chicken', 'spicy'], isFavorite: false },
    { id: 3, title: 'Classic Beef Lasagna', description: 'Layers of pasta, rich bolognese, creamy béchamel, and melted cheese.', tags: ['italian', 'pasta', 'beef'], isFavorite: false },
    { id: 4, title: 'Vegetable Stir-Fry', description: 'A quick and healthy meal with assorted fresh vegetables.', tags: ['asian', 'vegetarian', 'quick'], isFavorite: false },
    { id: 5, title: 'Shrimp Scampi', description: 'A light and flavorful seafood pasta dish with garlic and lemon.', tags: ['seafood', 'pasta', 'quick'], isFavorite: false },
    { id: 6, title: 'Spicy Thai Curry', description: 'A vibrant curry with coconut milk, vegetables, and a kick of spice.', tags: ['thai', 'spicy', 'vegetarian'], isFavorite: false },
    { id: 7, title: 'Chicken Alfredo', description: 'Creamy pasta dish with chicken and a rich Parmesan sauce.', tags: ['italian', 'pasta', 'chicken'], isFavorite: false },
    { id: 8, title: 'Miso Glazed Salmon', description: 'Flaky salmon with a savory and sweet miso glaze.', tags: ['japanese', 'fish', 'quick'], isFavorite: false },
    { id: 9, title: 'Spicy Beef Tacos', description: 'Ground beef seasoned with spices in a crispy taco shell.', tags: ['mexican', 'beef', 'spicy'], isFavorite: false },
    { id: 10, title: 'Margherita Pizza', description: 'Simple and classic pizza with fresh mozzarella, basil, and tomatoes.', tags: ['italian', 'pizza', 'vegetarian'], isFavorite: false },
  ],
  searchTerm: '',
  filteredRecipes: [],

  /**
   * Toggles a recipe as a favorite based on its ID.
   * This is a key action for the recommendation system.
   * @param {number} recipeId The ID of the recipe to toggle.
   */
  toggleFavorite: (recipeId) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    )
  })),

  /**
   * Sets the search term and triggers the recipe filtering process.
   * @param {string} term The search term entered by the user.
   */
  setSearchTerm: (term) => set({ searchTerm: term }),

  /**
   * Filters recipes based on the current search term.
   */
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
  })),

  /**
   * Adds a new recipe to the store.
   * @param {object} newRecipe The recipe object to add.
   */
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now(), isFavorite: false }]
  })),

  /**
   * Deletes a recipe by its ID.
   * @param {number} id The ID of the recipe to delete.
   */
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),

  /**
   * Updates an existing recipe.
   * @param {object} updatedRecipe The recipe object with updated values.
   */
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
}));

/**
 * A modal component for confirming actions.
 * @param {object} props The component props.
 * @param {boolean} isOpen Whether the modal is open.
 * @param {string} message The message to display.
 * @param {function} onConfirm The function to call on confirm.
 * @param {function} onClose The function to call on close.
 */
const Modal = ({ isOpen, message, onConfirm, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-btn">Yes</button>
        <button onClick={onClose} className="cancel-btn">No</button>
      </div>
    </div>
  );
};

/**
 * The main component for listing and managing recipes.
 * This component now includes sections for favorites and recommendations.
 */
const RecipeList = () => {
  const navigate = useNavigate();
  const {
    recipes, toggleFavorite, searchTerm, setSearchTerm, filteredRecipes, filterRecipes, deleteRecipe
  } = useRecipeStore();
  const [modal, setModal] = useState({ isOpen: false, recipeId: null });

  // Filter recipes whenever the search term or recipes list changes.
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes, filterRecipes]);

  const openModal = (id) => {
    setModal({ isOpen: true, recipeId: id });
  };

  const closeModal = () => {
    setModal({ isOpen: false, recipeId: null });
  };

  const confirmDelete = () => {
    deleteRecipe(modal.recipeId);
    closeModal();
  };

  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  // --- Recommendations Logic ---
  const favoriteTags = recipes.filter(r => r.isFavorite).flatMap(r => r.tags || []);
  const tagCounts = favoriteTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  const recommendedRecipes = recipes
    .filter(r => !r.isFavorite)
    .map(recipe => {
      let score = 0;
      if (recipe.tags && Array.isArray(recipe.tags)) {
        recipe.tags.forEach(tag => {
          score += tagCounts[tag] || 0;
        });
      }
      return { ...recipe, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter(recipe => recipe.score > 0)
    .slice(0, 3); // Display top 3 recommendations.

  // Helper function to render a list of recipes based on the provided data and title.
  const renderRecipeList = (list, title, noRecipesMessage) => {
    return (
      <div>
        <h3>{title}</h3>
        {list.length > 0 ? (
          <ul>
            {list.map(recipe => (
              <li key={recipe.id} className="recipe-item">
                <div className="recipe-header">
                  <h4>{recipe.title}</h4>
                  <button onClick={() => toggleFavorite(recipe.id)} className="favorite-btn">
                    <span>{recipe.isFavorite ? '★' : '☆'}</span>
                  </button>
                </div>
                <p>{recipe.description.substring(0, 75)}...</p>
                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe.id}`}><button>View</button></Link>
                  <Link to={`/edit/${recipe.id}`}><button>Edit</button></Link>
                  <button onClick={() => openModal(recipe.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{noRecipesMessage}</p>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="header">Available Recipes</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Link to="/add"><button>Add New Recipe</button></Link>
      </div>
      <hr />

      {/* Recommended Recipes Section */}
      {renderRecipeList(recommendedRecipes, 'Recommended for You', 'Favorite a few recipes to see personalized recommendations!')}
      <hr />

      {/* Favorite Recipes Section */}
      {renderRecipeList(recipes.filter(r => r.isFavorite), 'Your Favorites', 'You have not favorited any recipes yet.')}
      <hr />

      {/* All Recipes Section */}
      {renderRecipeList(recipesToDisplay, 'All Recipes', 'No recipes found. Try adjusting your search.')}

      <Modal
        isOpen={modal.isOpen}
        message="Are you sure you want to delete this recipe?"
        onConfirm={confirmDelete}
        onClose={closeModal}
      />
    </div>
  );
};

/**
 * Component for viewing a single recipe in detail.
 */
const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="details-container">
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
    <div className="form-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
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
    <div className="form-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
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

/**
 * The main application component that sets up the router and layout.
 */
export default function App() {
  const routes = [
    { path: '/', element: <RecipeList /> },
    { path: '/recipe/:id', element: <RecipeDetails /> },
    { path: '/add', element: <AddRecipeForm /> },
    { path: '/edit/:id', element: <EditRecipeForm /> }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

