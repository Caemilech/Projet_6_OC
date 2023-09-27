// Appel API Works

let works_array = []

const fetchworks = async () => {
    await fetch('http://localhost:5678/api/works')
    .then((res) => res.json())
    .then((promise) => {
        works_array = promise
        console.log(works_array)    
    })
} 

// Appel API Categories

let category_array = []

const fetchcategory = async () => {
    await fetch('http://localhost:5678/api/categories')
    .then((res) => res.json())
    .then((promise) => {
        category_array = promise
        console.log(category_array)    
    })
} 

// Création des travaux

const works = async () => {
    await fetchworks()   
       
    const works = works_array.length
    
    for(let index = 0; index < works; index++){
        const img_works = document.createElement('img')
        const gallery = document.querySelector('.gallery')
        const legend = document.createElement('figure')
        const legend_works = document.createElement('figcaption')
        gallery.appendChild(legend)
        legend.appendChild(img_works)
        legend.appendChild(legend_works)

        const link_img_works = works_array[index].imageUrl
	    img_works.setAttribute('src', link_img_works)

        const alt_img_works = works_array[index].title
        img_works.setAttribute('alt', alt_img_works)

        legend_works.textContent = works_array[index].title             
    }
    console.log(works)
}

// Création du Menu Filtre

category_class = ['Objets', 'Appartements', 'Hotel_et_restaurants']

const menu_filter = async () => {
    await fetchcategory()
    
    const category = category_array.length
    const filters = document.querySelector('.filters')

    const menu_main = document.createElement('h2')    
    menu_main.textContent = 'Tous'
    menu_main.classList.add('Tous')
    filters.appendChild(menu_main)  

    for (let index = 0; index < category; index++) {	    
        const menu_filter = document.createElement('h2');
        menu_filter.textContent = category_array[index].name
        menu_filter.classList.add(category_class[index])  
        filters.appendChild(menu_filter)     
    }  
}

// Création du Filtre

const filters_main = () => {   
    const works = works_array.length 
    const legend = document.querySelectorAll('.gallery figure') 
     
    for(let index = 0; index < works; index++){           
        legend[index].style.display = 'block'        
    } 
}

const filters = (number) => {               
    const works = works_array.length        

    const legend = document.querySelectorAll('.gallery figure') 
                      
    for(let index = 0; index < works; index++){            
                
        if(works_array[index].category.name === category_array[number].name){
            legend[index].style.display = 'block'
        }
        
        if (works_array[index].category.name !== category_array[number].name){
            legend[index].style.display = 'none'
        }       
    }
}

// Création des évèvements

document.addEventListener('click', function (event){
    if (!event.target.matches('.Tous')) return  
    filters_main()
})

document.addEventListener('click', function (event){
    if (!event.target.matches('.Objets')) return  
    filters(0)      
})

document.addEventListener('click', function (event){
    if (!event.target.matches('.Appartements')) return  
    filters(1)
})

document.addEventListener('click', function (event){
    if (!event.target.matches('.Hotel_et_restaurants')) return  
    filters(2)
})

// Appel des fonctions  

fetchworks()
fetchcategory()
works()
menu_filter()
filters_main()
filters()