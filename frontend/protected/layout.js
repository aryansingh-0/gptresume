import { AuthProvider } from '../../lib/auth';
import AuthGuard from '../../components/AuthGuard';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '@/components/Footer';
import VerifyEmail from '@/components/alert/VerifyEmail';
export default function ProtectedLayout({ children }) {
  return (
    <AuthProvider>
       <div className="min-h-screen bg-background">
          <DashboardNavbar />
      <AuthGuard>
       
          <VerifyEmail/>
          <main className="max-w-7xl mx-auto py-6 px-4">
            
            {children}
          </main>
       
        
      </AuthGuard>
       </div>
    </AuthProvider>);

}