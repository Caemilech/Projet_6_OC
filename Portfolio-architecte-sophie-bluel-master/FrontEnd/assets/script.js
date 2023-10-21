/* ---------------------------------------- Call API Works ----------------------------------------*/

var worksArray = []

const fetchWorks = async () => {
    await fetch('http://localhost:5678/api/works')
    .then((res) => res.json())
    .then((promise) => {
        worksArray = promise  
    })
} 

/* ---------------------------------------- Call API Category ----------------------------------------*/

var categoryArray = []

const fetchCategory = async () => {
    await fetch('http://localhost:5678/api/categories')
    .then((res) => res.json())
    .then((promise) => {
        categoryArray = promise   
    })
} 

/* ---------------------------------------- Create Works  ----------------------------------------*/

const works = async () => {
    await fetchWorks()   
        
    for(const works of worksArray){
        const imgWorks = document.createElement('img')
        const gallery = document.querySelector('.gallery')
        const legend = document.createElement('figure')
        legend.classList = `Project_${works.id}`
        const legendWorks = document.createElement('figcaption')
        gallery.appendChild(legend)
        legend.appendChild(imgWorks)
        legend.appendChild(legendWorks)        
        
        const linkImgWorks = works.imageUrl
	    imgWorks.setAttribute('src', linkImgWorks)

        const altImgWorks = works.title
        imgWorks.setAttribute('alt', altImgWorks)

        legendWorks.textContent = works.title             
    }
}

/* ---------------------------------------- Create Select Filters  ----------------------------------------*/

// Création du Filtre pour la catégorie 'Tous'

const filtersMain = () => {   
    const legends = document.querySelectorAll('.gallery figure') 

    for(const legend of legends){       
        legend.style.display = 'block'        
    } 
}

// Création du Filtre pour les catégories 'Objets', 'Appartements', 'Hôtel et restaurants'

const filtersCategory = (idCategory) => {        
    const works = worksArray.length  

    const legend = document.querySelectorAll('.gallery figure') 
                          
    for(let index = 0; index < works; index++){            
                
        if(worksArray[index].category.id === idCategory){
            legend[index].style.display = 'block'
        }
        
        if (worksArray[index].category.id !== idCategory){
            legend[index].style.display = 'none'
        }       
    }
}

/* ---------------------------------------- Create Active Filters  ----------------------------------------*/

const filters = document.querySelector('.filters')   

const menuFilter = async () => {
    await fetchCategory()
    
    const menuMain = document.createElement('span') 
    menuMain.classList = 'active'   
    menuMain.textContent = 'Tous'
    filters.appendChild(menuMain)

    menuMain.addEventListener('click', function(){
        const filtersActive = document.getElementsByClassName('active')
        filtersActive[0].className = filtersActive[0].className.replace('active', "")
        this.className += 'active'
        filtersMain()
    })
      
    for(const category of categoryArray){
        const menuFilter = document.createElement('span');
        menuFilter.textContent = category.name        
        filters.appendChild(menuFilter)
        
        menuFilter.addEventListener('click', function () {
            const filtersActive = document.getElementsByClassName('active')
            filtersActive[0].className = filtersActive[0].className.replace('active', "")
            this.className += 'active'
            filtersCategory(category.id)          
        })     
    }  
}

/* ----------------------------------------  User Connected ----------------------------------------*/

// Récupération du LocalStorage

const bearerAuth = JSON.parse(localStorage.getItem('BearerAuth'))
    
// Modifications quand l'utilisateur est connecté

const login = document.querySelector('.login')
 
if(bearerAuth && bearerAuth.token){
    // LogOut
    login.classList = 'logout logout_link'
    document.querySelector('.logout').textContent = 'logout'
    // Mode édition
    const modeEdition = document.querySelector('.mode_edition')
    modeEdition.style.display = 'flex'
    const imgModeEdition = document.createElement('img')
    imgModeEdition.setAttribute('src', './assets/icons/modeEdition.svg')
    imgModeEdition.setAttribute('alt', 'Mode édition')
    modeEdition.appendChild(imgModeEdition)
    const textModeEdition = document.createElement('span')
    textModeEdition.textContent = 'Mode édition'
    modeEdition.appendChild(textModeEdition)
    // Modifier
    const modifyWorks = document.querySelector('.modify')
    const modifyImgButton = document.createElement('img')
    modifyImgButton.setAttribute('src', './assets/icons/modifier.svg')
    modifyImgButton.setAttribute('alt', 'Editer les travaux')
    modifyWorks.appendChild(modifyImgButton)
    const modifyText = document.createElement('span')
    modifyText.textContent = 'modifier'
    modifyWorks.appendChild(modifyText)
    // Suppression des filtres
    filters.style.display = 'none'
}

// Déconnexion de l'utilisateur

const logout = document.querySelector('.logout')

if(logout)
logout.addEventListener('click', function (){ 
    const modeEdition = document.querySelector('.mode_edition')
    modeEdition.style.display = 'none'   
    localStorage.clear()  
    location.href = 'login.html'
})

/* ----------------------------------------  Modal Gallery ----------------------------------------*/

// Récupération des travaux via l'API pour la modale

const modalWorks = document.querySelector('.modal_works')
const worksModal = async () => {
    await fetchWorks() 
       
    for(const works of worksArray){
                        
        const imgWorks = document.createElement('img')
        imgWorks.classList = 'modal_works_img'        
        
        const legend = document.createElement('figure')
        legend.classList = `Project_modal_${works.id}`
        
        modalWorks.appendChild(legend)
        legend.appendChild(imgWorks)
        
        const deleteWorks = document.createElement('img')  
        deleteWorks.setAttribute('src', './assets/icons/deleteworks.svg') 
        deleteWorks.setAttribute('alt', 'Suppression du travaux')
        deleteWorks.classList = 'delete_works'
        legend.appendChild(deleteWorks)

        const linkImgWorks = works.imageUrl
        imgWorks.setAttribute('src', linkImgWorks)

        const altImgWorks = works.title
        imgWorks.setAttribute('alt', altImgWorks)

        // AddEventListener Fetch Delete

        deleteWorks.addEventListener('click', function (event){
            event.preventDefault()
                       
            fetch(`http://localhost:5678/api/works/${works.id}`,{
                method: 'DELETE',
                headers: { Authorization: `Bearer ${bearerAuth.token}`}
            })
            .then(response => {
                if(response.status === 204){
                    showValidate('validate', `Projets ${works.id} a bien été supprimé`)  
                    refreshWorks()
                }
                if(response.status === 401){
                    alert("Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide")
                    location.href = 'login.html'
                }                
            })
            .catch (error => {
                console.log(error)
            })

            function refreshWorks(){                      
                // Supprime le projet de la page d'accueil
                const projets = document.querySelector(`.Project_${works.id}`)
                console.log(projets)
                projets.remove()
                // Supprime le projet de la modale
                const modalProjets = document.querySelector(`.Project_modal_${works.id}`)         
                modalProjets.remove()
            }              
        })
    }  
}   

/* ----------------------------------------  Modal Form ----------------------------------------*/

// Récupération des catégories via l'API pour le formulaire d'ajout

const categoryForm = async () => {
    await fetchCategory()
 
    for(const category of categoryArray){

        const selectCategory = document.getElementById('category')
        const optionCategory = document.createElement('option');
        optionCategory.textContent = category.name   
        optionCategory.value = category.id          
        selectCategory.appendChild(optionCategory)   
    }  
}

// Permet de visualiser l'image qu'on ajoute du formulaire

const showPreview = (event) => {
    if(event.target.files.length > 0){
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.querySelector('.preview_picture');
      preview.src = src;
      preview.style.display = 'block';
      const addPictureContainer = document.querySelector('.add_picture_container')
      addPictureContainer.style.display = 'none'
    }
}

// AddEventListener Fetch Post Add Work

const addWorkProject = document.querySelector('#modal_form_button')
addWorkProject.addEventListener('click', function (event){
    event.preventDefault()
    clearError()
    clearValidate()
    
    const image = document.getElementById('image').files[0]
    const title = document.getElementById('title').value
    const categoryId = document.getElementById('category').value

    if(image === undefined || title === "" || categoryId === ""){
        showError('error_add_works', 'Merci de remplir tous les champs')
        return;
    }
    if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3"){        
        showError('error_add_works', 'Merci de choisir une catégorie valide')
        return;
    }
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', categoryId);
        formData.append('image', image);
        
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${bearerAuth.token}`,
            },
            body: formData,
        })
        .then(response => {
            if(response.status === 400){
                showError('error_add_works', 'Merci de remplir tous les champs')
            }
            if(response.status === 401){
                alert("Vous n'êtes pas autorisé à ajouter un projet");
                location.href = "login.html";
            }
            if(response.status === 201){
                showValidate('validate_add_works',`Le travaux ${title} a bien été ajouté`)
                resetModalForm()
                updateWorks()
                works()
                worksModal()                
            }
            if(response.status === 500){
                showError('error_add_works', 'Erreur serveur')
            }
        })
    }   
    catch (error) {
        console.log(error);
    }
})

// Réinitialise le formulaire d'ajout

const resetModalForm = () => {
    const preview = document.querySelector(".preview_picture");
    const addPictureContainer = document.querySelector('.add_picture_container')
    preview.style.display = 'none';
    addPictureContainer.style.display = 'flex'
    document.getElementById('title').value = ''
    document.getElementById('category').value = ''
}

// Permet d'actualiser les travaux sans recharger la page

const updateWorks = () => {
    const projet = document.querySelector('.gallery')
    projet.innerHTML = ""
    const modalProjet = document.querySelector('.modal_works')
    modalProjet.innerHTML = ""
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
    document.querySelector("."+errorElement).classList.add('display-error')
    document.querySelector('.'+errorElement).innerHTML = errorMessage
}

// Efface l'erreur

const clearError = () => {
    const errors = document.querySelectorAll('.error')
    for(const error of errors){
        error.classList.remove('display-error')
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
    modalForm.style.display = 'block'
    modalGallery.style.display = 'none'
    document.getElementById('category').value = ''
})

/* ---------------------------------------- AddEventListener Modal Form ----------------------------------------*/

const modalForm = document.querySelector('.modal_form')

// Ferme la modale Form depuis la croix
const modalCloseForm = document.querySelector('.modal_form_close') 
modalCloseForm.addEventListener('click', function(){
    resetModalForm()
    clearValidate()
    modalForm.style.display = 'none'
})
// Ferme la modale Form quand on clique en dehors de la modale
const modalCloseOverlayForm = document.querySelector('.overlay_form')
modalCloseOverlayForm.addEventListener('click', function(){
    resetModalForm()
    clearValidate()
    modalForm.style.display = 'none'    
})
// Retourne vers la modale Gallery
const modalGalleryReturn = document.querySelector('.modal_arrow')
modalGalleryReturn.addEventListener('click', function(){
    resetModalForm()
    clearValidate()
    modalGallery.style.display = 'block'   
    modalForm.style.display = 'none'
})

/* ---------------------------------------- Appel des fonctions ----------------------------------------*/

works()
worksModal()
menuFilter()
categoryForm()
