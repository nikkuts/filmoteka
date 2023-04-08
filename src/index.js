import axios from "axios";
const listFilms = document.querySelector('.gallery');
let numberPage = 1;

const btnPaginationBack = document.querySelector('.btn-pagination-back');
const btnPaginationCurrent = document.querySelector('.btn-pagination-current');
const btnPaginationForward = document.querySelector('.btn-pagination-forward');
// // console.log(Number(btnPaginationCurrent.textContent)+1);
// btnPaginationBack.addEventListener('click', onSearchFilmsBack);
// btnPaginationForward.addEventListener('click', onSearchFilmsForward);

// function onSearchFilmsBack () {
//     searchFilms (numberPage);
// };

// async function onSearchFilmsForward (event) {
//     numberPage = Number(btnPaginationCurrent.textContent) + 1;
    
//     try {
//         const {data} = await searchFilms (numberPage);
//     return renderMarcup (data);
// };

const allGenres = searchGenres ();
localStorage.setItem("allGenres", JSON.stringify(allGenres));
const savedAllGenres = localStorage.getItem("allGenres");
const parsedAllGenres = JSON.parse(savedAllGenres);

const resultFilms = searchFilms (numberPage);
renderMarcup (resultFilms);

function getTGenres (arrayGenres) {
    parsedAllGenres.reduce((accGenres, genre) => {
        
        if (arrayGenres.includes(genre.id) && accGenres.length < 2) {
            accGenres.push(genre.name);   
            return accGenres;         
        } else if (films.genre_ids.includes(genre.id) && accGenres.length === 2) {
            accGenres.push("Others");
            return accGenres;  
        }
        return accGenres;
      }, []);
};

async function searchFilms (number) {
    const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
    const params = new URLSearchParams({
        api_key: 'ad731d808d1432dcbfa7c8b25729787e',
        page: number,
    });
    return await axios.get(`${BASE_URL}/?${params}`); 
};

async function queryFilms (q, number) {
    const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
    const params = new URLSearchParams({
        api_key: 'ad731d808d1432dcbfa7c8b25729787e',
        page: number,
        query: q,
    });
    return await axios.get(`${BASE_URL}/?${params}`); 
};

async function searchGenres () {
    const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
    const params = new URLSearchParams({
        api_key: 'ad731d808d1432dcbfa7c8b25729787e',
    });
    return await axios.get(`${BASE_URL}/?${params}`); 
};

function renderMarcup ({results}) {
    results.map(({
        poster_path,
        overview,
        title,
        genre_ids,
        release_date
    }) => {
        const genresFilm = getTGenres (genre_ids);
        const marcup =
        `
        <div class="film-card">
            <a href='${poster_path}'>
                <img src="${poster_path}" alt="${overview}" loading="lazy" width = 100% />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${title}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${genresFilm}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${release_date.slice(0,4)}</span>
                </p>             
            </div>
        </div>
        `;
        return listFilms.insertAdjacentHTML('beforeend', marcup);
    });
};


// async function onLoadMore (event) {
//     numberPage += 1; 

//     try {
//         const {data} = await fetchFoto (searchQuery, numberPage); console.log(data);

//         if (numberPage * perPage > data.totalHits) {
//             ref.btnLoadMore.style.display = 'none';
//             Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//             return;   
//         }
//             renderMarcup (data.hits);
//             ref.btnLoadMore.style.display = 'block'; 
//             gallery.refresh();  
//     } 
//     catch (error) {
//         Notiflix.Notify.failure("ERROR Sorry, there are no images matching your search query. Please try again.");
//         console.log(error.message);        
//     }    
// };