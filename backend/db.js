const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://krishn2709:Gofood123@cluster0.m3tzwkz.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async()=>{
    await  mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err){
            console.log("--",err);
        }
        else{
        console.log("connnected successfully");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){ 

            const foodCategory  = await mongoose.connection.db.collection("food_categories");
             
            foodCategory.find({}).toArray(function (err,catData){
                if(err) console.log(err);
            else{
                global.food_items = data;
                global.food_categories = catData;
            };
            })
        })
        }
    });
}
module.exports = mongoDB;