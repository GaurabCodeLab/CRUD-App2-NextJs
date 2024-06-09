import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    }
});

const Person = models.Person || model("Person", personSchema);

export default Person;