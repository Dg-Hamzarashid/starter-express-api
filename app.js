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

app.get("/gettodo", async (req, res) => {
    let todos = await TodoModel.find({});
    res.send(todos);
})


app.post("/create-todo", async  (req, res) => {
    try {
        const {todo} = req.body;
        if (!todo) {
            res.json({
                message: 'Todo is Required',
                status: false,
            });
        }
        const userSave = await TodoModel.create({
            todo: todo,
            created_by:1
        });
        res.json({
            message: 'Successfully Added',
            status: true,
            data: null,
          });
    } catch (error) {
        res.json({
          message: error.message,
          status: false,
          data: null,
        });
    }
})

app.get("/edittodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userRecords = await TodoModel.findById(id);
        res.json({
            message: 'Successfully getting data',
            status: true,
            data: userRecords,
          });
    } catch (error) {
        res.json({
          message: error.message,
          status: false,
          data: null,
        });
    }
})


app.delete("/deletetodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userRecords = await TodoModel.findByIdAndDelete(id);
        res.json({
            message: 'Successfully Deleted',
            status: true,
            data: null,
          });
    } catch (error) {
        res.json({
          message: error.message,
          status: false,
          data: null,
        });
    }
})

app.put("/updatetodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {todo} = req.body;

        if (!id || !todo) {
            res.json({
            message: 'Required Parameter Not Found',
            status: false,
            });
        }
        const Todomodel = await TodoModel.findByIdAndUpdate(id, {
            todo
        });
        res.json({
            message: 'Successfully Updated',
            status: true,
            data: null,
          });
    } catch (error) {
        res.json({
          message: error.message,
          status: false,
          data: null,
        });
    }
})




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});