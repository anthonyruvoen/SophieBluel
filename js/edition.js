const workedit = document.querySelector('.edition');
const bgedit = document.querySelector('.bgedit');
const addwork = document.querySelector('.addwork');
const addphoto = document.querySelector('#addphotobutton');
const newimg = document.querySelector('.newimg')
const imgdisplay = document.querySelector('#img');
const emptyimg = document.querySelector('.emptyimg');

// Ouverture et fermeture de la modale d'édition principale

modifier1.addEventListener('click', () => {
        workedit.classList.add("active");
});

closeedit.addEventListener('click', () => {
        workedit.classList.remove("active");
});
bgedit.addEventListener('click', () => {
        workedit.classList.remove("active");
});


// Récupération et affichage des travaux sur la page d'édition

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
            <img id="workimg" src=${data[work].imageUrl}>
            <div id="movework"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
            <div class="deletework"><i class="fa-solid fa-trash-can"></i></div>
            <figcaption>éditer</figcaption>
            </figure>`
        }       

//Suppression d'un travail au clic sur la poubelle

    const deleteWork = document.querySelector('.deletework i');
            
            deleteWork.addEventListener('click', (e) => {
                console.log(data.id);
            });
    })
}

getWorks2()


// ouverture et fermeture de la page d'ajout de projet

addphoto.addEventListener('submit', (e) => {
    e.preventDefault();
    addwork.classList.add("active");
    workedit.classList.remove("active");
});
back.addEventListener('click', () => {
    addwork.classList.remove("active");
    workedit.classList.add("active");
});
closeedit2.addEventListener('click', () => {
    addwork.classList.remove("active");
    workedit.classList.remove("active");
    newimg.style.display = 'none';
    emptyimg.style.display = 'block';
    file.value = '';
});




//Ajout d'un nouveau projet/photo

const file = document.querySelector('#file');

file.addEventListener('change', previewFile);

function previewFile() {

    const fileregex = /\.(jpe?g|png)$/i;

    if (this.files.length === 0 || !fileregex.test(this.files[0].name)) {
        return;
    }
    const newfile = this.files[0];
    const newfileReader = new FileReader();
    newfileReader.readAsDataURL(newfile);
    newfileReader.addEventListener('load', (e) => displayImage(e, file))
}

displayImage = (e, file) => {
    
    imgdisplay.src = e.target.result;
    newimg.appendChild(imgdisplay);
    newimg.style.display = 'flex';
    emptyimg.style.display = 'none';
    


}