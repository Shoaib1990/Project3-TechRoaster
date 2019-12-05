let express = require("express");
let cors = require('cors');
let MongoClient = require("mongodb").MongoClient; // class
let bodyParser = require("body-parser"); // object
let sanitizer = require("express-sanitizer");
let objectId = require("mongodb").ObjectId;

// MongoDB constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbTechs";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());
// add body parser middleware to parse up any JSON coming in with request
app.use(bodyParser.json());
// add sanitizer to clean all JSON incoming data
app.use(sanitizer());

// express static middleware - setup static files location
app.use(express.static('./dist'));


// display api data request
app.get("/get", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techArray = await mongoClient.db(DB_NAME).collection("technologies").find().sort("name",1).toArray();
        let courseArray = await mongoClient.db(DB_NAME).collection("courses").find().sort("name",1).toArray();
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
        let json = { 
                    "technologies": techArray,
                    "courses": courseArray
                    };

        response.status(200);
        // serializes sampleJSON to string format]

        response.send(json);
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});


// add new course request
app.post("/post", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        //let techCollection = await mongoClient.db(DB_NAME).collection("technologies");
        let courseCollection = mongoClient.db(DB_NAME).collection("courses");
        
        // sanitize our incoming JSON
        // request.body.courses.forEach(course => {
        //     course.code = request.sanitize(course.code);
        //     course.name = request.sanitize(course.name);
        // });
        request.body.code = request.sanitize(request.body.code);
        request.body.name = request.sanitize(request.body.name);

        // add the new document into MongoDB
        let result = await courseCollection.insertOne(request.body);
        mongoClient.close();

        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);
        

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

// add new technology request
app.post("/postTech", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = await mongoClient.db(DB_NAME).collection("technologies");

        // sanitize our incoming JSON
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });

        // add the new document into MongoDB
        let result = await techCollection.insertOne(request.body);
        mongoClient.close();

        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);
        

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

// app.post("/postTech", async (request, response) => {
//     // construct MongoClient object for working with MongoDB
//     let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     // Use connect method to connect to the server
//     try {
//         await mongoClient.connect(); 
//         // convert all documents in technologies collection into array in one awesome statement!
//         let techCollection = await mongoClient.db(DB_NAME).collection("technologies");

//         //console.log("Incoming  JSON");
//         // console.log(request.body);
//         // console.log(request.body.name);

//         // console.log("Before: ");
//         // console.log(request.body.description);
//         // request.body.description = request.sanitize(request.body.description);
//         // console.log("After:");
//         // console.log(request.body.description);

//         // sanitize our incoming JSON
//         request.body.name = request.sanitize(request.body.name);
//         request.body.description = request.sanitize(request.body.description);
//         request.body.difficulty = request.sanitize(request.body.difficulty);
//         request.body.courses.forEach(course => {
//             course.code = request.sanitize(course.code);
//             course.name = request.sanitize(course.name);
//         });

//         // add the new document into MongoDB
//         let result = await techCollection.insertOne(request.body);
//         mongoClient.close();

//         response.status(200);
//         // send the result of the insert back to use on client
//         response.send(result);
        

//     } catch (error) {
//         console.log(`>>> ERROR : ${error}`);
//         response.status(500);
//         response.send({error: `Server error with get : ${error}`});
//         throw error;
//     }
// });


// edit existing course request
app.put("/put", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        
        let courseCollection = mongoClient.db(DB_NAME).collection("courses");

        // convert url routing parameter to ObjectId format (24)
        let id = objectId(request.sanitize(request.body._id));
        
        //let id = objectId(request.sanitize(request.body._id));
        request.body.code = request.sanitize(request.body.code);
        request.body.name = request.sanitize(request.body.name);
        

        // building our update query
        let selector = {"_id": id};
        let updateValue = {$set: {"code":request.body.code,"name":request.body.name}};
        

        // add the new document into MongoDB
        // let result = await techCollection.updateOne(selector, newValue);
        let result = await courseCollection.updateOne(selector, updateValue);
        console.log("RESULT >> " + result);
        mongoClient.close();

        response.status(200);
        // send the reult of the insert back to use on client
        response.send(result);
                

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with delete : ${error}, StatusCode: ${response.statusCode} `});
        throw error;
    }
});

app.put("/putTech", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");

        // convert url routing parameter to ObjectId format (24)
        let id = objectId(request.sanitize(request.body._id));
        //let id = objectId(request.params._id);

        // sanitize our incoming JSON
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });
        
        // building our update query
        let selector = {"_id": id};
        let newValue = { $set: {"name":request.body.name, "description": request.body.description,"difficulty":request.body.difficulty,"courses": request.body.courses}};
        // add the new document into MongoDB
        let result = await techCollection.updateOne(selector, newValue);
        
        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);
        

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with delete : ${error}, StatusCode: ${response.statusCode} `});
        throw error;
    }
});



// original

// app.put("/put/:id", async (request, response) => {
//     // construct MongoClient object for working with MongoDB
//     let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     // Use connect method to connect to the server
//     try {
//         await mongoClient.connect(); 
//         // convert all documents in technologies collection into array in one awesome statement!
//         let techCollection = mongoClient.db(DB_NAME).collection("technologies");

//         // convert url routing parameter to ObjectId format (24)
//         let id = objectId(request.params.id);

//         // sanitize our incoming JSON
//         request.body.name = request.sanitize(request.body.name);
//         request.body.description = request.sanitize(request.body.description);
//         request.body.difficulty = request.sanitize(request.body.difficulty);
//         request.body.courses.forEach(course => {
//             course.code = request.sanitize(course.code);
//             course.name = request.sanitize(course.name);
//         });
        
//         // building our update query
//         let selector = {"_id": id};
//         let newValue = { $set: {"name":request.body.name, "description": request.body.description,"difficulty":request.body.difficulty,"courses": request.body.courses}};
//         // add the new document into MongoDB
//         let result = await techCollection.updateOne(selector, newValue);
        
//         mongoClient.close();
//         response.status(200);
//         // send the result of the insert back to use on client
//         response.send(result);
        

//     } catch (error) {
//         console.log(`>>> ERROR : ${error}`);
//         response.status(500);
//         response.send({error: `Server error with delete : ${error}, StatusCode: ${response.statusCode} `});
//         throw error;
//     }
// });


// working
// delete course request
// app.delete("/delete/:id", async (request, response) => {
//     // construct MongoClient object for working with MongoDB
//     let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     // Use connect method to connect to the server
    
//     try {
//         await mongoClient.connect(); 
//         // convert all documents in technologies collection into array in one awesome statement!
//         let courseCollection = mongoClient.db(DB_NAME).collection("courses");

//         // convert url routing parameter to ObjectId format (24)
//         let id = objectId(request.params.id);
        
//         // building our update query
//         let selector = {"_id": id};
//         //let newValue = { $set: {"code":request.body.code, "name": request.body.name}};
//         // add the new document into MongoDB
//         let result = await courseCollection.remove(selector);
        
//         mongoClient.close();
//         response.status(200);
//         // send the result of the insert back to use on client
//         //let message = {"message":`Successfully deleted _id :  ${request.params.id} and StatusCode is ${response.statusCode} `};
//         //response.send(message);
//         response.send(result);

//     }
    
//     catch (error) {
//         console.log(`>>> ERROR : ${error}`);
//         response.status(500);
//         response.send({error: `could not find the requested _id :  ${request.params.id} and StatusCode is ${response.statusCode} `});
//         throw error;
//     }
// });

app.delete("/delete/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let courseCollection = mongoClient.db(DB_NAME).collection("courses");

        // convert url routing parameter to ObjectId format (24)
        let id = objectId(request.params.id);
        
        // building our update query
        let selector = {"_id": id};
        //let newValue = { $set: {"code":request.body.code, "name": request.body.name}};
        // add the new document into MongoDB
        let result = await courseCollection.remove(selector);
        
     //   mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        //let message = {"message":`Successfully deleted _id :  ${request.params.id} and StatusCode is ${response.statusCode} `};
        //response.send(message);
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `could not find the requested _id :  ${request.params.id} and StatusCode is ${response.statusCode} `});
        throw error;
    }

    try {
        //await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");

        // convert url routing parameter to ObjectId format (24)
        let id = objectId(request.params.id);
        
        // building our update query
        let selector = {"_id": id};

        // db.survey.update(
        //     { },
        //     { $pull: { courses: { code: 8 , name: "B" } } },
        //     { multi: true }
        //   )

        let updateValue = { $pull: { courses: {"code":request.body.code, "name": request.body.name}}};  
        //let newValue = { $set: {"code":request.body.code, "name": request.body.name}};
        // add the new document into MongoDB
        let result = await techCollection.updateMany(selector,updateValue,{multi:true});
        
        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        //let message = {"message":`Successfully deleted _id :  ${request.params.id} and StatusCode is ${response.statusCode} `};
        //response.send(message);
        response.send(result);

    }    
    catch (error) {
        console.log(`>>> ERROR : ${error}`);
        // response.status(500);
        // response.send({error: `could not find the requested _id :  ${request.params.id} and StatusCode is ${response.statusCode} `});
        throw error;
    }
});



// delete technology request
app.delete("/deleteTech/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");

        // convert url routing parameter to ObjectId format (24)
        let id = objectId(request.params.id);
        
        // building our update query
        let selector = {"_id": id};
        let newValue = { $set: {"name":request.body.name, "description": request.body.description,"difficulty":request.body.difficulty,"courses": request.body.courses}};
        // add the new document into MongoDB
        let result = await techCollection.remove(selector);
        
        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        let message = {"message":`Successfully deleted _id :  ${request.params.id} and StatusCode is ${response.statusCode} `};
        response.send(message);
        // response.send(result);
        
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `could not find the requested _id :  ${request.params.id} and StatusCode is ${response.statusCode} `});
        throw error;
    }
});






app.listen(8080, () => console.log("Listening on port 8080"));