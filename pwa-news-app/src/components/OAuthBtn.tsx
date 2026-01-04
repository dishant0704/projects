"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"

import { oauthSignIn } from "@/actions/auth"
import { redirect } from 'next/dist/server/api-utils'

interface OAuthBtnProps {
  name: string
  icon?: IconProp|any
  reDerPath?:string
}

const OAuthBtn = ({ name, icon, reDerPath }: OAuthBtnProps) => {  
  const btnIcon = Object(icon)
  return (
    <FontAwesomeIcon icon={btnIcon} onClick={() => oauthSignIn(name,{redirectTo:reDerPath})}/>
  )
}

export default OAuthBtn


