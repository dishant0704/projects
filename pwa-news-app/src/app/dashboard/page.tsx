"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBody from '@/components/PageBody'


const Dashboard = () => {
    const {data: session, status} = useSession(); 

    if(status === "unauthenticated"){
    redirect("/login")
    }

    if(!session){
      return <p>Loading...</p>
    }
    const {user} = session  
  return (
    <div className='container mx-auto'>
      <Header {...user}/>
      <PageBody>
        Hi
      </PageBody>
      <Footer className='text-right float-right' />
    </div>
  )
}

export default Dashboard
