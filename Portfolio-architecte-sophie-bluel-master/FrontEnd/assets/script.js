// Appel API Works

var worksArray = []

const fetchWorks = async () => {
    await fetch('http://localhost:5678/api/works')
    .then((res) => res.json())
    .then((promise) => {
        worksArray = promise  
    })
} 

// Appel API Categories

var categoryArray = []

const fetchCategory = async () => {
    await fetch('http://localhost:5678/api/categories')
    .then((res) => res.json())
    .then((promise) => {
        categoryArray = promise   
    })
} 

// Création des travaux

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

// Création du Menu Filtre
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

// Création du Filtre

const filtersMain = () => {   
    const legends = document.querySelectorAll('.gallery figure') 

    for(const legend of legends){       
        legend.style.display = 'block'        
    } 
}

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

// Appel des fonctions  

works()
menuFilter()

// Récupération du LocalStorage

const token = localStorage.getItem('Token')
const userId = localStorage.getItem('UserId')
    
// Modifications quand l'utilisateur est connecté

if (userId === '1') {
    // LogOut
    document.querySelector('.logout').textContent = 'logout'
    //Mode édition
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
    //Modifier
    const modifyWorks = document.querySelector('.modify')
    console.log(modifyWorks)
    const modifyImgButton = document.createElement('img')
    modifyImgButton.setAttribute('src', './assets/icons/modifier.svg')
    modifyImgButton.setAttribute('alt', 'Editer les travaux')
    modifyWorks.appendChild(modifyImgButton)
    const modifyText = document.createElement('span')
    modifyText.textContent = 'modifier'
    modifyWorks.appendChild(modifyText)
    //Suppression des filtres
    filters.style.display = 'none'
}

// Déconnexion de l'utilisateur

const logout = document.querySelector('.logout')

logout.addEventListener('click', function () {
    localStorage.removeItem('Token')
    localStorage.removeItem('UserId')    
    window.location.href = 'file:///C:/Users/util/Desktop/FormationOC/Portfolio-architecte-sophie-bluel-master/Portfolio-architecte-sophie-bluel-master/FrontEnd/login.html'
})




