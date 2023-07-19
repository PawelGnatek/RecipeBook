const API_KEY = "323bb582a45047a792efb7cf4d8ff36e"
const recipeListEl = document.getElementById("recipe-list")

function displayRecipes(recipes) {
  recipeListEl.innerHTML = ""

  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li")
    recipeItemEl.classList.add("recipe-item")

    recipeImageEl = document.createElement("img")
    recipeImageEl.src = recipe.image
    recipeImageEl.alt = "recipe image"

    const recipeTitleEl = document.createElement("h2")
    recipeTitleEl.innerHTML = recipe.title

    const recipeIngredientsEl = document.createElement("p")
    recipeIngredientsEl.innerHTML = `<strong>Ingredients:</strong> 
        ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}`

    const recipeLinkEl = document.createElement("a")
    recipeLinkEl.href = recipe.sourceUrl
    recipeLinkEl.innerText = "View Recipe"

    recipeItemEl.appendChild(recipeImageEl)
    recipeItemEl.appendChild(recipeTitleEl)
    recipeItemEl.appendChild(recipeIngredientsEl)
    recipeItemEl.appendChild(recipeLinkEl)

    recipeListEl.appendChild(recipeItemEl)
  })
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=15&apiKey=${API_KEY}`
  )

  const data = await response.json()

  return data.recipes
}

async function init() {
  const recipes = await getRecipes()
  displayRecipes(recipes)
}

init()
