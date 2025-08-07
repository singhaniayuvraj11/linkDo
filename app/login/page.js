"use client";

import React from 'react'
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();

  return (
    router.push("/") // Redirect to the generate page
  )
}

export default Page
