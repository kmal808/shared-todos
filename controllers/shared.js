const Shared = require('../models/Shared')

module.exports = {
    getShared: async (req,res)=>{
        console.log(req.user)
        try{
            const sharedItems = await Shared.find({userId:req.user.id})
            const itemsLeft = await Shared.countDocuments({userId:req.user.id,completed: false})
            res.render('shared.ejs', {shared: sharedItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createShared: async (req, res)=>{
        try{
            await Shared.create({shared: req.body.sharedItem, completed: false, userId: req.user.id, userName: req.user.name})
            console.log('Todo has been added!')
            res.redirect('/shared')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Shared.findOneAndUpdate({_id:req.body.sharedIdFromJSFile},{
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
            await Shared.findOneAndUpdate({_id:req.body.sharedIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteShared: async (req, res)=>{
        console.log(req.body.sharedIdFromJSFile)
        try{
            await Shared.findOneAndDelete({_id:req.body.sharedIdFromJSFile})
            console.log('Deleted Shared')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    