/* ---------------------------------------- Call API Login ----------------------------------------*/

const formLogIn = document.querySelector('.login_form')
formLogIn.addEventListener('submit', function (event) {
    event.preventDefault()
    // Création de l’objet de connexion
    const logIn = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    console.log(logIn)
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(logIn);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: chargeUtile
    })
    .then(response => {              
        if (!response.ok){                   
            if(response.status === 404){              
                showError('user-error', 'Utilisateur non trouvée')
                             
            }
            if(response.status === 401){
                showError('password-error', 'Mot de passe incorrect')
            }
            throw new Error("Le serveur n'a pas répondu correctement. Erreur :" + response.status)
        } 
        return response.json()
    })
    .then(data => {    
        window.location.href = 'index.html'                    
        localStorage.setItem('Token', JSON.stringify(data.token))        
    })
    .catch(error => {      
        console.error(error)
    })
})

/* ---------------------------------------- Error Message Form ----------------------------------------*/

// Affiche l'erreur

const showError = (errorElement, errorMessage) => {
    document.querySelector("."+errorElement).classList.add("display-error")
    document.querySelector('.'+errorElement).innerHTML = errorMessage
}

// Efface l'erreur

const clearError = () => {
    let errors = document.querySelectorAll('.error')
    for(let error of errors){
        error.classList.remove('display-error')
    }
}

// Gestion de l'erreur

let form = document.forms['login_form']

form.onsubmit = function(event){
    
    clearError()

    if (form.email.value === ''){
        showError('email-error', 'Email requis')
        return false
    }

    if (form.password.value === ''){
        showError('password-error', 'Mot de passe requis')
        return false
    }

    event.preventDefault()
}
