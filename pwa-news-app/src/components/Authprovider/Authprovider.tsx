"use client"
import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
const Authprovider = ({children}: PropsWithChildren) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Authprovider
