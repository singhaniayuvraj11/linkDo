"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  const { user } = useUser();

  //  const createTree = () => {
  //   router.push(`/generate?handle=${user?.username}`);
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#e9c0e9]">
      <Link href="/">
          <button className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h15v-9.75"
              />
            </svg>
          </button>
        </Link>
      <h1 className="text-4xl font-bold mb-4 text-[#502274]">
        No LinkDo Found
      </h1>
      <p className="mb-6 text-lg text-purple-600">
        It looks like there&apos;s no <strong>LinkDo</strong> associated with this
        username.
      </p>
      <Link href={`/generate?handle=${user?.username}`}><div className="input flex gap-2 mt-10 ">
        <button
          className="bg-[#502274] font-bold text-white rounded-full h-16 py-5 flex items-center px-16 cursor-pointer hover:bg-[#624779]"
          // onClick={() => createTree()}
        >
          Get started for free
        </button>
      </div></Link>
    </div>
  );
}
