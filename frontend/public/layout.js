// app/public/laout.js 
 
import Navbar from '../../components/Navbar';
import Footer from '@/components/Footer';
export default function ProtectedLayout({ children }) {
  return (    
        <div className="min-h-screen  ">
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 px-4">
            {children}
          </main>
        
        
       </div>
       );

}