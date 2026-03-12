"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"

import { oauthSignIn } from "@/actions/auth"
import { redirect } from 'next/dist/server/api-utils'
import axios from 'axios'

interface OAuthBtnProps {
  name: string
  icon?: IconProp|any
  reDerPath?:string
}

const OAuthBtn = ({ name, icon, reDerPath }: OAuthBtnProps) => {  
  const btnIcon = Object(icon)

  const btnClikc =  async () =>{
    const responce = await axios.post("/api/users/logout")
    const responceData = responce.data;
    const {success} = responceData;
    console.log("success: ",success)
    if(success){
      oauthSignIn(name,{redirectTo:reDerPath})
    }
  }
  return (
    <FontAwesomeIcon icon={btnIcon} onClick={() => btnClikc()}/>
  )
}

export default OAuthBtn


