document.addEventListener('DOMContentLoaded', () => {
    // Global Variables
    const updateForm = document.querySelector('#edit-cocktail')
    let curCocktail = {}

// Basic Reusable Fetch Request
    function fetchData(url) {
        return fetch(url)
        .then(res => res.json())
    }

// Rendering Functions
    // This function populates the cocktail menu with a list of cocktails given by a fetch request
    function renderCocktailMenu(url) {
        fetchData(url)
        .then(data => {
            renderEachCocktail(data)
            renderOneCocktail(data.drinks[0])
            updateForm.addEventListener('submit', handleForm)
        })
    }

    // This function creates an image and title element for each cocktail and appends to the menu
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

    // This function populates the detailed section with the selected cocktail
    function renderOneCocktail(cocktail) {
        const detailRating = document.querySelector('#rating')
        const detailComment = document.querySelector('#comment')
        const detailName = document.querySelector('#name')
        const detailRecipe = document.querySelector('#recipe')
        const detailImage = document.querySelector('#detail-image')

        curCocktail = cocktail
        detailRating.textContent = curCocktail.rating
        detailComment.textContent = curCocktail.comment
        
        fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${curCocktail.idDrink}`)
        .then(data => {
            detailImage.src = data.drinks[0].strDrinkThumb
            detailName.textContent = data.drinks[0].strDrink
            detailRecipe.textContent = data.drinks[0].strInstructions
        })
    }

    // This function updates the rating and comment when the update form is submitted
    function handleForm(e) {
        e.preventDefault()
        curCocktail['rating'] = e.target['update-rating'].value
        curCocktail['comment'] = e.target['update-comment'].value
        renderOneCocktail(curCocktail)
        updateForm.reset()
    }

    // This function generates the dropdown selection of ingredients to filter by
    function renderFilter() {
        fetchData('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(data => renderFilterOptions(data))
    }

    // This function creates an option element for each ingredient and appends to the selection
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


    // Invoking Functions
    renderFilter()
    renderCocktailMenu(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)

})