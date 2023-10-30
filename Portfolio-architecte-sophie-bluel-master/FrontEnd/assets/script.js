/* ---------------------------------------- Call API Works ----------------------------------------*/
// Tableau qui contient les informations à propos des projets
var worksArray = []
// Requête fetch pour récupérer les informations à propos des projets via l'api
const fetchWorks = async () => {
    await fetch('http://localhost:5678/api/works')
    .then((res) => res.json())
    .then((promise) => {
        worksArray = promise  
    })
}
/* ---------------------------------------- Call API Category ----------------------------------------*/
// Tableau qui contient les informations à propos des catégories
var categoriesArray = []
// Requête fetch pour récupérer les informations à propos des catégories via l'api
const fetchCategories = async () => {
    await fetch('http://localhost:5678/api/categories')
    .then((res) => res.json())
    .then((promise) => {
        categoriesArray = promise   
    })
} 
/* ---------------------------------------- Create Works  ----------------------------------------*/
// Fonction qui crée dynamiquement les différents projets dans la page d'acceuil
const works = async () => {
    await fetchWorks()   
    // Boucle qui crée dynamiquement les projets en fonction du nombre de projets dans worksArray
    for(const works of worksArray){
        const gallery = document.querySelector('.gallery')
        const legend = document.createElement('figure')
        legend.classList = `idWork_${works.id}`
        gallery.appendChild(legend)
        const imgWorks = document.createElement('img')
        const linkImgWorks = works.imageUrl
	    imgWorks.setAttribute('src', linkImgWorks)
        const altImgWorks = works.title
        imgWorks.setAttribute('alt', altImgWorks)
        legend.appendChild(imgWorks)
        const legendsWorks = document.createElement('figcaption')
        legendsWorks.textContent = works.title 
        legend.appendChild(legendsWorks)            
    }
}
/* ---------------------------------------- Create Active Filters  ----------------------------------------*/
const filters = document.querySelector('.filters')   
/* Fonction qui permet de trier les projets en fonction de leurs catégories
defaultFilter permet d'afficher tous les projets
categoriesFilter permet d'afficher seulement les projets en lien avec leur catégories */
const filtersWorks = async () => {
    await fetchCategories()
    // Crée le filtre 'Tous' et permet de montrer à l'utilisateur que c'est le filtre 'Tous' qui est activé par défaut
    const defaultFilter = document.createElement('span') 
    defaultFilter.classList = 'active'   
    defaultFilter.textContent = 'Tous'
    filters.appendChild(defaultFilter)
    // Événement qui permet d'activer le filtre 'Tous' si l'utilisateur était sur un autre filtre que celui par défaut
    defaultFilter.addEventListener('click', function(){
        const filterActive = document.getElementsByClassName('active')
        filterActive[0].className = filterActive[0].className.replace('active', '')
        this.className += 'active'
        filtersMain()
    })
    // Boucle qui crée les filtres 'Objets', 'Appartements', 'Hôtel et restaurants'
    for(const category of categoriesArray){
        const categoriesFilter = document.createElement('span')
        categoriesFilter.textContent = category.name        
        filters.appendChild(categoriesFilter)
        // Événement qui permet d'activer le filtre 'Objets' ou 'Appartements' ou 'Hôtel et restaurants'  
        categoriesFilter.addEventListener('click', function () {
            const filterActive = document.getElementsByClassName('active')
            filterActive[0].className = filterActive[0].className.replace('active', '')
            this.className += 'active'
            filtersCategories(category.id)        
        })     
    }  
}
/* ---------------------------------------- Create Select Works  ----------------------------------------*/
const filtersMain = () => {   
    const legends = document.querySelectorAll('.gallery figure') 
    // Si le filtre 'Tous' est activé, tous les projets seront affichées
    for(const legend of legends){       
        legend.style.display = 'block'        
    } 
}
const filtersCategories = (categoryId) => {        
    const legend = document.querySelectorAll('.gallery figure') 
    const work = worksArray.length     
    // Boucle qui permet d'afficher les projets liés à une catégorie et de cacher les projets ne faisant pas partie de cette catégorie
    for(let index = 0; index < work; index++){            
        // Condition pour afficher les projets liés à une catégorie        
        if(worksArray[index].category.id === categoryId){
            legend[index].style.display = 'block'
        }
        // Condition pour cacher les projets ne faisant pas partie de cette catégorie
        if (worksArray[index].category.id !== categoryId){
            legend[index].style.display = 'none'
        }       
    }
}
/* ----------------------------------------  User Connected ----------------------------------------*/
const login = document.querySelector('.login')
// Récupération du LocalStorage
const bearerAuth = JSON.parse(localStorage.getItem('BearerAuth'))
// Modifications quand l'utilisateur est connecté
const modeEdition = document.querySelector('.mode_edition')
if(bearerAuth && bearerAuth.token){
    // Modification du bouton de connexion
    login.classList = 'logout logout_link'
    document.querySelector('.logout').textContent = 'logout'
    // Mode édition
    modeEdition.style.display = 'flex'
    const imgModeEdition = document.createElement('img')
    imgModeEdition.setAttribute('src', './assets/icons/modeEdition.svg')
    imgModeEdition.setAttribute('alt', 'Mode édition')
    modeEdition.appendChild(imgModeEdition)
    const textModeEdition = document.createElement('span')
    textModeEdition.textContent = 'Mode édition'
    modeEdition.appendChild(textModeEdition)
    // Bouton pour modifier les projets
    const modifyWorks = document.querySelector('.modify')
    const modifyImgButton = document.createElement('img')
    modifyImgButton.setAttribute('src', './assets/icons/modifier.svg')
    modifyImgButton.setAttribute('alt', 'Editer les projets')
    modifyWorks.appendChild(modifyImgButton)
    const modifyText = document.createElement('span')
    modifyText.textContent = 'modifier'
    modifyWorks.appendChild(modifyText)
    // Cache les filtres
    filters.style.display = 'none'
    // Bouton de déconnexion
    const logout = document.querySelector('.logout')
    // Événement qui permet à l'utilisateur de se déconnecter et de retourner à la page de connexion
    logout.addEventListener('click', function () {
        modeEdition.style.display = 'none'
        localStorage.clear()
        location.href = 'login.html'
    })
}
/* ----------------------------------------  Modal Gallery ----------------------------------------*/
// Fonction qui crée dynamiquement les différents projets dans la galerie de la Modal Gallery
const modalGalleryWorks = async () => {
    await fetchWorks() 
    // Boucle qui crée dynamiquement des projets en fonction du nombre de projets dans worksArray
    for(const works of worksArray){
        const modalWorks = document.querySelector('.modal_works')
        const legend = document.createElement('figure')
        legend.classList = `idWorkModal_${works.id}`
        modalWorks.appendChild(legend)             
        const imgWorks = document.createElement('img')
        imgWorks.classList = 'modal_works_img'        
        legend.appendChild(imgWorks)
        const linkImgWorks = works.imageUrl
        imgWorks.setAttribute('src', linkImgWorks)
        const altImgWorks = works.title
        imgWorks.setAttribute('alt', altImgWorks)
        // Image servant d'icône de suppression pour les projets
        const deleteWorks = document.createElement('img')  
        deleteWorks.setAttribute('src', './assets/icons/deleteworks.svg') 
        deleteWorks.setAttribute('alt', 'Suppression du projet')
        deleteWorks.classList = 'delete_works'
        legend.appendChild(deleteWorks)
        /* Fetch Delete Work
        Événement qui permet de supprimer un projet de l'API et du site web */
        deleteWorks.addEventListener('click', function (event){
            event.preventDefault()          
            fetch(`http://localhost:5678/api/works/${works.id}`,{
                method: 'DELETE',
                headers: {Authorization: `Bearer ${bearerAuth.token}`}
            })
            .then(res => {
                if(res.status === 204){
                    showValidate('validate', `Projets ${works.title} a bien été supprimé`)  
                    refreshWorks()
                }
                if(res.status === 401){
                    alert("Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide")
                    location.href = 'login.html'
                }                
            })
            .catch(error => {
                console.log(error)
            })
            // Permet de voir la suppression d'un projet sans recharger la page
            const refreshWorks = () => {
                // Supprime le projet de la page d'accueil
                const work = document.querySelector(`.idWork_${works.id}`)
                work.remove()
                // Supprime le projet de la galerie de la modale
                const modalWork = document.querySelector(`.idWorkModal_${works.id}`)
                modalWork.remove()
            }                 
        })
    }  
}   
/* ----------------------------------------  Modal Form ----------------------------------------*/
// Récupération des catégories via l'API pour le formulaire d'ajout d'un projet
const formCategories = async () => {
    await fetchCategories()
    // Boucle qui crée dynamiquement la sélection parmi les catégories de l'API
    for(const category of categoriesArray){
        const selectCategory = document.getElementById('category')
        const optionCategories = document.createElement('option')
        optionCategories.textContent = category.name   
        optionCategories.value = category.id          
        selectCategory.appendChild(optionCategories)   
    }  
}
// Permet d'afficher l'image qu'on ajoute au formulaire d'ajout d'un projet
const showImgPlaceholder = (event) => {
    if(event.target.files.length > 0){
        const src = URL.createObjectURL(event.target.files[0])
        const imgPlaceholder = document.querySelector('.img_placeholder')
        imgPlaceholder.src = src
        imgPlaceholder.style.display = 'block'
        const addImgWork = document.querySelector('.add_img_container')
        addImgWork.style.display = 'none'
    }
}
// Événement qui permet l'envoi du formulaire d'ajout d'un projet
const addWork = document.querySelector('.add_works')
addWork.addEventListener('submit', function (event){
    event.preventDefault()
    // Permet de récupérer l'image, le titre et la catégorie du formulaire d'ajout d'un projet
    const image = document.getElementById('image').files[0]
    const title = document.getElementById('title').value
    const category = document.getElementById('category').value
    console.log(image)
    if(image === undefined || title === '' || category === ''){
        clearError()
        clearValidate()
        showError('error_add_works', 'Merci de remplir tous les champs')
        return
    }
    if(category !== '1' && category !== '2' && category !== '3'){     
        clearError()
        clearValidate()   
        showError('error_add_works', 'Merci de choisir une catégorie valide')
        return
    }
    try{
        const formData = new FormData()
        formData.append('title', title)
        formData.append('category', category)
        formData.append('image', image)
        /* Fetch Add Work
        Événement qui permet d'ajouter un projet à l'API et au site web */ 
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${bearerAuth.token}`,
            },
            body: formData
        })
        .then(res => {
            if(res.status === 201){
                clearError()
                showValidate('validate_add_works',`Le projet ${title} a bien été ajouté`)
                formAddWorkReset()
                updateWorks() 
                works()
                modalGalleryWorks()              
            }
            if(res.status === 400){
                clearError()
                clearValidate()
                showError('error_add_works', 'Merci de remplir tous les champs')
            }
            if(res.status === 401){
                alert("Vous n'êtes pas autorisé à ajouter un projet")
                location.href = 'login.html'
            }
            if(res.status === 500){
                clearError()
                clearValidate()
                showError('error_add_works', 'Erreur serveur')
            }
        })
    }   
    catch(error) {
        console.log(error)
    }
})
// Réinitialise le formulaire d'ajout d'un projet
const formAddWorkReset= () => {
    const imgPlaceholder = document.querySelector('.img_placeholder')
    imgPlaceholder.style.display = 'none'
    const addImgWork = document.querySelector('.add_img_container')
    addImgWork.style.display = 'flex'
    document.getElementById('image').value = null
    document.getElementById('title').value = ''
}
// Permet de voir l'ajout d'un projet sans recharger la page
const updateWorks = () => {
    const projet = document.querySelector('.gallery')
    projet.innerHTML = ''
    const modalProjet = document.querySelector('.modal_works')
    modalProjet.innerHTML = ''
}
/* ---------------------------------------- Validate Message Form ----------------------------------------*/
// Affiche la validation
const showValidate = (validateElement, validateMessage) => {
    document.querySelector('.'+validateElement).classList.add('display_validate')
    document.querySelector('.'+validateElement).innerHTML = validateMessage
}
// Efface la validation
const clearValidate = () => {
    const validates = document.querySelectorAll('.validate')
    for(const validate of validates){
        validate.classList.remove('display_validate')
    }
}
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
/* ---------------------------------------- AddEventListener Modal Gallery ----------------------------------------*/
const modalGallery = document.querySelector('.modal_gallery') 
// Ouvre la modale Gallery
const modalGalleryOpen = document.querySelector('.modify')
modalGalleryOpen.addEventListener('click', function(){
    modalGallery.style.display = 'block'    
})
// Ferme la modale Gallery depuis la croix
const modalCloseGallery = document.querySelector('.modal_gallery_close') 
modalCloseGallery.addEventListener('click', function(){
    clearValidate()
    modalGallery.style.display = 'none'
})
// Ferme la modale Gallery quand on clique en dehors de la modale
const modalCloseOverlayGallery = document.querySelector('.overlay_gallery')
modalCloseOverlayGallery.addEventListener('click', function(){
    clearValidate()
    modalGallery.style.display = 'none'    
})
// Ouvre la modale Form
const modalFormOpen = document.querySelector('.modal_gallery_button') 
modalFormOpen.addEventListener('click', function(){
    clearValidate()
    modalGallery.style.display = 'none'
    modalForm.style.display = 'block'
    document.getElementById('category').value = ''
})
/* ---------------------------------------- AddEventListener Modal Form ----------------------------------------*/
const modalForm = document.querySelector('.modal_form')
// Ferme la modale Form depuis la croix
const modalCloseForm = document.querySelector('.modal_form_close') 
modalCloseForm.addEventListener('click', function(){
    formAddWorkReset()
    clearError()
    clearValidate()
    modalForm.style.display = 'none'
})
// Ferme la modale Form quand on clique en dehors de la modale
const modalCloseOverlayForm = document.querySelector('.overlay_form')
modalCloseOverlayForm.addEventListener('click', function(){
    formAddWorkReset()
    clearError()
    clearValidate()
    modalForm.style.display = 'none'    
})
// Retourne vers la modale Gallery
const modalGalleryReturn = document.querySelector('.modal_arrow')
modalGalleryReturn.addEventListener('click', function(){
    formAddWorkReset()
    clearError()
    clearValidate()
    modalForm.style.display = 'none'
    modalGallery.style.display = 'block'   
})
/* ---------------------------------------- Appel des fonctions ----------------------------------------*/
works()
modalGalleryWorks()
filtersWorks()
formCategories()
