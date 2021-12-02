let data = []

class ToDoMemory {
    constructor() {
      this.#init()
    }

    #init() {
      this.handleBeforeUnload = this.#handleBeforeUnload.bind(this)
      this.handleDOMReady = this.#handleDOMReady.bind(this)

      window.addEventListener('beforeunload', this.handleBeforeUnload)
      window.addEventListener('DOMContentLoaded', this.handleDOMReady)
    }

    #handleBeforeUnload() {
      const json = JSON.stringify(data)
      localStorage.setItem('data', json)
    }

    #handleDOMReady(event) {
      event.preventDefault()
      const dataFromStorage = localStorage.getItem('data')

      if (dataFromStorage) {
        data = JSON.parse(dataFromStorage)

        const eventRenderNeed = new Event('render:need')
        window.dispatchEvent(eventRenderNeed)
      }
    }
  }

  new ToDoMemory()
