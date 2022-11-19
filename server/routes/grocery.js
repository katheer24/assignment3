let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Grocery = require('../models/grocery');

// Read Operation 

router.get('/', (req,res,next)=>{
    Grocery.find((err,grocerylist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('grocery/list',{
                title:'Your Grocery List', 
                Grocerylist: grocerylist
            })
        }
    
    });
});

// Add Operation
router.get('/add', (req,res,next)=>{
    res.render('grocery/add',{title:'Add Item'})
});
//post operation for displaying add operation
router.post('/add', (req,res,next)=> {
    let newItem = Grocery ({
        "category":req.body.category,
        "item":req.body.item,
        "quantity":req.body.quantity,
        "price":req.body.price
    });
    Grocery.create(newItem,(err,Grocery) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/grocery-list');
        }
    });

});

// Edit Operation
router.get('/edit/:id', (req,res,next)=>{
    let id = req.params.id;
    Grocery.findById(id,(err,groceryToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('grocery/edit',{title:'Edit Grocery', grocery:groceryToEdit})
        }
    });
});
//post operation for displaying edit operation
router.post('/edit/:id', (req,res,next)=>{
    let id=req.params.id;
    let updateGrocery = Grocery({
        "_id":id,
        "category":req.body.category,
        "item":req.body.item,
        "quantity":req.body.quantity,
        "price":req.body.price
    });
    Grocery.updateOne({_id:id},updateGrocery,(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/grocery-list');
        }

    })
});

// delete Operation
router.get('/delete/:id', (req,res,next)=>{
    let id = req.params.id;
    Grocery.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/grocery-list/');
        }
    })
});


module.exports=router;