fetch('/movies.json')
    .then(response => response.json())
    .then(data => {
        const imgContainer = document.getElementById('img-container');

     
        data.forEach(movie => {
            const movieImage = document.createElement('img');
            movieImage.src = movie.imageURL;
            movieImage.alt = movie.title;
            imgContainer.appendChild(movieImage);
        });
    })
    fetch('/comedy.json')
    .then(response => response.json())
    .then(data => {
        const imgContainer = document.getElementById('img-container-2');


        data.forEach(movie => {
            const movieImage = document.createElement('img');
            movieImage.src = movie.imageURL;
            movieImage.alt = movie.title;
            imgContainer.appendChild(movieImage);
        });
    })
    fetch('/thrillers.json')
    .then(response => response.json())
    .then(data => {
        const imgContainer = document.getElementById('img-container-3');

       
        data.forEach(movie => {
            const movieImage = document.createElement('img');
            movieImage.src = movie.imageURL;
            movieImage.alt = movie.title;
            imgContainer.appendChild(movieImage);
        });
    })

    fetch('/favourites.json')
    .then(response => response.json())
    .then(data => {
        const imgContainer = document.getElementById('img-container-4');

       
        data.forEach(movie => {
            const movieImage = document.createElement('img');
            movieImage.src = movie.imageURL;
            movieImage.alt = movie.title;
            imgContainer.appendChild(movieImage);
        });
    })







    const movieStrips = document.querySelectorAll('.movies-strip');

movieStrips.forEach((moviesStrip) => {
    moviesStrip.addEventListener('mouseover', (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.style.borderColor = 'white';
        }
    });

    moviesStrip.addEventListener('mouseout', (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.style.borderColor = 'transparent';
        }
    });
});



    







    function changeHeaderBackground(imageURL) {
        const header = document.querySelector('.image');
        header.style.backgroundImage = `url(${imageURL})`;
    }
    
    
    function fetchAndDisplayMovies(jsonUrl, imgContainerId) {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                const imgContainer = document.getElementById(imgContainerId);
    
               
                data.forEach(movie => {
                    const movieImage = document.createElement('img');
                    movieImage.src = movie.imageURL;
                    movieImage.alt = movie.title;
                    movieImage.setAttribute('data-background', movie.backgroundImageURL); 
                    imgContainer.appendChild(movieImage);
                });
            });
    }
    
    let hoverTimeout;

   
    document.addEventListener('mouseover', async (event) => {
        if (event.target.tagName === 'IMG') {
            const imageURL = event.target.getAttribute('src');
            const title = event.target.getAttribute('alt'); 
    
            hoverTimeout = setTimeout(async () => {
                const details = await getMovieDetails(title);
    
                changeHeaderBackground(imageURL);
                displayMovieInfo(title, details);
            }, 1000); 
        }
    });
    
   
    document.addEventListener('mouseout', () => {
        clearTimeout(hoverTimeout); 
    });
    
   
    document.addEventListener('click', async (event) => {
        if (event.target.tagName === 'IMG') {
            const imageURL = event.target.getAttribute('src');
            const title = event.target.getAttribute('alt'); 
            const details = await getMovieDetails(title);
    
            changeHeaderBackground(imageURL);
            displayMovieInfo(title, details);
        }
    });
    fetchAndDisplayMovies('/movies.json', 'img-container');
    fetchAndDisplayMovies('/comedy.json', 'img-container-2');
    fetchAndDisplayMovies('/thrillers.json', 'img-container-3');
    fetchAndDisplayMovies('/favourites.json', 'img-container-4');


 









 





    function displayMovieInfo(title, details) {
        const titleElement = document.getElementById('title');
        const detailsElement = document.getElementById('details');
        
        titleElement.textContent = title;
        detailsElement.textContent = details;
    }
    
 
    document.addEventListener('click', async (event) => {
        if (event.target.tagName === 'IMG') {
            const imageURL = event.target.getAttribute('src');
            const title = event.target.getAttribute('alt'); 
            const details = await getMovieDetails(title); 
            
            changeHeaderBackground(imageURL);
            displayMovieInfo(title, details);
        }
    });
    
    async function getMovieDetails(title) {
        try {
            const response = await fetch('/allmovies.json'); 
            const data = await response.json();
            
          
            const movie = data.find((movie) => movie.title === title);
            
            if (movie) {
                return movie.details;
            } else {
                return "Details not found";
            }
        } catch (error) {
            console.error(error);
            return "Details not found";
        }
    }



  


 
    const section = document.querySelector('section');
    const header = document.querySelector('header');
    
    section.addEventListener('scroll', () => {
        header.scrollLeft = section.scrollLeft;
    });









    const addedMovies = [];


    document.getElementById('add-to-favorites').addEventListener('click', addToFavorites);
    

    function addToFavorites() {
      
        const currentBackgroundImage = document.querySelector('.image').style.backgroundImage;
    
    
        const isAlreadyInFavorites = checkIfInFavorites(currentBackgroundImage);
    
        if (!isAlreadyInFavorites) {
    
            const emptyFavHolder = findEmptyFavHolder();
    
            if (emptyFavHolder) {
        
                const movieImage = document.createElement('img');
                movieImage.src = currentBackgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
                movieImage.alt = 'Favorite Movie';
    
                
                emptyFavHolder.appendChild(movieImage);
    
                
                addedMovies.push(currentBackgroundImage);
    
        
                document.querySelector('.added-not').style.display = 'block';
    
            
                setTimeout(() => {
                    document.querySelector('.added-not').style.display = 'none';
                }, 1200);
    
                document.querySelector('.unsuccesful').style.display = 'none';
            } else {
              
                alert('All favorite holders are occupied.');
    
                
                document.querySelector('.unsuccesful').style.display = 'block';
    
               
                setTimeout(() => {
                    document.querySelector('.unsuccesful').style.display = 'none';
                }, 400);
    
               
                document.querySelector('.added-not').style.display = 'none';
            }
        } else {
            
            document.querySelector('.unsuccesful').style.display = 'block';

            setTimeout(() => {
                document.querySelector('.unsuccesful').style.display = 'none';
            }, 400);
    
            
            document.querySelector('.added-not').style.display = 'none';
        }
    }
  
    function findEmptyFavHolder() {
        const favHolders = document.querySelectorAll('.fav-holder');
        for (const favHolder of favHolders) {
            if (!favHolder.querySelector('img')) {
                return favHolder;
            }
        }
        return null; 
    }
    
   
    function checkIfInFavorites(movieBackgroundImage) {
        return addedMovies.includes(movieBackgroundImage);
    }








    window.addEventListener('scroll', () => {
       
        const scrollY = window.scrollY || window.pageYOffset;
    
        let desiredHeight = 175; 
        if (scrollY >= 200 && scrollY <= 400) {
            desiredHeight -= (scrollY - 200) / 2; 
        } else if (scrollY > 400) {
            desiredHeight = 125; 
        }
    
        
        const imgContainer = document.getElementById('img-container');
        imgContainer.style.transition = 'height 0.3s ease'; 
        imgContainer.style.height = `${desiredHeight}px`;
    
        
        setTimeout(() => {
            imgContainer.style.transition = '';
        }, 500); 
    });
    window.addEventListener('scroll', () => {
      
        const scrollY = window.scrollY || window.pageYOffset;
    
      
        let desiredHeight = 175; 
        if (scrollY >= 310 && scrollY <= 400) {
            desiredHeight -= (scrollY - 200) / 2.2; 
        } else if (scrollY > 400) {
            desiredHeight = 125; 
        }
    
        
        const imgContainer = document.getElementById('img-container-2');
        imgContainer.style.transition = 'height 0.3s ease'; 
        imgContainer.style.height = `${desiredHeight}px`;
    
        
        setTimeout(() => {
            imgContainer.style.transition = '';
        }, 200); 
    });
  
function updateFontSizes(scrollY) {
  
    let desiredFontSize = 24; 
    if (scrollY >= 330 && scrollY <= 9900) {
        desiredFontSize -= (scrollY - 200) / 50; 
    } else if (scrollY > 500) {
        desiredFontSize = 12; 
    }


    const h2Elements = document.querySelectorAll('section h2');
    h2Elements.forEach(h2 => {
        h2.style.transition = 'font-size 0.3s ease'; 
        h2.style.fontSize = `${desiredFontSize}px`;
    });

   
    setTimeout(() => {
        h2Elements.forEach(h2 => {
            h2.style.transition = '';
        });
    }, 200); 
}

window.addEventListener('scroll', () => {
 
    const scrollY = window.scrollY || window.pageYOffset;

  
    let desiredHeight = 175; 
    if (scrollY >= 330 && scrollY <= 9900) {
        desiredHeight -= (scrollY - 200) / 4; 
    } else if (scrollY > 500) {
        desiredHeight = 130; 
    }

 
    const imgContainer = document.getElementById('img-container-3');
    imgContainer.style.transition = 'height 0.3s ease'; 
    imgContainer.style.height = `${desiredHeight}px`;

    updateFontSizes(scrollY);
});


    



    const addToFavoritesButton = document.getElementById('add-to-favorites');
    const favoritesHeading = document.getElementById('white');


    addToFavoritesButton.addEventListener('click', () => {
      
        favoritesHeading.style.color = 'white';
    });