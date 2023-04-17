const logginModal = document.getElementById("logininput");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");



logginbutton.addEventListener('click', () => {
    logginModal.classList.add("active");
});
bglogin.addEventListener('click', () => {
    logginModal.classList.remove("active");
});




form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(email.value);
    // console.log(password.value);
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
        // ajouter conditions si identifiants incorrects
console.log(data.token);   
 })






//     const emailChecker = (value) => {
//         if (value.match("sophie.bluel@test.tld")) {
//             email = value;
//         } else {
//             incorrect.style.visibility = 'visible';
//         }
//       };
//     const passwordChecker = (value) => {
//         if (value.match("S0phie")) {
//           password = value;
//         } else {
//             incorrect.style.visibility = 'visible';
//         }
//       };
  });