import { NextResponse } from "next/server";
import Person from "@/model/Person";
import dbConnection from "@/lib/dbConnection";

const GET = async (req)=>{
    await dbConnection();
    try {
        const persons = await Person.find();
        return NextResponse.json(persons, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
};

const POST = async (req)=>{
    await dbConnection();
    try {
        const body = await req.json();
        const newPerson = await Person.create(body);
        return NextResponse.json(newPerson, {status: 201});
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
}

export { GET, POST };