import express from 'express'
import mongoose  from 'mongoose'
import TodoModel from './models/TodoScheme.js'

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//mongoDB connection
const DB_URI = `mongodb+srv://admin:admin@cluster0.3nsq883.mongodb.net/`;
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.get("/", async  (req, res) => {
    console.log("Hello World");
    try {
        const userSave = await TodoModel.create({
            todo:'hello',
            created_by:1
        });
        res.json({
            message: 'Successfully Added',
            status: false,
            data: null,
          });
    } catch (error) {
        res.json({
          message: error.message,
          status: false,
          data: null,
        });
    }
    // res.send();
})


app.post("/create-todo", (req, res) => {
    console.log("Hello World");
})



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});