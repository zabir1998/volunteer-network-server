const express = require('express')
const bodyParser = require('body-parser');
const cors= require('cors')

const port = 5000

const app = express()

app.use(cors());
app.use(bodyParser.json());

const pass="01794000059"


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zabir:01794000059@cluster0.dpuow.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const taskCollection = client.db("volunteerNetwork").collection("task");
  
  app.post('/addTask',(req,res)=>{
    const newTask=req.body;
    taskCollection.insertOne(newTask)
    .then(result=>{
      res.send(result.insertedCount>0);
    })
    console.log(newTask)

  })

  app.get('/bookings', (req, res)=>{
    // console.log(req.query.email);

    taskCollection.find({email: req.query.email})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)