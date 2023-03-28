const container = document.querySelector('.filters');

const getCategories = () => {
    fetch('http://localhost:5678/api/categories')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log (data)
        for(categorie in data)     {
            container.innerHTML += 
            `<nav>
            <a href="">${data[categorie].name}</a>
            </nav>`
        }        
        
    })
}

getCategories()


const container2 = document.querySelector('.gallery');

const getWorks = () => {
    fetch('http://localhost:5678/api/works')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log (data)
        for(work in data)     {
            container2.innerHTML += `<figure>
            <img src=${data[work].imageUrl}>
            <figcaption>${data[work].title}</figcaption>
        </figure>`
        }        
        
    })
}

getWorks()