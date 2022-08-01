document.addEventListener('DOMContentLoaded', () => {
    // Global Variables
    const rating = document.querySelector('#rating')
    const comment = document.querySelector('#comment')
    const form = document.querySelector('#edit-cocktail')
    let curCocktail = {}

    // Fetch Request
    function fetchData(url) {
        return fetch(url)
        .then(res => res.json())
    }

    // Rendering Functions
    function renderFilter() {
        fetchData('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(data => renderFilterOptions(data))
    }

    function renderFilterOptions(dataObj) {
        const filterMenu = document.querySelector('#select-ingredient')
        dataObj.drinks.forEach(ingredient => {
            const ingOption = document.createElement('option')
            ingOption.value = ingredient.strIngredient1
            ingOption.textContent = ingredient.strIngredient1
            filterMenu.append(ingOption)
        });
    }

    function renderCocktailMenu(url) {
        fetchData(url)
        .then(data => {
            renderEachCocktail(data)
            renderOneCocktail(data.drinks[0])
            form.addEventListener('submit', handleForm)
        })
    }

    function renderEachCocktail(dataObj) {
        const menu = document.querySelector('#cocktail-menu')
        dataObj.drinks.forEach(cocktail => {
            const div = document.createElement('div')
            const img = document.createElement('img')
            const name = document.createElement('h4')
            img.src = `${cocktail.strDrinkThumb}/preview`
            name.textContent = cocktail.strDrink
            div.append(img, name)
            menu.appendChild(div)

            img.addEventListener('click', () => renderOneCocktail(cocktail))
        });
    }

    function renderOneCocktail(cocktail) {
        const name = document.querySelector('#name')
        const recipe = document.querySelector('#recipe')
        const detailImage = document.querySelector('#detail-image')

        fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`)
        .then(data => {
            curCocktail = data.drinks[0]
            console.log(curCocktail)
            detailImage.src = curCocktail.strDrinkThumb
            name.textContent = curCocktail.strDrink
            recipe.textContent = curCocktail.strInstructions
            rating.textContent = curCocktail.rating
            comment.textContent = curCocktail.comment
        })
    }

    function handleForm(e) {
        e.preventDefault()
        curCocktail.rating = e.target['update-rating'].value
        curCocktail.comment = e.target['update-comment'].value
        rating.textContent = curCocktail.rating
        comment.textContent = curCocktail.comment
        form.reset()
    }

    // Invoking Functions
    renderFilter()
    renderCocktailMenu(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)


    // fetchData('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
    .then(res => res.json())
    .then(data => console.log(data.drinks))
})