'use client'
import Footer from '@/components/Footer';
import axios from 'axios';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const Verifyemail = () => {

    const [variMessage, setVariMessage] = useState({message:"Please veridate your account", success:false})
    const [logingFlag, setLogingFlag] = useState(false)
     const timerCount = useRef<any | null>(null);

    const router = useSearchParams();
    const token = router.get("token");

    useEffect(() => {
        if(variMessage.success){
            timerCount.current = setTimeout(() => {
              redirect("/login");
            }, 5000);
        }        
    
        return () => {
          if (timerCount.current) {
            // Type guard
            clearTimeout(timerCount.current);
          }
        };
      }, [variMessage]);
    

    const heandleLogin = async() =>{
        setLogingFlag(true)
        let bodyToken = {token: token}        
        const apiResponce = await axios.post("/api/users/verifyemail", bodyToken);
        const responceData = apiResponce.data;
        const {success}= responceData;
        if(success){
            setVariMessage(responceData);
             setLogingFlag(false)
        }
    }

  return (
    <div className="grid place-items-center h-screen">
      <div className="lx:w-1/3 2xl:w-1/4 p-5 space-y-5 bg-white dark:bg-dark-conBgColor rounded-sm dark:text-dark-fontColor shadow-2xl">
        <h1 className="text-center font-bold text-3xl dark:text-secondaryColor">
          Sign Up
        </h1>        
          <div className="input text-center p-5 space-y-5">
            <h1 className="font-bold text-2x1">{variMessage.message}</h1>
            <p className="font-medium text-borderColor">
              Please check Verify button for verifed
            </p>
            <div className="p-2 text-center">
            <button
              className="px-4 py-2 outline-0 bg-linkColor text-black rounded-sm cursor-pointer"
              onClick={heandleLogin}
              disabled={logingFlag}
              >
              Verify
            </button>
          </div>
          </div>
      
        <Footer className="text-center m-auto" />
      </div>
    </div>
  );
}

export default Verifyemail
