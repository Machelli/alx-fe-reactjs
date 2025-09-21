import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RecommendationsList from './components/RecommendationsList.jsx'
import FavoritesList from './components/FavoritesList.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

<FavoritesList/>

<RecommendationsList />


