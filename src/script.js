import {ToDoMemory} from './packs/memory'
 import {ToDoFormCreate} from './packs/form'
 import {ToDoList} from './packs/list'
let data = []

const formCreateElement = document.querySelector('#formCreate')
const listElement = document.querySelector('#list')

 new ToDoFormCreate(data , formCreateElement)
 new ToDoList(data , listElement)
 new ToDoMemory(data)
