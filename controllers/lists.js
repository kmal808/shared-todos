const List = require('../models/List')
const Todo = require('../models/Todo')
const User = require('../models/User')

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
            
            // Check if list exists
            if(!list){
                res.redirect('/')
            } 

            // Users that are authorized to view the list
            const invitedUsers = list.invitedUsers
            
            // User is not in invitedUsers (is there a better way to check this?)
            if (list.userId != req.user.id && !invitedUsers.filter(user => user._id == req.user.id).length > 0) {
                res.redirect('/')
            }

            let isOwner = list.userId === req.user.id

            // Get all todo items that belong to the list
            const todoItems = await Todo.find({listId:req.params.id})
            // How many items are left in the todo
            const itemsLeft = await Todo.countDocuments({listId:req.params.id, completed: false})

            res.render('todos.ejs', {listName: list.name, listId: list._id, todos: todoItems, left: itemsLeft, user: req.user, invitedUsers, isOwner})
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

    addUser: async (req, res)=>{
        try{
            // Get list by id
            const list = await List.findById(req.params.id).lean()

            // Check if list exists
            if(!list){
                res.redirect('/')
            }
            const invitedUsers = list.invitedUsers

            const user = await User.findOne({userName:req.body.username})

            if(!user){
                req.flash('errors', 'User does not exist.')
                res.redirect('/lists/' + req.params.id)
            }
            
            let errors = [];
            // Check if user exists
            if(!user){
                errors.push('User does not exist.')
            } 
            // User owner of the list
            if (user._id == list.userId) {
                errors.push("You can't add yourself.")
            }
            // User is already on the list
            if (invitedUsers.filter(invitedUser => invitedUser.toString() == user._id.toString()).length > 0) {
                errors.push("You have already added this user.")
            }

            if(errors.length > 0){
                req.flash('errors', errors)
                res.redirect('/lists/' + req.params.id)
            }else{
                // Add user to invitedUsers
                await List.updateOne(
                    { _id: req.params.id }, 
                    { $push: { invitedUsers: user._id } },
                );

                console.log('Added user.')
                res.redirect('/lists/' + req.params.id)
            }

        }catch(err){
            console.log(err)
         }
    },
}    