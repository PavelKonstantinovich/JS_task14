import '../css/style.css'
import { ToDoMemory } from './memory'
import { ToDoFormCreate } from './form'
import { ToDoList } from './list'

const formCreateElement = document.querySelector('#formCreate')
const listElement = document.querySelector('#list')

const storage = new ToDoMemory()
const data = storage.data

new ToDoFormCreate(data, formCreateElement)
new ToDoList(data, listElement)
