"use client";

import {
  faFacebook,
  faGithub,
  faGoogle,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

import Footer from "@/components/Footer";
import OAuthBtn from "@/components/OAuthBtn";
import {IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type OAuthBtnArrayProps = {
  name: string;
  faIcon: IconProp| any;
}[];

const OAuthBtnArray: OAuthBtnArrayProps = [
  { name: "github", faIcon: faGithub  },
  { name: "google", faIcon: faGoogle },
  { name: "linkedin", faIcon: faLinkedin },
  { name: "facebook", faIcon:  faFacebook },
];

const page = () => {
  const {data: session, status} = useSession();
  if(status === "authenticated"){
    redirect("/dashboard")
  }
  console.log("session",session)
  return (
    <div className="grid place-items-center h-screen">
      <div className="lx:w-1/3 2xl:w-1/4 p-5 space-y-5 bg-white dark:bg-dark-conBgColor rounded-sm dark:text-dark-fontColor shadow-2xl">
        <h1 className="text-center font-bold text-3xl dark:text-secondaryColor">
          Login
        </h1>
        <form className="flex flex-col gap-2">
          <input
            className="input"
            type="text"
            name="userName"
            placeholder="User Name"
            disabled
          />
          <input
            className="input"
            type="passworld"
            name="passworld"
            placeholder="Passworld"
            disabled
          />
          <span className="text-right text-[14px]">Forgot password?</span>
          <div className="p-2 text-center">
            <button
              className="px-4 py-2 outline-0 bg-linkColor text-black rounded-sm"
              disabled
            >
              Login
            </button>
          </div>
        </form>
        <div className="p-2 text-center space-y-2">
          <h3 className="text-center text-sml text-[14px]">Or sign up using</h3>
          <div className="flex justify-center">
            {OAuthBtnArray &&
              OAuthBtnArray.map((item,i) => {
                const { name, faIcon } = item;
                return (
                  <div key={`icon_${i}`} className="p-4 text-3xl cursor-pointer">
                    <OAuthBtn name={name} icon={faIcon} reDerPath="/dashboard"/>
                  </div>
                );
              })}           
          </div>
        </div>
        <Footer className="text-center m-auto" />
      </div>
    </div>
  );
};

export default page;
