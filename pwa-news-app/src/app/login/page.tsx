"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Footer from "@/components/Footer";
import OAuthBtn from "@/components/OAuthBtn";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type OAuthBtnArrayProps = {
  name: string;
  faIcon: IconProp | any;
}[];

const OAuthBtnArray: OAuthBtnArrayProps = [
  { name: "github", faIcon: faGithub },
  { name: "google", faIcon: faGoogle },
  { name: "linkedin", faIcon: faLinkedin },
  { name: "facebook", faIcon: faFacebook },
];

const Login = () => {
  const { data: session, status } = useSession();

  const defaultFormData = {    
    email: "",
    password: "",
  };
  const [form, setForm] = useState(defaultFormData);

  const [btnFlag, setBtnFlag] = useState(true);
  const [message, setMessage] = useState({ message: "", success: false });

  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorBoxFlag, setErrorBoxFlag] = useState(false);

  const timerCount = useRef<any | null>(null);

  useEffect(() => {
    if (      
      form.email.length > 0 &&
      form.password.length > 0
    ) {
      setBtnFlag(false);
    } else {
      setBtnFlag(true);
    }
  }, [form]);

  useEffect(() => {
    if (!message.success && !errorBoxFlag) {
      setErrorBoxFlag(true);
      timerCount.current = setTimeout(() => {
        setErrorBoxFlag(false);
      }, 5000);
    }

    return () => {
      if (timerCount.current) {
        // Type guard
        clearTimeout(timerCount.current);
      }
    };
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoadingFlag(true);
      setBtnFlag(true);

      const responce = await axios.post("/api/users/login", form);

      setLoadingFlag(false);
      setBtnFlag(false);

      console.log("Data: ", responce.data);

      const { message, success } = responce.data;
      setMessage({ message: message, success: success });
      setForm(defaultFormData);      
    } catch (error: any) {
      console.log("Signup failed");
      console.log(error.message);
    }
  };

  if (status === "authenticated" || message.success) {
    redirect("/dashboard");
  }
  // console.log("session", session);
  return (
    <div className="grid place-items-center h-screen">
      <div className="lx:w-1/3 2xl:w-1/4 p-5 space-y-5 bg-white dark:bg-dark-conBgColor rounded-sm dark:text-dark-fontColor shadow-2xl">
        <h1 className="text-center font-bold text-3xl dark:text-secondaryColor">
          Login
        </h1>
        {message.message.length > 0 && errorBoxFlag ? (
              <div className="input text-center p-5 space-y-5">
                <h1 className="font-bold text-2x1">{message.message}</h1>
              </div>
            ) : null}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input"
            type="Password"
            name="Password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span className="text-right text-[14px]">Forgot password?</span>
          <div className="p-2 text-center">
            <button
                  className={
                    !btnFlag
                      ? "px-4 py-2 outline-0 bg-linkColor text-black rounded-sm cursor-pointer"
                      : "px-4 py-2 outline-0 bg-linkColor text-black rounded-sm"
                  }
                  disabled={btnFlag}
                >
              Login
            </button>
          </div>
        </form>
        <div className="p-2 text-center space-y-2">
          <Link className="text-[14px]" href={"/signup"}>
            Visit Signup Page
          </Link>
          <div className="flex justify-center">
            {OAuthBtnArray &&
              OAuthBtnArray.map((item, i) => {
                const { name, faIcon } = item;
                return (
                  <div
                    key={`icon_${i}`}
                    className="p-4 text-3xl cursor-pointer"
                  >
                    <OAuthBtn
                      name={name}
                      icon={faIcon}
                      reDerPath="/dashboard"
                    />
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

export default Login;
