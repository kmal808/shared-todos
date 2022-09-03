const List = require('../models/List')
const Todo = require('../models/Todo')

module.exports = {
    getAllLists: async (req,res)=>{
        try{
            const lists = await List.find({userId:req.user.id})

            res.render('lists.ejs', {lists, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getList: async (req,res)=>{
        try{
            // Get list by id
            const list = await List.findById(req.params.id).populate('invitedUsers').lean()
            // Users that are authorized to view the list
            const invitedUsers = list.invitedUsers

            // Check if list exists
            if(!list){
                res.redirect('/')
            } 
            // User is not in invitedUsers (is there a better way to check this?)
            if (list.userId != req.user.id && !invitedUsers.filter(user => user._id == req.user.id).length > 0) {
                res.redirect('/')
            }

            // Get all todo items that belong to the list
            const todoItems = await Todo.find({listId:req.params.id})
            console.log(todoItems)
            // How many items are left in the todo
            const itemsLeft = await Todo.countDocuments({listId:req.params.id, completed: false})

            res.render('todos.ejs', {listName: list.name, listId: list._id, todos: todoItems, left: itemsLeft, user: req.user, invitedUsers})
        }catch(err){
            console.log(err) 
        }
    },
    createList: async (req, res)=>{
        try{
            let newList = await List.create({name: req.body.name, userId: req.user.id})
            console.log('List has been added!')
            res.redirect('/lists/' + newList._id)
        }catch(err){
            console.log(err)
        }
    },

    deleteList: async (req, res)=>{
        console.log(req.body)
        try{
            await List.findOneAndDelete({_id:req.body.itemIdFromJSFile})
            console.log('Deleted List')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
}    