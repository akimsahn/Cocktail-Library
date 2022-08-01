document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#cocktail-menu')

    function fetchCocktails(url) {
        fetch(url)
        .then(res => res.json())
        .then(data => displayCocktails(data))
    }

    function displayCocktails(dataObj) {
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

    fetchCocktails('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka')

    // fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka`)
    // .then(res => res.json())
    // .then(data => console.log(data.drinks))
})