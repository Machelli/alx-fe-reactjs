const DeleteRecipeButton = ({ recipeId, openModal }) => {
  
  const handleClick = () => {
    openModal(recipeId);
  };

  return (
    <button
      onClick={handleClick}
      
    >
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
