const accessAPI = "P9Ark6xIN-qSc9y4CHG9mVpd67Icyl4GcT5ZGpYva88";


const inputEL = document.getElementById('search-input');
const fromEl = document.querySelector('form');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.getElementById('show-more-btn');


let inputData = '';
let page = 1;


async function searchImages(){
    inputData = inputEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessAPI}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = '';
    }

    results.map((result) => {
        const imageRapper = document.createElement('div');
        imageRapper.classList.add('search-result')
        const image = document.createElement('img');
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html;
        imageLink.target = '_blank'
        imageLink.textContent = result.alt_description;

        imageRapper.appendChild(image)
        imageRapper.appendChild(imageLink)
        searchResults.appendChild(imageRapper)
    });

    page++
    if(page > 1){
        showMoreBtn.style.display = 'block';
    }
}

fromEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages()
})

showMoreBtn.addEventListener('click', () => {
    searchImages()
})