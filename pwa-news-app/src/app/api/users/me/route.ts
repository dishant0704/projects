import { connect } from "@/mongoConfig/mongoDB";
import User from "@/models/userModels"
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request:NextRequest){
    try {
        //extract data from token
        const userID = await getDataFromToken(request);
        const user = await User.findOne({_id: userID}).select("-passworld -username");

        //Check user
        if(!user){
             return NextResponse.json({
                message:"User not found",
                data:[]
             }, {status:500})
        }else{

            return NextResponse.json({
                message:"User found",
                data:user
             }, {status:400})

        }

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}
