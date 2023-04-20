const workedit = document.querySelector('.edition');


modifier1.addEventListener('click', () => {
        workedit.classList.add("active");
});

closeedit.addEventListener('click', () => {
        workedit.classList.remove("active");
});

const container3 = document.querySelector('.works');
const getWorks2 = () => {
    container3.innerHTML=''
    fetch('http://localhost:5678/api/works')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        for(work in data)     {
            container3.innerHTML += `
            <figure>
            <img id="workimg${data[work].id}" src=${data[work].imageUrl}>
            <div id="movework"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
            <div class="deletework"><i class="fa-solid fa-trash-can"></i></div>
            <figcaption>éditer</figcaption>
            </figure>`
            var workimg = document.querySelector('#workimg'+data[work].id);
            var movework = document.querySelector('#movework i');
            console.log(movework);

            workimg.addEventListener('mouseover', () => {
                movework.classList.add("active");
            });
            workimg.addEventListener('mouseout', () => {
                movework.classList.remove("active");
            });
        }        
        
    })
}

getWorks2()
