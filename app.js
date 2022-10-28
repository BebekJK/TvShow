const container = document.querySelector('.container');
const movieListContainer = document.querySelector('.movieListContainer');
const form = document.querySelector('form');
const searchResult = document.querySelector('h2')
const searchForm = document.querySelector('input');
const searchButton = document.querySelector('button');

let numMovie;

const getMovie = async (movieName) => {
    const movie = await axios.get(`https://api.tvmaze.com/search/shows?q=${movieName}`);
    return movie.data;
}

const updateList = async(movieData) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('movieContainer');

    const newFilmName = document.createElement('p');
    newFilmName.classList.add('movieName');
    newFilmName.innerText = movieData.show.name;


    const newFilmImage = document.createElement('img');
    newFilmImage.classList.add('movieImage');
    try{
        newFilmImage.setAttribute('src' , `${movieData.show.image.original}`);
    }
    catch{
        newFilmImage.setAttribute('src' , `https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image-300x225.jpg}`)
    }
    newDiv.append(newFilmName);
    newDiv.append(newFilmImage);

    movieListContainer.append(newDiv);
}

const clearList = () => {
    while(movieListContainer.childElementCount){
        movieListContainer.removeChild(movieListContainer.lastChild);
    }
}
form.addEventListener('submit' , async (e) => {
    clearList();
    e.preventDefault();
    searchName = e.target[0].value;
    movieList = await getMovie(searchName);

    numMovie = movieList.length;
    if(numMovie == 0){
        const errMsg = document.createElement('div');
        errMsg.innerText = "TV SHOW NOT AVAILABLE";
        errMsg.classList.add('err');
        movieListContainer.append(errMsg);
    }
    else{
        for(let i=0;i<numMovie;i++){
            updateList(movieList[i]);
        }
    }
    
    searchResult.innerText = `Search Result for "${searchName}" :`;
});

