"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AllPost from '@/components/admin/AllPost'
import Asidebar from '@/components/admin/Asidebar'

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  
  if (status === "loading") return <p>Loading...</p>;
  return (
    <div> 
        <AllPost />
    </div>
  
  )
}

export default Page
