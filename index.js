document.addEventListener('DOMContentLoaded', () => {

    // Functions
    function renderFilter() {
        fetchData('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(data => createFilterOptions(data))
    }

    function createFilterOptions(dataObj) {
        const filterMenu = document.querySelector('#select-ingredient')
        dataObj.drinks.forEach(ingredient => {
            const inOption = document.createElement('option')
            inOption.value = ingredient.strIngredient1
            inOption.textContent = ingredient.strIngredient1
            filterMenu.append(inOption)
        });
    }

    function fetchData(url) {
        return fetch(url)
        .then(res => res.json())
    }

    function displayCocktails(dataObj) {
        const menu = document.querySelector('#cocktail-menu')
        dataObj.drinks.forEach(cocktail => {
            const div = document.createElement('div')
            const img = document.createElement('img')
            const name = document.createElement('h4')
            img.src = cocktail.strDrinkThumb
            name.textContent = cocktail.strDrink
            div.append(img, name)
            menu.appendChild(div)
        });
    }

    renderFilter()
    
    // fetchData('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
    .then(res => res.json())
    .then(data => console.log(data.drinks))
})