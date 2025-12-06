
import { AuthProvider } from "@/lib/auth";
import Footer from '@/components/Footer'
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <AuthProvider>
        {children}
      </AuthProvider>
       
    </div>);

}