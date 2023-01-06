document.querySelector('#main').innerHTML = /*html*/ `
                                            <section id="app">
                                                <div class="centre">
                                                <div class="load"></div>
                                                <span>loading content...</span>
                                                </div>
                                            </section>`;
const app = document.querySelector('#app'); //app = listHtml

const getShows = async () => {
    const response = await fetch('https://podcast-api.netlify.app/shows');
    const data = await response.json();
    let shows = '';

    if(!response.ok){
        app.innerHTML = /*html*/ `<h2>ERROR 404</h2>`;
        return
    }

    for(let {id, title, seasons, image, description, updated, genres} of data){
        let season = seasons>1? " Seasons ":" Season ";
        updated = new Date(updated);
        let year = updated.getFullYear();
        let month = updated.getMonth()+1; 
        let day = updated.getDate();
        updated = year + "/" + month + "/" + day;
        seasons = seasons + season;

        shows = /*html*/`${shows}
                    <div class="listener">
                        <h2 class="title-tile">${title}</h2>
                        <p class="descripton-tile"><img src='${image}' width="300" height="300" class="image-tile" data-preview-button="${id}">Seasons: ${seasons} <br> Last Update: ${updated} <br> Genres: ${genres} <br><br> ${ description.slice(0, 100)}</p>
                    </div>`
    }
    app.innerHTML = /*html*/`
                    <select>
                        <option>Default</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select> ${shows}`;
    
    
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

    for(const {image, title, seasons, description, episodes} of data.seasons){
        let episode = episodes.length;

        seasonList = /*html*/`${seasonList}  
                        <div class="listener">
                            <h2 class="title-tile">${title}</h2>
                            <img src='${image}' width="200" height="200" class="image-tile">
                            <p>Episodes: ${episode} <br> ${data.description.slice(0, 100)}</p>
                        </div>`
    }
    app.innerHTML = /*html*/`
                    <button data-button-back>Previous</button>${seasonList}
                    <button data-button-back>Previous</button>`;
};

app.addEventListener('click', (e) => {
    const { previewButton, buttonBack } = e.target.dataset;
    getSeasons(previewButton);

    if(buttonBack === ''){getShows()}
});
