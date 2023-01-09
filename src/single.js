import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '/store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.single === state.single) return
            this.single = state.single
        })
    }

    disconnectedCallback() { this.disconnectStore() }
    render() {
        const show = this.single
        if (!show) {
            return html`<div></div>`
        }

        const backHandler = () => store.loadList()

        const seasons = show.seasons.map(({ episodes, title, image }) => {
            let episode = episodes.length
            return html`
            <div class="listener">
                <h2 class="title-tile">${title}</h2>
                <p>Episodes: ${episode}</p>
                <img src='${image}' width="200" height="200" class="image-tile">
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
            <button @click="${backHandler}"> Previous </button>
            <h1>${show.title || ''}</h1>
            ${seasons}
            
        `
    }
}

customElements.define('pd-si', Component)

