import { useState } from "react";
import useRecipeStore from "./recipeStore";


const ConfirmationModal = ({ closeModal, handleDeleteConfirmed }) => {
  return (
    <div>
      <div>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
        <div>
          <button
            onClick={closeModal}

          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirmed}
           
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  
  const { view, selectedId, navigateToList, navigateToDetails, navigateToAdd, navigateToEdit } = useRouting();

  
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  
  const [showModal, setShowModal] = useState(false);
  const [recipeToDeleteId, setRecipeToDeleteId] = useState(null);

  
  const openModal = (id) => {
    setRecipeToDeleteId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setRecipeToDeleteId(null);
  };
  const handleDeleteConfirmed = () => {
    if (recipeToDeleteId) {
      deleteRecipe(recipeToDeleteId);
      closeModal();
      navigateToList(); 
    }
  };

  
  const renderContent = () => {
    switch (view) {
      case 'details':
        return <RecipeDetails recipeId={selectedId} navigateToEdit={navigateToEdit} navigateToList={navigateToList} openModal={openModal} />;
      case 'edit':
        return <EditRecipeForm recipeId={selectedId} navigateToList={navigateToList} />;
      case 'add':
        return <AddRecipeForm navigateToList={navigateToList} />;
      case 'list':
      default:
        return <RecipeList navigateToDetails={navigateToDetails} navigateToEdit={navigateToEdit} navigateToAdd={navigateToToAdd} openModal={openModal} />;
    }
  };

  return (
    <div>
      <div>
        <header>
          <h1>Recipe Sharing App</h1>
          <p>Discover, add, and manage your favorite recipes.</p>
        </header>
        <main>
          {}
          {renderContent()}
        </main>
      </div>
      {}
      {showModal && <ConfirmationModal closeModal={closeModal} handleDeleteConfirmed={handleDeleteConfirmed} />}
    </div>
  );
}
