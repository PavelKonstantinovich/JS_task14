let data = []
const listElement = document.querySelector('#list')

class ToDoList {
    isEdit = false
    currentEditedToDo = {}

    constructor(listElement) {
      this.listElement = listElement

      this.init()
    }
    init() {

      this.handleChange = this.#handleChange.bind(this)
      this.handleRenderNeed = this.#handleRenderNeed.bind(this)
      this.handleClickRemoveButton = this.#handleClickRemoveButton.bind(this)
      this.handleClickEditButton = this.#handleClickEditButton.bind(this)
      this.handleFormEditSubmit = this.#handleFormEditSubmit.bind(this)
      this.handleClickCancelEditButton = this.#handleClickCancelEditButton.bind(this)

      window.addEventListener('render:need', this.handleRenderNeed)
      this.listElement.addEventListener('change', this.handleChange)
      this.listElement.addEventListener('click', this.handleClickRemoveButton)
      this.listElement.addEventListener('click', this.handleClickEditButton)
      this.listElement.addEventListener('submit', this.handleFormEditSubmit)
      this.listElement.addEventListener('click', this.handleClickCancelEditButton)
    }

    #handleChange(event) {
      const { target } = event
      const { id, checked, type } = target

      if (type !== 'checkbox') return

      data.forEach((item) => {
        if (item.id == id) {
          item.isChecked = checked
        }
      })

      this.render()
      this.isEdit = false

    }

    #handleClickRemoveButton(event) {
      const role = event.target.getAttribute('data-role')
      const id = event.target.getAttribute('data-id')

      if (role == 'remove') {
        data = data.filter((item) => item.id != id)

        this.render()
        this.isEdit = false
      }
    }

    #handleClickEditButton(event) {
      const { target } = event
      const { role, id } = target.dataset

      if (role == 'edit') {
        if (this.isEdit == true) {
          alert('Уже редактируется')
          return
        }

        data.forEach((item) => {
          if (item.id == id) {
            this.currentEditedToDo = item

            const { parentElement } = target
            const formEditElement = this.formEditTemplate(item)
            parentElement.outerHTML = formEditElement
            this.isEdit = true
          }
        })
      }
    }

    #handleClickCancelEditButton(event) {
      const { role } = event.target.dataset

      if (role == 'cancelEdit') {
        this.render()
        this.isEdit = false
      }
    }

    #handleFormEditSubmit(event) {
      event.preventDefault()
      const { target } = event
      const { role, id } = target.dataset

      if (role == 'editForm') {
        const content = target.querySelector('[name="content"]').value

        this.currentEditedToDo.content = content
        this.render()
        this.isEdit = false
      }
    }

    #handleRenderNeed() {
      this.render()
      this.isEdit = false
    }

    createToDoTemplate({ id, content, isChecked }) {
      const checkedAttr = isChecked ? 'checked' : ''

      const template = `
      <div class="island__item d-flex ${checkedAttr}">
        <div class="form-check  form-check-lg">
          <input class="form-check-input"  ${checkedAttr} type="checkbox" id="${id}">
          <label class="form-check-label" for="${id}">${content}</label>
        </div>

        <button type="button" data-role="edit" data-id="${id}" class="btn btn-sm btn-secondary ms-auto">
          <svg class="pe-none" width="16" height="16"><use href="#pencil"/></svg>
        </button>

        <button type="button" data-role="remove" data-id="${id}" class="btn btn-sm btn-outline-danger ms-3">
          <svg class="pe-none" width="16" height="16"><use href="#trash"/></svg>
        </button>
      </div>
    `
      return template
    }

    formEditTemplate({ content }) {
      const template = `
      <div class="island__item" id="formEditContainer">
        <form class="d-flex" data-role="editForm">
          <div class="flex-grow-1">
            <input type="text" class="form-control form-control-sm" name="content" placeholder="Введите задачу" required value="${content}">
          </div>
          <div class="ms-3">
            <button type="submit" class="btn btn-sm btn-secondary">
              <svg class="pe-none" width="16" height="16"><use href="#save"/></svg>
            </button>
            <button type="button" data-role="cancelEdit" class="btn btn-sm btn-secondary ms-3">
              <svg class="pe-none" width="16" height="16"><use href="#cancel"/></svg>
            </button>
          </div>
        </form>
      </div>
    `
      return template
    }

    createToDoElements() {
      let result = ''

      data.forEach((toDo) => {
        result = result + this.createToDoTemplate(toDo)
      })

      return result
    }

    render() {
      const toDoElements = this.createToDoElements()
      this.listElement.innerHTML = toDoElements
    }
  }

new ToDoList(listElement)
