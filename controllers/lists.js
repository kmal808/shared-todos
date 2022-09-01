const List = require('../models/List')

module.exports = {
    getLists: async (req,res)=>{
        console.log(req.user)
        try{
            const listItems = await List.find({userId:req.user.id})
            const itemsLeft = await List.countDocuments({userId:req.user.id,completed: false})
            res.render('lists.ejs', {lists: listItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createList: async (req, res)=>{
        try{
            await List.create({list: req.body.listItem, completed: false, userId: req.user.id})
            console.log('List has been added!')
            res.redirect('/lists')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await List.findOneAndUpdate({_id:req.body.listIdFromJSFile},{
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
            await List.findOneAndUpdate({_id:req.body.listIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteList: async (req, res)=>{
        console.log(req.body.listIdFromJSFile)
        try{
            await List.findOneAndDelete({_id:req.body.listIdFromJSFile})
            console.log('Deleted List')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    