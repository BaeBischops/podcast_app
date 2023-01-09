import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { connect } from '/store.js'


class Component extends LitElement {
    static get properties() {
        return {
            phase: { state: true },
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.phase === state.phase) return
            this.phase = state.phase
        })
    }

    disconnectedCallback() { this.disconnectStore() }
    
    static styles = css`
    .centre {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    .load {
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        animation: ring 2s linear infinite;
    }
    @keyframes ring {
        0% {
            transform: rotate(0deg);
            box-shadow: 1px 5px 2px rgb(255, 255, 255);
        }
        50% {
            transform: rotate(180deg);
            box-shadow: 1px 5px 2px rgb(0, 0, 255);
        }
        100% {
            transform: rotate(360deg);
            box-shadow: 1px 5px 2px rgb(230, 0, 0);
        }
    }
    span{
        text-transform: uppercase;
        animation: text 3s ease-in-out infinite;
    }
    @keyframes text {
        50% {
            color: black;
        }
    }
    .load:before{
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    }`

    render() {
        switch (this.phase) {
            case 'loading': 
                return html`<section ><div class="centre"><div class="load"></div><span>loading content...</span></div></section>`

            case 'error': 
                return html`<div>Failed to Load!</div>`

            case 'list': 
                return html`<pd-li></pd-li>`

            case 'single': 
                return html`<pd-si></pd-si>`
                
            default: throw new Error('Invalid phase')
        }
    }
}

customElements.define('pd-app', Component)