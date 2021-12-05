class ToDoMemory {
  data = JSON.parse(dataFromStorage) || []
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
    const json = JSON.stringify(this.data)
    localStorage.setItem('data', json)
  }

  #handleDOMReady(event) {
    event.preventDefault()
    const dataFromStorage = localStorage.getItem('data')

    if (dataFromStorage) {
      this.data = JSON.parse(dataFromStorage)

      const eventRenderNeed = new Event('render:need')
      window.dispatchEvent(eventRenderNeed)
    }
  }
}

export { ToDoMemory }
