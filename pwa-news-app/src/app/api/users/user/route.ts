import { connect } from "@/mongoConfig/mongoDB";
import User from "@/models/userModels"
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request:NextRequest){
    try {
        const requestBody = await request.json();
        const {id} = requestBody
        console.log("id: ", id)
        const currUser = await User.findOne({_id: id})        
        //Check user
        if(!currUser){
            return NextResponse.json({
                message:"User not found",
                data:[]
             }, {status:400})
        }else{
            return NextResponse.json({
                message: "User found",
                data:currUser
            }, {status:200})
        }

    } catch (error:any) {
       return NextResponse.json({error:error.message},{status:500})
    }
}