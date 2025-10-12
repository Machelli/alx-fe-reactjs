import React, { useState, useEffect } from 'react';
import recipeData from '../data.json';

export default function RecipeÇomponent() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

return (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map(recipe => (
        <div 
          key={recipe.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
            <p className="text-gray-700">{recipe.summary}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};