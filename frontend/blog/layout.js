
 
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar';
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <Navbar/>
        {children}
        
    </div>);

}