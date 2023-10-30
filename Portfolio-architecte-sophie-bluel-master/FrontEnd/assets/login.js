/* ---------------------------------------- Call API Login ----------------------------------------*/
/* Fetch Connect
Événement qui permet de se connecter au site web */
const formLogIn = document.querySelector('.login_form')
formLogIn.addEventListener('submit', function (event) {
    event.preventDefault()
    // Création de l’objet de connexion
    const logIn = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    if (logIn.email === ''){
        clearError()
        showError('email-error', 'Email requis')
        return
    }
    if (logIn.password === ''){
        clearError()
        showError('password-error', 'Mot de passe requis')
        return
    }
    try {
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(logIn);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: chargeUtile
        })
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }
                if(res.status === 404){
                    clearError()
                    showError('user-error', 'Utilisateur introuvable')
                    document.getElementById('password').value = ''
                    throw new Error('Utilisateur Introuvable')
                }
                if(res.status === 401){
                    clearError()
                    showError('password-error', 'Email ou Mot de passe incorrect')
                    document.getElementById('password').value = ''
                    throw new Error('Email ou Mot de passe incorrect')
                }
            })
            .then(data => {
                localStorage.setItem('BearerAuth', JSON.stringify(data))
                location.href = 'index.html'
            })
    }
    catch(error) {
        console.log(error)
    }
})
/* ---------------------------------------- Error Message Form ----------------------------------------*/
// Affiche l'erreur
const showError = (errorElement, errorMessage) => {
    document.querySelector('.'+errorElement).classList.add('display_error')
    document.querySelector('.'+errorElement).innerHTML = errorMessage
}
// Efface l'erreur
const clearError = () => {
    const errors = document.querySelectorAll('.error')
    for(const error of errors){
        error.classList.remove('display_error')
    }
}