export function createRecipeCard(recipe) {
  return `
    <div class="recipe-card">
      <div class="recipe-image" style="background-image: url('${recipe.image}')"></div>
      <div class="recipe-content">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <div class="recipe-details">
          <span class="recipe-time">
            <i class="far fa-clock"></i> ${recipe.cookTime}
          </span>
          <span class="recipe-servings">
            <i class="fas fa-users"></i> ${recipe.servings}
          </span>
        </div>
      </div>
    </div>
  `;
}

export function renderRecipes(recipes) {
  const recipeGrid = document.querySelector('.recipe-grid');
  recipeGrid.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
}

