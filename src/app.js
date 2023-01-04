const app = document.querySelector('#app'); //app = listHtml

const getShows = async () => {
    const response = await fetch('https://podcast-api.netlify.app/shows');
    const data = await response.json();
    let shows = '';

    if(!response.ok){
        app.innerHTML = /*html*/ `<h2>ERROR 404</h2>`;
        return
    }

    for(const {id, title, seasons} of data){
        shows = /*html*/`${shows} <button data-preview-button='${id}'>${title}</button>`
    }
    app.innerHTML = shows;
};

getShows();

const getSeasons = async (id) => {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    const data = await response.json();
    let seasonList = '';

    if(!response.ok){
        app.innerHTML = /*html*/ `<h2>ERROR 404</h2>`;
        return
    }

    for(const {image, title} of data.seasons){
        seasonList = /*html*/`${seasonList} <li><img src='${image}' width='100' height='100'>${title}</li>`
    }
    app.innerHTML = /*html*/`<h2>${data.title}</h2> <ul>${seasonList}</ul>`;
};

document.body.addEventListener('click', (event) => {
    const {previewButton} = event.target.dataset;
    if(!previewButton){app.innerHTML = /*html*/ `<h2>ERROR</h2>`;}
    app.innerHTML = /*html*/ `<div class="centre"><div class="load"></div><span>loading content...</span></div>`;
    getSeasons(previewButton)
});
