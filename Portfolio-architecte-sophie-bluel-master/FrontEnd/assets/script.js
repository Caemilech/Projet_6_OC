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

const token = localStorage.getItem('Token')
const userId = localStorage.getItem('UserId')
    
// Modifications quand l'utilisateur est connecté

if (userId === '1') {
    // LogOut
    document.querySelector('.logout').textContent = 'logout'
    // Mode édition
    const modeEdition = document.querySelector('.mode_edition')
    modeEdition.style.backgroundColor = 'black'
    modeEdition.style.height = '59px'
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

logout.addEventListener('click', function () {
    localStorage.removeItem('Token')
    localStorage.removeItem('UserId')    
    window.location.href = 'file:///C:/Users/util/Desktop/FormationOC/Portfolio-architecte-sophie-bluel-master/Portfolio-architecte-sophie-bluel-master/FrontEnd/login.html'
})

/* ----------------------------------------  Modal Gallery ----------------------------------------*/

const modalGallery = document.querySelector('.modal_gallery') 
// Background de la modale
const overlayGallery = document.createElement('div') 
overlayGallery.classList = 'overlay overlay_gallery' 
modalGallery.appendChild(overlayGallery) 
// Container de la modale
const modalGalleryContainer = document.createElement('div')
modalGalleryContainer.classList = 'modal'
modalGallery.appendChild(modalGalleryContainer)
// Fermeture de la modale
const modalGalleryClose = document.createElement('img')
modalGalleryClose.classList = 'modal_close modal_gallery_close'
modalGalleryClose.setAttribute('src', './assets/icons/closemodal.svg')
modalGalleryClose.setAttribute('alt', 'Fermeture de la modale')
modalGalleryContainer.appendChild(modalGalleryClose)
// Titre de la modale
const modalGalleryTitle = document.createElement('span')
modalGalleryTitle.textContent = 'Galerie photo'
modalGalleryContainer.appendChild(modalGalleryTitle)
// Conteneur des travaux
const modalGalleryWorks = document.createElement('div')
modalGalleryWorks.classList = 'modal_works'
modalGalleryContainer.appendChild(modalGalleryWorks)
// Récupération des travaux via l'API pour la modale
const worksModal = async () => {
    await fetchWorks() 
    
    for(const works of worksArray){
        const imgWorks = document.createElement('img')
        imgWorks.classList = 'modal_works_img'
        const modalWorks = document.querySelector('.modal_works')
        console.log(modalWorks)
        const legend = document.createElement('figure')  
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
    }       
}

// Modale Gallery Line
const modalGalleryLine = document.createElement('p')
modalGalleryLine.classList = 'modal_line'
modalGalleryContainer.appendChild(modalGalleryLine)
// Boutton de la modale Gallery
const modalGalleryButton = document.createElement('span')
modalGalleryButton.textContent = 'Ajouter une photo'
modalGalleryButton.classList = 'modal_button modal_gallery_button'
modalGalleryContainer.appendChild(modalGalleryButton)

/* ---------------------------------------- AddEventListener Modal Gallery ----------------------------------------*/

// Ouvre la modale Gallery
const modalGalleryOpen = document.querySelector('.modify')
modalGalleryOpen.addEventListener('click', function(){
    modalGallery.style.display = 'block'    
})
// Ferme la modale Gallery depuis la croix
const modalCloseGallery = document.querySelector('.modal_gallery_close') 
modalCloseGallery.addEventListener('click', function(){
    modalGallery.style.display = 'none'
})
// Ferme la modale Gallery quand on clique en dehors de la modale
const modalCloseOverlayGallery = document.querySelector('.overlay_gallery')
modalCloseOverlayGallery.addEventListener('click', function(){
    modalGallery.style.display = 'none'    
})
// Ouvre la modale Form
const modalFormOpen = document.querySelector('.modal_gallery_button') 
modalFormOpen.addEventListener('click', function(){
    modalForm.style.display = 'block'
    modalGallery.style.display = 'none'
})

/* ----------------------------------------  Modal Form ----------------------------------------*/

const modalForm = document.querySelector('.modal_form')
// Background de la modale
const overlayForm = document.createElement('div')
overlayForm.classList = 'overlay overlay_form'
modalForm.appendChild(overlayForm)
// Container de la modale
const modalFormContainer = document.createElement('div')
modalFormContainer.classList = 'modal'
modalForm.appendChild(modalFormContainer)
// Fermeture de la modale
const modalFormClose = document.createElement('img')
modalFormClose.classList = 'modal_close modal_form_close'
modalFormClose.setAttribute('src', './assets/icons/closemodal.svg')
modalFormClose.setAttribute('alt', 'Fermeture de la modale')
modalFormContainer.appendChild(modalFormClose)
// Retour vers la ModalGallery
const modalFormArrow = document.createElement('img')
modalFormArrow.classList = 'modal_arrow'
modalFormArrow.setAttribute('src', './assets/icons/arrowmodal.svg')
modalFormArrow.setAttribute('alt', 'Retour vers Galerie Photo') 
modalFormContainer.appendChild(modalFormArrow) 
// Titre de la modale
const modalFormTitle = document.createElement('span')
modalFormTitle.textContent = 'Ajout photo'
modalFormContainer.appendChild(modalFormTitle)
// Container Ajout Photo
const modalAddPictureContainer = document.createElement('div')
modalAddPictureContainer.classList = 'modal_add_picture_container'
modalFormContainer.appendChild(modalAddPictureContainer)
// Ajout Photo
const modalAddPicture = document.createElement('img')
modalAddPicture.setAttribute('src', './assets/icons/picture.svg')
modalAddPicture.setAttribute('alt', 'Photo') 
modalAddPictureContainer.appendChild(modalAddPicture) 
// Bouton Ajout Photo
const modalAddPictureButton = document.createElement('a')
modalAddPictureButton.classList = 'modal_add_picture_button'
modalAddPictureButton.textContent = '+ Ajouter Photo'
modalAddPictureContainer.appendChild(modalAddPictureButton)
// Format Image / Limite Poids Image
const modalAddPictureText = document.createElement('span')
modalAddPictureText.classList = 'modal_add_picture_text'
modalAddPictureText.textContent = 'jpg, png : 4mo max'
modalAddPictureContainer.appendChild(modalAddPictureText)
// Formualaire de la modale Form
const modalFormSection = document.querySelector('.modal_form_section')
modalFormContainer.appendChild(modalFormSection)
// Modale Gallery Line
const modalFormLine = document.createElement('p')
modalFormLine.classList = 'modal_line'
modalFormContainer.appendChild(modalFormLine)

/* ---------------------------------------- AddEventListener Modal Form ----------------------------------------*/

// Ferme la modale Form depuis la croix
const modalCloseForm = document.querySelector('.modal_form_close') 
modalCloseForm.addEventListener('click', function(){
    modalForm.style.display = 'none'
})
// Ferme la modale Form quand on clique en dehors de la modale
const modalCloseOverlayForm = document.querySelector('.overlay_form')
modalCloseOverlayForm.addEventListener('click', function(){
    modalForm.style.display = 'none'    
})
// Retourne vers la modale Gallery
const modalGalleryReturn = document.querySelector('.modal_arrow')
modalGalleryReturn.addEventListener('click', function(){
    modalGallery.style.display = 'block'   
    modalForm.style.display = 'none'
})

/* ---------------------------------------- Appel des fonctions ----------------------------------------*/

works()
worksModal()
menuFilter()