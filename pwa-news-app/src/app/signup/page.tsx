"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";

const Signup = () => {
  const defaultFormData = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [form, setForm] = useState(defaultFormData);

  const [btnFlag, setBtnFlag] = useState(true);
  const [message, setMessage] = useState({ message: "", success: false });

  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorBoxFlag, setErrorBoxFlag] = useState(false);

  const timerCount = useRef<any | null>(null);

  useEffect(() => {
    if (
      form.username.length > 0 &&
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.password === form.confirm_password
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

    //filter data for API OR Removed confirm_password prop from object
    const { confirm_password, ...apiData } = form;

    try {
      setLoadingFlag(true);
      setBtnFlag(true);

      const responce = await axios.post("/api/users/signup", apiData);

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

  return (
    <div className="grid place-items-center h-screen">
      <div className="lx:w-1/3 2xl:w-1/4 p-5 space-y-5 bg-white dark:bg-dark-conBgColor rounded-sm dark:text-dark-fontColor shadow-2xl">
        <h1 className="text-center font-bold text-3xl dark:text-secondaryColor">
          Sign Up
        </h1>
        {!message.success ? (
          <>
            {message.message.length > 0 && errorBoxFlag ? (
              <div className="input text-center p-5 space-y-5">
                <h1 className="font-bold text-2x1">{message.message}</h1>
              </div>
            ) : null}
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                name="userName"
                placeholder="User Name"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
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
              <input
                className="input"
                type="Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirm_password}
                onChange={(e) =>
                  setForm({ ...form, confirm_password: e.target.value })
                }
              />
              <div className="p-2 text-center">
                <button
                  className={
                    !btnFlag
                      ? "px-4 py-2 outline-0 bg-linkColor text-black rounded-sm cursor-pointer"
                      : "px-4 py-2 outline-0 bg-linkColor text-black rounded-sm"
                  }
                  disabled={btnFlag}
                >
                  Signup
                </button>
              </div>
            </form>
            <div className="p-2 text-center space-y-2">
              <Link className="text-[14px]" href={"/login"}>
                Visit Login Page
              </Link>
            </div>
          </>
        ) : (
          <div className="input text-center p-5 space-y-5">
            <h1 className="font-bold text-2x1">{message.message}</h1>
            <p className="font-medium text-borderColor">
              Please check your email and verify your account
            </p>
          </div>
        )}
        <Footer className="text-center m-auto" />
      </div>
    </div>
  );
};

export default Signup;
