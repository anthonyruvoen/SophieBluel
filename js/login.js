const loginModal = document.getElementById("logininput");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("#connectbutton");
const incorrect = document.getElementById("incorrect");
const editionMode = document.getElementById("adminbar");
const editionMode2 = document.getElementById("modifier1");
const editionMode3 = document.getElementById("modifier2");


// Au clic sur le bouton login, faire apparaitre la modale de connexion

loginbutton.addEventListener('click', () => {
    if (loginbutton.textContent === "login") {
        loginModal.classList.add("active");
        body.style.overflow = "hidden";
    } else if (loginbutton.textContent === "logout") {
        localStorage.clear();
        loginModal.classList.remove("active");
        loginbutton.textContent = "login";
        editionMode.style.marginTop = "-80px";
        editionMode.style.visibility = "hidden";
        editionMode2.style.visibility = "hidden";
        editionMode3.style.visibility = "hidden";
        container2.style.visibility = "visible";
        container2.style.height = "auto";
    }
});

// Au clic sur le background, fermer la modale de connexion
bglogin.addEventListener('click', () => {
    loginModal.classList.remove("active");
    incorrect.style.visibility = "hidden";
    body.style.overflow = null;
    email.value = "";
    password.value = "";
});

// Connexion de l'utilisateur
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify ({
            "email": email.value,
            "password": password.value,
        })
    }
    fetch('http://localhost:5678/api/users/login', requestOption)
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        localStorage.setItem("token", data.token);
        email.value = "";
        password.value = "";
        if (data.token = data.token) {
            all.click();
            loginModal.classList.remove("active");
            incorrect.style.visibility = "hidden";
            loginbutton.textContent = "logout";
            editionMode.style.marginTop = "0";
            editionMode.style.visibility = "visible";
            editionMode2.style.visibility = "visible";
            editionMode3.style.visibility = "visible";
            container2.style.visibility = "hidden";
            container2.style.height = "20px";
            body.style.overflow = null;
        } else {
            incorrect.style.visibility = "visible";
        }
    });
});






//       mail : sophie.bluel@test.tld
//    mot de passe : S0phie