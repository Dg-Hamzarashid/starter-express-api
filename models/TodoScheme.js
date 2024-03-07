import {mongoose, model, Mongoose }  from 'mongoose'

const tableSchema = new mongoose.Schema({
    todo: {
        type:String,
        required:true,
    },
    created_on: {
        type: Date,
        required: true,
        default: Date.now,
    },
    created_by:String,
});

const TodoModel = mongoose.model("todo",tableSchema);
export default TodoModel;