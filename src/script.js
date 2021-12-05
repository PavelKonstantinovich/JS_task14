import {ToDoMemory} from './js/memory'
 import {ToDoFormCreate} from './js/form'
 import {ToDoList} from './js/list'
let data = []

const formCreateElement = document.querySelector('#formCreate')
const listElement = document.querySelector('#list')

 new ToDoFormCreate(data , formCreateElement)
 new ToDoList(data , listElement)
 new ToDoMemory(data)
