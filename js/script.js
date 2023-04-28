const container2 = document.querySelector('.filters');
const allbutton = document.querySelector('#all');


const getCategories = () => {
    fetch('http://localhost:5678/api/categories')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        for(categorie in data)     {
            container2.innerHTML += 
            `<button id="${data[categorie].id}">${data[categorie].name}</button>`
        }       
        let filters = document.querySelectorAll(".filters button");

        for(let filter of filters){
            filter.addEventListener("click", function(e){
               console.log(filter);
               let categoryid=e.target.getAttribute('id')
               getWorks(categoryid)
            }
            );
        }
    })
}

getCategories()



const container = document.querySelector('.gallery');
const getWorks = (categoryid) => {
    container.innerHTML=''
    fetch('http://localhost:5678/api/works')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log (data)
        if (categoryid && categoryid !== "all") {
            data=data.filter(x => x.categoryId==categoryid)
        }
        for(work in data)     {
            container.innerHTML += `<figure>
            <img src=${data[work].imageUrl}>
            <figcaption>${data[work].title}</figcaption>
        </figure>`
        }        
        
    })
}

getWorks()


