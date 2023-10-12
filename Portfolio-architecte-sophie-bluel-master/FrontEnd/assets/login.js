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
    .then((res) => res.json())
    .then((data) => {             
        //Conditions pour la connexion
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if(email !== 'sophie.bluel@test.tld'){
            alert('Email Incorrect')
        }
        else
        if(password !== 'S0phie'){
            alert('Mot de passe Incorrect')
        }      
        else
        if(email !== 'sophie.bluel@test.tld' && password !== 'S0phie'){
            alert('Email et Mot de passe Incorrect')
        }
        else    
        if(email === 'sophie.bluel@test.tld' && password === 'S0phie'){
            window.location.href = "file:///C:/Users/util/Desktop/FormationOC/Portfolio-architecte-sophie-bluel-master/Portfolio-architecte-sophie-bluel-master/FrontEnd/index.html"
            // Stockage du UserId et du Token dans le LocalStorage
            localStorage.setItem('Token', JSON.stringify(data.token))
            localStorage.setItem('UserId', JSON.stringify(data.userId))  
        }
    })
    .catch(error => {
        console.log(error)
    }) 
});




