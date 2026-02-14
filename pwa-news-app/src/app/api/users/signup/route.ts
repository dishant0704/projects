import { connect } from "@/mongoConfig/mongoDB";
import User from "@/models/userModels"
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({
                message:"User alredy exists",
                success:false,
            })
        }

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save();

        //send verification mail
        await sendMail({email, emailType:"VERIFY", userId:saveUser._id})

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            saveUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.massage}, {status:500})        
    }
}