class Store {
    changeSorting(newSorting) {
        this.update({
            sorting: newSorting
        })
    }

    changeSearch(newSearch) {
        this.update({
            search: newSearch
        })
    }

    async loadList() {
        if (this.state.previews.length > 0) {
            return this.update({
                single: null,
                phase: 'list',
            })
        }

        const response = await fetch('https://podcast-api.netlify.app/shows')

        if (!response.ok) {
            return this.update({
                single: null,
                phase: 'error'
            })
        }

        const data = await response.json()

        return this.update({
            single: null,
            phase: 'list',
            previews: data
        })
    }

    async loadSingle(id) {
        this.update({
            phase: 'loading'
        })

        if (!id) throw new Error('"id" is required')
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)

        if (!response.ok) {
            return this.update({
                phase: 'error'
            })
        }

        const data = await response.json()

        return this.update({
            phase: 'single',
            single: data
        })
    }

    update(newState) {
        const prevState = { ...this.state }
        const nextState = { ...prevState, ...newState }
        
        this.subscriptions.forEach((subscriptionFn) => {
            subscriptionFn(nextState)
        })

        this.state = nextState
    }

    subscribe(newSubscription) {
        if (this.subscriptions.includes(newSubscription)) {
            throw new Error('Subscription already exist')
        }

        this.subscriptions.push(newSubscription)
        return { ...this.state }
    }

    unsubscribe(newSubscription) {
        if (!this.subscriptions.includes(newSubscription)) {
            throw new Error('Subscription does not exist')
        }

        this.subscriptions = this.subscriptions
            .filter(item => item !== newSubscription)
    }

    constructor() {
       
        this.subscriptions = []

        this.state = {
            phase: 'loading',
            previews: [],
            single: null,
            sorting: 'a-z',
        }

        this.loadList()
    }
}

export const connect = (fn) => {
    const state = store.subscribe(fn)
    fn(state)
    return () => store.unsubscribe(fn)
}

export const store = new Store()
export default store