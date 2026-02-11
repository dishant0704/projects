import { connect } from "@/mongoConfig/mongoDB";
import User from "@/models/userModels"
import { NextResponse, NextRequest } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const requestBody = await request.json()
        const {token} = requestBody;
        console.log("token from verify: ", token)

        let user = await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt: Date.now()}});       

        if(!user){
            return NextResponse.json({error:"Token expired Or invailid"},{status:400})
        }

        console.log("before",user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        console.log("After: ",user)
        await user.save();

         return NextResponse.json({
            message: "Email verifed successfully",
            success: true
        },{status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}