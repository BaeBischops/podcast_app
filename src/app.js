document.querySelector('#main').innerHTML = /*html*/ `
                                            <section id="app" class="row">
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
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="listener">
                        <h2 class="title-tile">${title}</h2>
                        <p class="descripton-tile"><img src='${image}' width="300" height="300" class="image-tile" data-preview-button="${id}">Seasons: ${seasons} <br> Last Update: ${updated} <br> Genres: ${genres} <br><br> ${ description.slice(0, 100)}</p>
                    </div>
                </div>`
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

    for(const {image, title, seasons, description, episodes} of data.seasons){
        let episode = episodes.length;

        seasonList = /*html*/`${seasonList}
                    <div class="col-lg-4 col-md-3 col-sm-12">
                        <div class="listener">
                            <h2 class="title-tile">${title}</h2>
                            <img src='${image}' width="200" height="200" class="image-tile">
                            <p>Episodes: ${episode} <br> ${data.description.slice(0, 100)}</p>
                        </div>
                    </div>`
    }
    app.innerHTML = seasonList;
};

app.addEventListener('click', (e) => {
    const { previewButton } = e.target.dataset;
    getSeasons(previewButton);
});
