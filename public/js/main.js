const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const removeUserBtn = document.querySelectorAll('.remove-user')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteItem)
})

Array.from(removeUserBtn).forEach((el)=>{
    el.addEventListener('click', removeUser)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markTodoComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markTodoIncomplete)
})

async function deleteItem(){
    const itemId = this.parentNode.dataset.id

    // Checks if we are trying to delete a list
    const isList = this.parentNode.classList.contains('listItem')
    // Set fetch to proper url
    const url = isList ? '/lists/deleteList' : '/todos/deleteTodo'
    try{
        const response = await fetch(url, {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemIdFromJSFile': itemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function removeUser(){
    const userId = this.parentNode.dataset.id
    const listId = this.parentNode.dataset.list

    try{
        const response = await fetch('/lists/removeUser', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                userId,
                listId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markTodoComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markTodoIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}