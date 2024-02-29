import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "42617556-81109194e933f8c86a5f2575e";



const PHOTO_API_KEY = "42617556-81109194e933f8c86a5f2575e";

const formEl = document.querySelector(".search-form");
const inputEl = document.getElementById("search-input");
const gallery = document.querySelector(".gallery");
const loadButton = document.querySelector("load-more");

let inputData = "";
let page = 1;

 async function searchImages () {
    inputData = inputEl.value;
    const URL = `https://pixabay.com/api/search/photos?pages=${page}&query=${inputData}&client_id=${PHOTO_API_KEY}`;
    const response = await fetch(URL)
    const data = await response.json();
    const results = data.results;

    if (page === 1){
        gallery.innerHTML = "";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("photo-card");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        

    })

}