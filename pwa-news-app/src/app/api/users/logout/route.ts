import { connect } from "@/mongoConfig/mongoDB";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request:NextRequest){
    try {

        const responce = NextResponse.json({
            message:"Logout successfully",
            success: true
        })

        responce.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        });

        return responce;
        
    } catch (error:any) {
        return NextResponse.json({message: error.message},{status:400})
        
    }
}
