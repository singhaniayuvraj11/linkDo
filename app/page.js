"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800"], // '800' corresponds to ExtraBold
  variable: "--font-poppins", // Create a CSS variable
});

export default function Home() {
  const { user } = useUser();
  const [text, setText] = useState("your-username");
  const [handle, setHandle] = useState((user && user?.username) || "");

  useEffect(() => {
    if (user?.username) {
      setText(user?.username);
    }
  }, [user]);

  // useEffect(() => {
  //   if (user?.username !== handle) {
  //     router.push(`/edit?handle=${handle}`);
  //     setHandle(user?.username);
  //   }
  // }, [user]);

  const router = useRouter();
  const createTree = () => {
    const link = `/generate?handle=${text}`;
    router.push(link);
  };
  

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#254f1a] h-[150vh] grid grid-cols-2">
          <div className="flex flex-col justify-center items-center ml-[5vw] gap-4 relative top-[0vh]">
            <p
              className={`text-[#d2e823] font-extrabold text-7xl ${poppins.variable}`}
            >
              Everything you are. In one, simple link in bio.
            </p>
            <p className="text-white text-xl font-bold ">
              Join 70M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </p>

            <div className="input flex gap-2 mt-10 relative right-[15vh]">
              <input
                type="text"
                className="bg-white rounded-lg h-16 p-3 w-70 font-bold text-gray-500 "
                value={text}
                placeholder="Your Handle"
                readOnly
              />
              <button
                onClick={() => createTree()}
                className="bg-[#e9c0e9] font-bold text-gray-800 rounded-full h-16 py-5 flex items-center px-8 cursor-pointer"
              >
                Claim your LinkDo
              </button>
            </div>
          </div>
          <div className="flex relative top-[30vh] justify-center">
            <img src="homePage.png" alt="homepage " className="h-[90vh]" />
          </div>
        </section>
        <section className="bg-[#e9c0e9] min-h-[100vh] grid grid-cols-2">
          <div className="flex justify-center items-center">
            <img src="homePage2.png" alt="homepage" />
          </div>
          <div className="flex flex-col justify-center items-center ml-[5vw] gap-4 relative top-[0vh]">
            <p
              className={`text-[#502274] font-extrabold text-7xl ${poppins.variable}`}
            >
              Create and customize your Linktree in minutes
            </p>
            <p className="text-black text-xl font-semibold ">
              Connect your TikTok, Instagram, Twitter, website, store, videos,
              music, podcast, events and more. It all comes together in a link
              in bio landing page designed to convert.
            </p>

            <div className="input flex gap-2 mt-10 relative right-[30vh]">
              <button
                className="bg-[#502274] font-bold text-white rounded-full h-16 py-5 flex items-center px-16 cursor-pointer hover:bg-[#624779]"
                onClick={() => createTree()}
              >
                Get started for free
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
