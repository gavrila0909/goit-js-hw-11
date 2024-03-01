import axios from 'axios';

const formEl = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let inputData = "";
let page = 1;

async function searchImages () {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      
      params: {
        key: '42617556-81109194e933f8c86a5f2575e', 
        q: inputData,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
      
    });
    
    const results = response.data.hits;

    if (page === 1) {
      gallery.innerHTML = "";
    }

    results.forEach((result) => {
      const photoCard = document.createElement("div");
      photoCard.classList.add("photo-card");

      const image = document.createElement("img");
      image.src = result.webformatURL; 
      image.alt = result.tags;
      image.loading = "lazy";
      photoCard.append(image);


      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info');

      const likes = document.createElement('p');
      likes.classList.add('info-item');
      likes.innerHTML = `<b>Likes:</b> ${result.likes}`;
      infoDiv.append(likes);

      const views = document.createElement('p');
      views.classList.add('info-item');
      views.innerHTML = `<b>Views:</b> ${result.views}`;
      infoDiv.append(views);

      const comments = document.createElement('p');
      comments.classList.add('info-item');
      comments.innerHTML = `<b>Comments:</b> ${result.comments}`;
      infoDiv.append(comments);

      const downloads = document.createElement('p');
      downloads.classList.add('info-item');
      downloads.innerHTML = `<b>Downloads:</b> ${result.downloads}`;
      infoDiv.append(downloads);
    
      photoCard.append(infoDiv);
      gallery.append(photoCard);

    });

    page++;
    if (page > 1){
      loadMoreBtn.style.display = 'block';
    }

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
 
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  inputData = document.getElementById('search-input').value;
  page = 1;
  searchImages();
})

loadMoreBtn.addEventListener('click', () => {
  searchImages()
});




