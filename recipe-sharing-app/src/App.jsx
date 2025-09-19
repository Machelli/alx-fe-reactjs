import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecipeList from './components/RecipeList.jsx'
import AddRecipeForm from './components/AddRecipeForm.jsx'



function App() {
 

  return (
   
   <div className="App">
      <header>
        <h1>Recipe Sharing Application</h1>
      </header>
      <div className="content">
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
}

export default App
