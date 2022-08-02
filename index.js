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
        filterMenu.addEventListener('change', (e) => {
            let alcohol = e.target.value.replace(/\s/g,"_")
            renderCocktailMenu(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
        })
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

        document.querySelectorAll('div.displayed').forEach(e => e.remove())

        dataObj.drinks.forEach(cocktail => {

            const div = document.createElement('div')
            const img = document.createElement('img')
            const name = document.createElement('h4')
            img.src = `${cocktail.strDrinkThumb}/preview`
            name.textContent = cocktail.strDrink
            div.classList.add('displayed')
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
            detailImage.src = data.drinks[0].strDrinkThumb
            name.textContent = data.drinks[0].strDrink
            recipe.textContent = data.drinks[0].strInstructions
        })
    }

    function handleForm(e) {
        e.preventDefault()
        rating.textContent = e.target['update-rating'].value
        comment.textContent = e.target['update-comment'].value
        form.reset()
    }

    // Invoking Functions
    renderFilter()
    renderCocktailMenu(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
})