const workedit = document.querySelector('.edition');
const bgedit = document.querySelector('.bgedit');
const addwork = document.querySelector('.addwork');
const addphoto = document.querySelector('#addphotobutton');
const emptyimg = document.querySelector('.emptyimg');
const newimg = document.querySelector('.newimg')
const imgdisplay = document.querySelector('#img');
const body = document.querySelector('body');

// Ouverture et fermeture de la modale d'édition principale

modifier1.addEventListener('click', () => {
        workedit.classList.add("active");
        body.style.overflow = "hidden";
});

closeedit.addEventListener('click', () => {
        workedit.classList.remove("active");
        body.style.overflow = null;
        worktitle.value = "";
        categorieSelect.value = "";
        emptyimg.style.display = "block";
        imgdisplay.src = "";
        submitbutton.classList.remove("active");
});
bgedit.addEventListener('click', () => {
        workedit.classList.remove("active");
        body.style.overflow = null;
        worktitle.value = "";
        categorieSelect.value = "";
        emptyimg.style.display = "block";
        imgdisplay.src = "";
        submitbutton.classList.remove("active");
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
            <div class="movework"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
            <div class="deletework"><i class="fa-solid fa-trash-can"></i></div>
            <div><img id="workimg" src=${data[work].imageUrl}>
            <figcaption>éditer</figcaption>
            </div>
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
    body.style.overflow = null;
    worktitle.value = "";
    categorieSelect.value = "";
    emptyimg.style.display = "block";
    newimg.style.display = "none";
    imgdisplay.src = "";
    submitbutton.classList.remove("active");
});




//Ajout d'un nouveau projet/photo

const file = document.querySelector('#file');

file.addEventListener('change', () => {
    imgdisplay.src = "";
});
file.addEventListener('change', previewFile);

function previewFile() {

    const fileregex = /\.(jpe?g|png)$/i;

    if (this.files.length === 0 || !fileregex.test(this.files[0].name)) {
        return;
    }
    const newfile = this.files[0];
    const newfileReader = new FileReader();
    newfileReader.readAsDataURL(newfile);
    newfileReader.addEventListener('load', (e) => 
    displayImage(e, file))
}

displayImage = (e, file) => {
    
    imgdisplay.src = e.target.result;
    newimg.appendChild(imgdisplay);
    newimg.style.display = 'flex';
    emptyimg.style.display = 'none';
}

// Changer la couleur du bouton valider quand les champs sont remplis
const worktitle = document.querySelector('#worktitle');
const categorieSelect = document.querySelector('#categorie-select');
const formvalidation = document.querySelector('#validatework');

formvalidation.addEventListener('change', () => {
    if ((worktitle.value !== "" 
    && categorieSelect.value !== "" 
    && newimg.style.display === 'flex')) {
        submitbutton.classList.add("active");
    } else {  
        submitbutton.classList.remove("active");
    }
});


// Valider l'ajout d'un projet


submitbutton.addEventListener('click', (e) => {
    e.preventDefault();
    const sendImg = {
        method: "POST",
        body: JSON.stringify({
            category: `{id: ${categorieSelect.value}, name: ${categorieSelect.value}}`,
            imageUrl: imgdisplay.files,
            title: worktitle.value,
            }),
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
    };
    fetch('http://localhost:5678/api/works', sendImg)
    .then((res)  => {

        console.log(sendImg.body)
        return res.json()
    })
    .then(() => {
        addwork.classList.remove("active");
        workedit.classList.remove("active");
        body.style.overflow = null;
        container.innerHTML += `<figure>
            <img src=${imgdisplay.src}>
            <figcaption>${worktitle.value}</figcaption>
        </figure>`
    });
 });