import useRecipeStore from "./recipeStore"
import DeleteRecipeButton from "./DeleteRecipeButton"
import { Link,} from 'react-router-dom';

const RecipeList = () => {
  const navigate = useNavigate();
  const {
    recipes, toggleFavorite, searchTerm, setSearchTerm, filteredRecipes, filterRecipes, deleteRecipe
  } = useRecipeStore();
  const [modal, setModal] = useState({ isOpen: false, recipeId: null });

  
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
    .slice(0, 3); 

  const renderRecipeList = (list, title, noRecipesMessage) => {
    return (
      <div>
        <h3>{title}</h3>
        {list.length > 0 ? (
          <ul>
            {list.map(recipe => (
              <li key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>{recipe.title}</h4>
                  <button onClick={() => toggleFavorite(recipe.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5em' }}>
                    <span>{recipe.isFavorite ? '★' : '☆'}</span>
                  </button>
                </div>
                <p>{recipe.description.substring(0, 75)}...</p>
                <div>
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Available Recipes</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flexGrow: 1, marginRight: '10px' }}
        />
        <Link to="/add"><button style={{ padding: '8px 16px' }}>Add New Recipe</button></Link>
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


