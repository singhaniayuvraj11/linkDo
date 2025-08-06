"use client";
import React from "react";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  
  const updateTree = () => {
    const link = `/edit?handle=${user?.username}`;
    router.push(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollY / pageHeight;

      // Show navbar if in the top 20% of the page
      if (scrollRatio >= 0 && scrollRatio <= 0.2) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` transition-transform duration-300 z-50 bg-white w-[90vw] mx-auto fixed top-10 right-[5vw] rounded-full p-4 flex justify-between ${
        show ? "translate-y-0" : "-translate-y-28 "
      }`}
    >
<div className="logo flex gap-20 items-center mx-4">
        <Link href="/">
          <div className="flex items-center justify-center gap-1">
            <span className="font font-extrabold text-3xl">LinkDo</span>
            <span>
              <img src="/logo.svg" alt="LinkDo Logo" className="w-10 h-10" />
            </span>
          </div>{" "}
        </Link>

        <ul className="flex gap-10 font-semibold text-gray-600">
          <SignedIn>
            <Link href={`/${user?.username || "login"}`}>
              <li>Your Page </li>
            </Link>
            <Link
              href={`/edit?handle=${user?.username}&frompage=edit&newusername=${user?.username}`}
            >
              <li>Edit</li>
            </Link>
          </SignedIn>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/contact">
            <li>Contact us</li>
          </Link>
        </ul>
      </div>

      <div className="flex gap-3">
        {/* <button className="login bg-gray-100 p-4 rounded-lg font-bold cursor-pointer hover:bg-gray-200">Log in</button>
        <button className="signup bg-gray-800 text-white p-4 rounded-full font-bold cursor-pointer hover:bg-gray-900">Sign up Free</button> */}
        <SignedOut>
          <SignInButton className="login bg-gray-100 p-4 rounded-lg font-bold cursor-pointer hover:bg-gray-200" />
          <SignUpButton>
            <button className="signup bg-gray-800 text-white p-4 rounded-full font-bold cursor-pointer hover:bg-gray-900">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
          {/* <SignedIn>
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded"
    onClick={() => handleUsernameUpdate(user?.username, user?.id)}
  >
    Sync Username
  </button>
</SignedIn> */}
        </SignedIn>
      </div>    </nav>
  );
};

export default Navbar;
