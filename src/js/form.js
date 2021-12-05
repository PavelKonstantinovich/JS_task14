class ToDoFormCreate {

  constructor(data, formCreateElement) {
    this.formCreateElement = formCreateElement
    this.data = data
    this.init()
  }

  init() {
    this.handleSubmit = this.#handleSubmit.bind(this)
    this.formCreateElement.addEventListener('submit', this.handleSubmit)
  }

  #handleSubmit(event) {
    event.preventDefault()

    const toDo = {
      id: new Date().getTime(),
      isChecked: false,
    }

    const formData = new FormData(formCreateElement)
    for (let [name, value] of formData.entries()) {
      toDo[name] = value
    }

    this.data.push(toDo)
    this.formCreateElement.reset()

    const eventRenderNeed = new Event('render:need')
    window.dispatchEvent(eventRenderNeed)
  }
}

export {ToDoFormCreate}
