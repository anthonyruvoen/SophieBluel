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
            <div class="deletework" id=${data[work].id}><i class="fa-solid fa-trash-can"></i></div>
            <div><img id="workimg" src=${data[work].imageUrl}>
            <figcaption>éditer</figcaption>
            </div>
            </figure>`

            // Suppression d'un travail au clic sur la poubelle
            
            let trashBtn = document.querySelectorAll('.deletework');
            
                for (let i = 0; i < trashBtn.length; i++) {
                    trashBtn[i].addEventListener('click', () => {
                        const confirmYes = confirm('Confirmer la suppression ?')
                        if (confirmYes) {
                            let id = trashBtn[i].id;
                            fetch(`http://localhost:5678/api/works/` + id, {
                                method: "DELETE",
                                body: null,
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },     
                            })
                            .then(function () {
                                getWorks();
                                getWorks2();
                            });
                        }
                    })
                }
        }           
    })
}
getWorks2();




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
const errormsg = document.querySelector('#errormsg');

formvalidation.addEventListener('change', () => {
    if ((worktitle.value !== '' 
    && categorieSelect.value !== '' 
    && newimg.style.display === 'flex')) {
        submitbutton.classList.add('active');
        errormsg.style.display = 'none';
    } else {  
        submitbutton.classList.remove('active');
        errormsg.style.display = 'flex';
    }
});



// Valider l'ajout d'un projet


formvalidation.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    
    const userFile = document.getElementById('file').files[0];
    const userTitle = document.getElementById('worktitle').value;
    const userCategory = document.getElementById('categorie-select').value;
    
    const formData = new FormData();
    formData.append('image', userFile, 'image.jpg');
    formData.append('title', userTitle);
    formData.append('category', userCategory);
    
    fetch('http://localhost:5678/api/works', {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },     
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .then(function () {
        addwork.classList.remove("active");
        workedit.classList.remove("active");
        body.style.overflow = null;
        worktitle.value = "";
        categorieSelect.value = "";
        emptyimg.style.display = "block";
        newimg.style.display = "none";
        imgdisplay.src = "";
        submitbutton.classList.remove("active");
    })
    .then(function () {
        getWorks();
        getWorks2();

    })          
});
    