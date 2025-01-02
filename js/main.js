import { recipes } from './data/recipes.js';
import { renderRecipes } from './utils/recipeRenderer.js';

// Initialize with all recipes
function getAllRecipes() {
  return Object.values(recipes).flat();
}

// Set up category tabs
function initializeCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get category and render recipes
      const category = tab.textContent.toLowerCase();
      if (category === 'all') {
        renderRecipes(getAllRecipes());
      } else {
        renderRecipes(recipes[category] || []);
      }
    });
  });
  
  // Initial render with all recipes
  renderRecipes(getAllRecipes());
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCategoryTabs);