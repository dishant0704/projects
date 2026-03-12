"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBody from "@/components/PageBody";

import { useAppSelector, useAppDispatch } from "@/hooks/store/hooks";
import { addUser } from "@/store/features/users/userSlice";
import axios from "axios";
import { verifyAndReadToken } from "@/helpers/getUser";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch(); 

   useEffect(()=>{    
      saveUserSate();
  },[]);

  useEffect(()=>{    
      saveUserSate();
  },[session]);

  

  async function saveUserSate() {
    let userID = null;    

    const userData = await verifyAndReadToken();

    if (userData) {
    userID = userData.id
    } 

    if(session){
      const { user } = session as any;
      console.log("user: ", user)
      if (user) {
      userID = user.id
      }
    }

    if(!userID && !session){
      redirect('/login')
    }

    if(!userID) return ;  
    
    let bodyToken = { id: userID };
    const apiResponce = await axios.post("/api/users/user", bodyToken);
    const { data } = apiResponce.data;
    dispatch(addUser({ data }));

    setLoading(false)

  }

    if (loading) {      
      return <p>Loading...</p>;
    } 

  return (
    <div className="container mx-auto">
      <Header />
      <PageBody>Hi</PageBody>
      <Footer className="text-right float-right" />
    </div>
  );
};

export default Dashboard;
