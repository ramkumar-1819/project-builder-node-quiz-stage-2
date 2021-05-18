const mongoClient=require('mongodb').MongoClient;  //getting the mondodb module to connect and manipulate to the database
const url="mongodb://localhost:27017/";
const datas=require('./datamodules');              //getting the datas from a module
const questions=datas.questions;                   //getting the questions from exported module
const options=datas.options;                       //getting the options from exported module
const answers=datas.answers;                       //getting the answers from exported module
const getQuestion={question:"The Largest Desert in the World"}; //query for question that need to be updated
const deleteQuestionQuery={question:"Which is the largest desert in the world?"}; //query for question that need to be deleted
const deleteOptionQuery={optionC:"Antartic"};      //query for option that need to be deleted
const deleteAnswerQuery={answer:"Antartic"};       //query for answer that need to be deleted
const updateQuestion={$set:{question:"Which is the largest desert in the world?"}} //new document(ie)when update happen in question

mongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    const dbo=db.db("quiz");                       //Creating DB called quiz
    console.log("Database Created");
    //Creating collection and inserting datas
    dbo.collection("questions").insertMany(questions,(err,res)=>{    
        if(err) throw err;
        console.log("Question Collection Created and data inserted");
    })
    dbo.collection("options").insertMany(options,(err,res)=>{
        if(err) throw err;
        console.log("Option Collection Created and data inserted");
    })
    dbo.collection("answers").insertMany(answers,(err,res)=>{
        if(err) throw err;
        console.log("Answer Collection Created and data inserted");
    })


   dbo.collection("questions").find({}).toArray((err,res)=>{               //fetch the data from question collection
       if(err) throw err;
       console.log(res)
       
   })
   dbo.collection("options").find({}).toArray((err,res)=>{                 //fetch the data from options collection
       if(err) throw err;
       console.log(res)
   })
   dbo.collection("answers").find({}).toArray((err,res)=>{                 //fetch the data from answer collection
       if(err) throw err;
       console.log(res)
   })
   dbo.collection("questions").find(getQuestion).toArray((err,res)=>{      //fetch the data from question collection based on some queries
       if(err) throw err;
       console.log(res)
   })


   
   dbo.collection("questions").updateOne(getQuestion,updateQuestion,(err,res)=>{  //update the data in question collection
       if(err) throw err;
       console.log("1 document updated")
       console.log(res.result.nModified)
   })



   dbo.collection("questions").deleteOne(deleteQuestionQuery,(err,res)=>{     //deleted the document in question based on the query
       if(err) throw err;
       console.log("1 document deleted")
   })
   dbo.collection("options").deleteOne(deleteOptionQuery,(err,res)=>{        //deleted the document in option based on the query
    if(err) throw err;
    console.log("1 document deleted")
   })
   dbo.collection("answers").deleteOne(deleteAnswerQuery,(err,res)=>{        //deleted the document in answer based on the query
    if(err) throw err;
    console.log("1 document deleted")
   })
   db.close()
})
