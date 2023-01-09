const getEpisodes = async() => {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    const data = await response.json();

    const episodes = show.seasons.map(({ episodes, title }) => {
        return html`
            <div>
                <strong>${title}</strong>
                ${episodes.map(({ file, title: innerTitle }) => {
                    return html`
                        <div>
                            <div>${innerTitle}</div>
                            <audio controls>
                                <source src="${file}" type="audio/mp3">
                            </audio>
                        </div>
                    `
                })}
            </div>
        `
    })

    return html`
        <button @click="${backHandler}">Preivious</button>
        <h1>${show.title || ''}</h1>
        ${episodes}
    `
};