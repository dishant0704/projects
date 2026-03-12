import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { oauthSignOut } from "@/actions/auth";

import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/hooks/store/hooks";
import { useSession } from "next-auth/react";
import axios from "axios";
import { redirect } from "next/navigation";


const ProfileIcon = () => {
  const [isOpen, setIsopen] = useState(false);

  const { data: session } = useSession();
  let curUser;

  // fetchData from MongoDB
  const r_user = useAppSelector((state) => state.user);
  const { user } = r_user as any;

   if(session){
    curUser = session?.user;
   }else{
    curUser = user.data 
   }
  
  if (!curUser) {    
    return null; // or loading spinner
  }
  console.log("curUser: ",curUser)
  // console.log("tokenUser: ",tokenUser)

  const { username, image: imgURL } = curUser as {username:string, image:string};



  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // Close dropdown on outside clickimage
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsopen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // onResize close dropDown
  useEffect(() => {
    const handleResize = () => setIsopen(false);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const signOutEmailUser = async()=>{
    const responce = await axios.post("/api/users/logout")
    const responceData = responce.data;
    const {success} = responceData;
    if(success){
      redirect("/login")
    }
  }

  const signOutUser = () => {
    const { provider } = curUser;
    if (provider === "email") {
      signOutEmailUser();
      console.log(provider);
    } else {
      oauthSignOut();
      console.log(provider);
    }
    setIsopen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className="profileWrapper z-1 relative grid gap-2 justify-center p-4"
    >
      <div
        className="relative rounded-full w-10 h-10 bg-amber-300 mx-auto cursor-pointer"
        onClick={() => setIsopen(!isOpen)}
      >{imgURL?(

        <Image
          className="rounded-full"
          src={`${imgURL}`}
          fill // Image will fill the parent
          style={{ objectFit: "cover" }} // CSS styling
          alt="ketanLogo"
          sizes="(max-width: 200px) 100vw, 50vw" //
        />
      ):(
        <div className="flex items-stretch align-middle">
          <b className="px-3 py-2 text-gray-900 text-lg">{username.charAt(0)}</b>
        </div>
      )}
      </div>
      <h3 className="text-l">{username}</h3>
      {isOpen && (
        <div className="absolute mt-25 rounded-sm p-4 justify-cente space-y-4 bg-white dark:bg-dark-conBgColor dark:text-dark-fontColor">
          <div className="relative rounded-full w-16 h-16 bg-amber-300 mx-auto">
            {imgURL?(

        <Image
          className="rounded-full"
          src={`${imgURL}`}
          fill // Image will fill the parent
          style={{ objectFit: "cover" }} // CSS styling
          alt="ketanLogo"
          sizes="(max-width: 200px) 100vw, 50vw" //
        />
      ):(
        <div className="flex items-stretch align-middle">
          <b className="px-5 py-4 text-gray-900 text-2xl">{username.charAt(0)}</b>
        </div>
      )}
          </div>
          <h3>{username}</h3>
          <div
            className="border-t-2  border-t-neutral-900 py-3 cursor-pointer"
            onClick={signOutUser}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
