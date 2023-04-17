const logginModal = document.getElementById("logininput");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
const incorrect = document.getElementById("incorrect");


// Au clic sur le bouton login, faire apparaitre la modale de connexion
logginbutton.addEventListener('click', () => {
    logginModal.classList.add("active");
});
// Au clic sur le background, fermer la modale de connexion
bglogin.addEventListener('click', () => {
    logginModal.classList.remove("active");
    incorrect.style.visibility = "hidden"
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
            logginModal.classList.remove("active");
            incorrect.style.visibility = "hidden";
        } else {
            incorrect.style.visibility = "visible";
        }
    });
});






//       mail : sophie.bluel@test.tld
//    mot de passe : S0phie