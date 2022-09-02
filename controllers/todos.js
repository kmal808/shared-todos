const Todo = require('../models/Todo')
const List = require('../models/List')

module.exports = {
    // getTodos: async (req,res)=>{
    //     console.log(req.user)
    //     try{
    //         const todoItems = await Todo.find({userId:req.user.id})
    //         const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
    //         res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    createTodo: async (req, res)=>{
        try{
            // Get list by id
            const list = await List.findById(req.params.id).populate('invitedUsers').lean()

            // Check if list exists
            if(!list){
                res.redirect('/')
            } 
            // User is not in invitedUsers (is there a better way to check this?)
            if (list.userId != req.user.id && !invitedUsers.filter(user => user._id == req.user.id).length > 0) {
                res.redirect('/lists/')
            }
            // Create todo
            const newTodo = await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, listId: req.params.id})
            console.log('Todo has been added!')
            // Redirect to list
            res.redirect('/lists/' + newTodo.listId)
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.itemIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.itemIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    