const deleteListBtn = document.querySelectorAll('.del')
const listItem = document.querySelectorAll('span.not')
const listComplete = document.querySelectorAll('span.completed')

Array.from(deleteListBtn).forEach((el)=>{
    el.addEventListener('click', deleteList)
})

Array.from(listItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(listComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteList(){
    const listId = this.parentNode.dataset.id
    try{
        const response = await fetch('lists/deleteList', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'listIdFromJSFile': listId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const listId = this.parentNode.dataset.id
    try{
        const response = await fetch('lists/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'listIdFromJSFile': listId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const listId = this.parentNode.dataset.id
    try{
        const response = await fetch('lists/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'listIdFromJSFile': listId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}