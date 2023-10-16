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
    
// Modifications quand l'utilisateur est connecté

if (token){
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
    window.location.href = 'login.html'
})

/* ----------------------------------------  Modal Gallery ----------------------------------------*/

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

/* ---------------------------------------- AddEventListener Modal Form ----------------------------------------*/

const modalForm = document.querySelector('.modal_form')

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