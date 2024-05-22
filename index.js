const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 


// eventManage
// t7MaMo9TeC70Szf1
 

const uri = "mongodb+srv://eventManage:t7MaMo9TeC70Szf1@cluster0.o9ylutr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const database = client.db("eventManagement");
    const eventsCollection = database.collection("events");
    const usersCollection = database.collection("users");
    const bookedCollection = database.collection("bookedEvents");
    const favCollection = database.collection("favourite");

    app.get('/events', async(req, res) => {
        const cursor = eventsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/event/:id'  , async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await eventsCollection.findOne(query);
        res.send(result);
    })

    app.get('/user/:email'  , async(req, res) => {
        const email = req.params.email;
        const query = {userEmail : email};
        const result = await usersCollection.findOne(query);
        res.send(result); 
    })
    app.get('/booked/:email'  , async(req, res) => {
        const email = req.params.email;
        const query = {userEmail : email};
        const result = await usersCollection.findOne(query);
        res.send(result);
    })


    app.get("/userBooked/:email", async (req, res) => {
      const email = req.params.email;
      const query = {userEmail : email}
      const result = await bookedCollection.find(query).toArray(); 
      res.send(result)
    })
    app.get("/userFav/:email", async (req, res) => {
      const email = req.params.email;
      const query = {userEmail : email}
      const result = await favCollection.find(query).toArray(); 
      res.send(result)
    })


    // app.get('/isFav/:email'  , async(req, res) => {
    //     const email = req.params.email;
    //     const id = req.body;
    //     const query = {userEmail : email, _id : id};
    //     const result = await favCollection.findOne(query);
    //     res.send(result);
    // }) 
   app.get('/users', async(req, res) => {
    const cursor = usersCollection.find();
    const result = await cursor.toArray();
    res.send(result);
   })

  app.get("/getusers", async (req, res) => {
    const result = await usersCollection.find().toArray(); 
      res.send(result)
  })


  app.post('/users' , async(req, res) => {    
    const user = req.body;
    console.log(user);
    const result = await usersCollection.insertOne(user);
    res.send(result);

  })

  app.post("/bookedEvent", async (req, res) => {
    const bookedEvent = req.body;
    const result = await bookedCollection.insertOne(bookedEvent);
    res.send(result);

  }) 
  app.post("/fav", async (req, res) => {
    const fav = req.body;
    const result = await favCollection.insertOne(fav);
    res.send(result);

  }) 

  app.patch("/changeRole/:userEmail", async (req, res) => {
    const userRole = req.body;
    const userEmail = req.params.userEmail;
    console.log(userEmail, userRole)
    const filter = { userEmail : userEmail };

     const changeRole = {
       $set: {
         role: userRole.role
      }
    }

    const result = await usersCollection.updateOne(filter , changeRole); 
    res.send(result); 
  })
  app.patch("/changePrem/:userEmail", async (req, res) => {
    const userRole = req.body;
    const userEmail = req.params.userEmail;
    console.log(userEmail, userRole)
    const filter = { userEmail : userEmail };

     const changeRole = {
       $set: {
         rqstPrem: userRole.role
      }
    }

    const result = await usersCollection.updateOne(filter , changeRole); 
    res.send(result);
  })
  app.patch("/changePrem/:userEmail", async (req, res) => {
    const userRole = req.body;
    const userEmail = req.params.userEmail;
    console.log(userEmail, userRole)
    const filter = { userEmail : userEmail };

     const changeRole = {
       $set: {
         rqstPrem: userRole.role
      }
    }

    const result = await usersCollection.updateOne(filter , changeRole); 
    res.send(result);
  })

  app.patch("/updateEvent/:id", async (req, res) => {
    const id = req.params.id;
    const event = req.body; 
    const filter = { _id : new ObjectId(id) };

     const updateEvent = {
       $set: {
         ...event
      }
    }

    const result = await eventsCollection.updateOne(filter , updateEvent); 
    res.send(result);
  })

  app.delete('/deleteUserContactReq/:id', async (req, res) => {
    const intId = req.params.id;
    
     const query = { _id : new ObjectId(intId) };
     const result = await usersCollection.deleteOne(query); 
     res.send(result);
  })
  app.delete('/deleteEvent/:id', async (req, res) => {
    const intId = req.params.id;
    
     const query = { _id : new ObjectId(intId) };
     const result = await eventsCollection.deleteOne(query); 
     res.send(result);
  })
  app.delete('/deleteUserEvent/:id', async (req, res) => {
    const intId = req.params.id;
    
     const query = { _id : intId };
     const result = await bookedCollection.deleteOne(query); 
     res.send(result);
  })

  app.put('/addBiodata', async (req, res) => {

    const event = req.body;     
      
       const result = await eventsCollection.insertOne(event); 
       res.send(result);
    
  })



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Event server in runninggggggg 22');
})


app.listen(port, () => {
    console.log(`Event server is running on port ${port}`);
})