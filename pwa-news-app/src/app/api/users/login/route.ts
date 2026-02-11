import { connect } from "@/mongoConfig/mongoDB";
import User from "@/models/userModels"
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Token } from "@/type";

connect();

export async function POST(request:NextRequest){

    try {
        const requestBody = await request.json()
        const {email,password} = requestBody;
        
        //Vailidation
        console.log(requestBody);

        // find User
        const user = await User.findOne({email});
        
        //if User not exists
        if(!user){
            return NextResponse.json({message:"User does not exists"},{status:400})
        }

        // check password
         const validPassword = await bcrypt.compare(password, user.password)
        
        // if Password not valid
        if(!validPassword){
             return NextResponse.json({message:"Username Or Password not match"},{status:400})
        }
        
        //JWT
        const tokenData:Token = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // responce
        const jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const responce = NextResponse.json({
            message:"Logged in success",
            success: true,
        });

        // Set cookies
        responce.cookies.set("token",jwtToken,{
            httpOnly:true
        })

        return responce;

    } catch (error:any) {
        return NextResponse.json({message: error.message},{status:400})
        
    }
}