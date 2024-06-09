import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import Person from "@/model/Person";

const GET = async (req, context)=>{
    await dbConnection();
    try {
        const id = context.params.id;
        const person = await Person.findOne({_id: id});
        return NextResponse.json(person, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

const PUT = async (req, context)=>{
    await dbConnection();
    try {
        const id = context.params.id;
        const body = await req.json();
        const replacedPerson = await Person.findOneAndReplace({_id: id}, body, {new: true, upsert: false});
        return NextResponse.json(replacedPerson, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

const PATCH = async (req, context)=>{
    await dbConnection();
    try {
        const id = context.params.id;
        const body = await req.json();
        const updatedPerson = await Person.findOneAndUpdate({_id: id}, body, {new: true, upsert: false});
        return NextResponse.json(updatedPerson, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

const DELETE =  async (req, context)=>{
    await dbConnection();
    try {
        const id = context.params.id;
        const deletedPerson = await Person.findOneAndDelete({_id: id});
        return NextResponse.json(deletedPerson, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

export { GET, PUT, PATCH, DELETE };