class ToDoMemory {
  data = JSON.parse(localStorage.getItem('data')) || []
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
    // localStorage.clear()
  }

  #handleDOMReady() {
    if (this.data.length) {
      const eventRenderNeed = new Event('render:need')
      window.dispatchEvent(eventRenderNeed)
    }
  }
}

export { ToDoMemory }
