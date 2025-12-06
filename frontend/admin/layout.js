"use client" 
import Asidebar from "@/components/admin/Asidebar";
 
 import { ToastContainer, toast } from 'react-toastify';
  import { SessionProvider } from 'next-auth/react';
export default function RootLayout({ children }) {
  return (
    <div
       className=' bg-background flex px-1.5' 
      >
        
          <div className=""> 
          <Asidebar />
        </div>
        <ToastContainer />
        <SessionProvider>
        {children}
         </SessionProvider>
        
        
      </div>
  );
}
