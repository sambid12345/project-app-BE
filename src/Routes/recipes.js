const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Recipe = require('../models/Recipe');

const RecipeBook = require('../models/RecipeBook');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;


// MongoClient.connect("mongodb://127.0.0.1:27017/app-db", function(err, db) {
//   if(err) { return console.dir(err); }

//   var collection = db.collection('kittens');

//     collection.find().toArray(function(err, kittens) {
        
//     });    
// });

router.get('/recipeBook', (req, res, next)=>{
    console.log('inside recibookrouter');
    RecipeBook.find().then(recipebookData=>{
        console.log(recipebookData, 'recipe book data');
        res.status(200).send(recipebookData);
        next();
    }, err=>{
        res.send('Hello User');
        next();
    })
})

router.get('/fetchRecipe', (req, res, next)=>{
    console.log('inside fetchReciperouter');
    
    Recipe.find().then(recipeList=>{
        console.log(recipeList, 'recipe list data');
        res.status(200).send(recipeList);
        next();
    }, err=>{
        res.send('Hello User ERROR');
        next();
    })
})

router.put('/storeRecipes', async (req, res, next)=>{
    console.log('data to save',req.body);
    let data = req.body;
    let newRecordList = [], oldRecordList=[], oldIds = [];
    data.forEach(element => {
        if(element._id){
            oldRecordList.push( element );
            oldIds.push(new ObjectId(element._id));
        }else{
            newRecordList.push(element);
        }
    });

    
    
    // { name: { $in: [ 'Mango Rice', 'Indian Chicken Curry' ] } }
   

    const bulkOperations = oldRecordList.map((doc) => ({
        
        updateOne: {
          filter: { _id: new ObjectId(doc._id)},
          update: doc
        }
      }));
  
      console.log('bulk operations', bulkOperations);
      try{
        await Recipe.bulkWrite(bulkOperations);
        res.status(200).send('data saved');
      }catch(err){
        console.log(err);
        res.status(500).send('Error occured');
      }
      
})

module.exports = router;