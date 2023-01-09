import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '/store.js'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
            sorting: { state: true },
            search: { state: true },
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.previews !== state.previews) { this.previews = state.previews }
            if (this.sorting !== state.sorting) { this.sorting = state.sorting }
            if (this.search !== state.search) { this.search = state.search } 
        })
    }

    disconnectedCallback() { this.disconnectStore() }

    static styles = css`
    .listener{
        margin: 25px 50px 75px 100px;
        background-color: rgb(0, 0, 0); 
        clear: both;
        display: table;
        color: white;
    }
    .title-tile{
        font-size: 30px;
        text-align: center;
    }
    
    .descripton-tile{
        text-align: justify
    }
    .image-tile{
        float: left;
        border-style: 1px solid white;
        margin: 0px 15px 15px 0px;
    }
    `;

    render() {
        const previews = this.previews


        const filteredPreviews = previews.filter(item => {
            if (!this.search) return true
            return item.title.toLowerCase().includes(this.search.toLowerCase())
        })

        const sortedPreviews = filteredPreviews.sort((a, b) => {
            if (this.sorting === 'a-z') return a.title.localeCompare(b.title)
            if (this.sorting === 'z-a') return b.title.localeCompare(a.title)

            const dateA = new Date(a.updated).getTime()
            const dateB = new Date(b.updated).getTime()

            if (this.sorting === 'oldest-latest') return dateA - dateB
            if (this.sorting === 'latest-oldest') return dateB - dateA

            throw new Error('Invalid sorting')
         })

        const list = sortedPreviews.map(({ title, id, updated, image, seasons, genres, description }) => {

            let season = seasons>1? " Seasons ":" Season ";
            updated = new Date(updated);
            let year = updated.getFullYear();
            let month = updated.getMonth()+1; 
            let day = updated.getDate();
            updated = year + "/" + month + "/" + day;
            seasons = seasons + season;

            const clickHandler = () => store.loadSingle(id)

            return html`
            <div class="listener">
                <h2 class="title-tile">${title}</h2>
                <p class="descripton-tile"><img src='${image}' width="300" height="300" class="image-tile" @click="${clickHandler}">Seasons: ${seasons} <br> Last Update: ${updated} <br> Genres: ${genres} <br><br> ${ description }</p>
            </div>`
        })

        return html`
            <pd-co></pd-co>
            ${list.length > 0 ? html`<ul>${list}</ul>` : html`<div>No matches</div>`}
        `
    }
}

customElements.define('pd-li', Component)