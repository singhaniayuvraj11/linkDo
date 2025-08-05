"use client";

import React from 'react'
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();

  return (
    router.push("/") // Redirect to the generate page
  )
}

export default page
