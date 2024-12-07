/*

- is the id apart of the json or is it the id in refernce to the key you use
  in the collections? 



*/


/*
NOTES: might need refresh? 
        . saveone doesnt work? 



*/

const express = require('express');
const { MongoClient} = require('mongodb');

const application = express();
const bodyParser = require('body-parser');

const multer = require('multer');
const { stringify } = require('querystring');
const upload = multer();

application.use(express.json());
application.use(bodyParser.urlencoded({ extended: true })) 

// change this URL
const Atlas_URI = 'mongodb+srv://ttm51:xfSy4NsB95vtiVRP@project-mongodb.sscfg.mongodb.net/capstone';
const mongodbClient = new MongoClient(Atlas_URI);

// custom schema import 
const Book = require('./mongoDb_Schema');
const { title } = require('process');




// replaced with collections from MongoDB
let db; 
let db_books_collection; 



    //keep rick's code
application.use(function(req, res, next)
    { 
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE,OPTIONS'); 
        res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With'); 
        if (req.method === "OPTIONS") 
            res.status(200).send(); 
        else 
            next(); 
        }
); 


//console.log(Books);
//template route
/*
application.get("", 
    function(req,res)
    {
        res.send('');
    }

);
*/


application.get('/books', async function(req,res) 
    {
        if('avail' in req.query)
        {

            if(req.query.avail==="true")
                try
                {
                    
                    const books = await db_books_collection.find({avail:true}).toArray();
                    let book_id_pairs = []; 
                    for(book of books)
                    {
                        book_id_pairs.push([book.id, book.title]);
                    }
                    
                    res.status(200).json(book_id_pairs);


                } 
                catch (error) 
                {
                    res.status(404).send(error);    
                }
            else if(req.query.avail==="false")
                try 
                {
                    const books = await db_books_collection.find({avail:false}).toArray();
                    let book_id_pairs = []; 
                    for(book of books)
                    {
                        book_id_pairs.push([book.id,book.title]);
                    }

                    res.status(200).json(book_id_pairs);
                } 
                catch (error) 
                {
                    res.status(404).send(error); 
                }
            else
            {
                res.status(404).json("404 not found");
            }
    
        }
        else
        {
            try 
            {
                emptyString=[];
                const bookCursor = await db_books_collection.find();
                while(await bookCursor.hasNext())
                {
                    let book = await bookCursor.next();
                    emptyString.push(book);
                }
                res.status(200).json(emptyString);
            } 
            catch(error) 
            {
                
                res.status(404).send(error);
            }
        }
        
    }
);

application.get('/books/:id', async function(req,res)
    {
        
        try
        {
           // Add Code
           // note , not find just findOne, a single book
            let param_id_num = Number(req.params.id);
            const book = await db_books_collection.findOne({id:param_id_num});
            if(book)
            {
                res.status(200).json(book);
            }
            else
            {
                res.status(404).send("404 not found ")
            }
        }
        catch (error)
        {
            res.status(404);
        }


    }

);


application.post('/books/',async function(req,res)
    {
        try
        {
           // Add Code
           // check if this book exists, based on ID
           // then if does exist 
           // send
           let id_number = Number(req.body.id);
           let book_in_db = await db_books_collection.findOne({id:id_number});
           // if null then this resulst in true
           // create book 
            if(!book_in_db)
            {
               
               // assume that the json is perfect
               req.body.id = id_number;
               const book_to_create = await db_books_collection.insertOne(req.body);
              // const book_to_addded = await book_to_create.save();
              // didnt work? 
               res.status(201).json(await db_books_collection.findOne({id:id_number}));
               
            }
            else
            {
               res.status(403).json("403 already exists");
            }
        }
        catch (error)
        {
            console.log(error);
            res.status(400).json(error);
        }
    }

);
//fixed custome code snippet
// res,req flipped like this causing code base to crash
application.delete('/books/:id',async function(req,res)
    {
        try
        {
                const id_number = Number(req.params.id);
                const book_to_delete = await db_books_collection.findOne({id:id_number});
                if(!book_to_delete)
                {
                // book doesnt exist 
                // book is nul
                res.status(204).send("204 no content"); 
                }
                else
                {
                // Add code
                await db_books_collection.deleteOne(book_to_delete);
                res.status(200).json(
                        {message:"Book Deleted", 
                         book: book_to_delete

                        }
                    );
                }
        }
        catch(error)
        {
            console.log(error); 
            res.send(error);
        }
    }
);


application.put('/books/:id',async function(req,res)
    {
        try
        {
           // Add Code
           const id_number = Number(req.params.id); 
           let book_to_update = await db_books_collection.findOne({id:id_number}); 
            
           if(!book_to_update)
           {
              // if book is null this is true
              res.status(404).json(`404 not found, Book with id ${id_number} is not in the database`); 
              
           }
           else
           {
              // Add code
              let book_updates = {}
              for(const key in req.body)
                {
                    if(!key)
                        {
                            continue;
                        }
                    else
                    {
                        if(key == "id")
                            book_updates[key] = Number(req.body[key]);
                        else 
                            book_updates[key] = req.body[key];
                    }
                }
                
                await db_books_collection.updateOne(
                    {   id: id_number },
                    {   $set: book_updates}
                    
                );
                res.status(200).json(await db_books_collection.findOne({id:id_number}));
           }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }
);

application.get("/easteregg", 
    function(req,res)
    {
        res.send('Good Job you found the : Easter Egg 🥚');
    }

);

application.all('*', 
    function(req,res)
    {
        res.status(400).send('400 Bad Request'); 
    }


);

async function main()
{
    try 
    {
        await mongodbClient.connect();
        db = mongodbClient.db('capstone');
        db_books_collection = db.collection('books');
        
        console.log("Connected to database mongodb_assignment");
        application.listen(7000);
    } 
    catch(error) 
    {
        console.error(error);
    }
    
}

main();