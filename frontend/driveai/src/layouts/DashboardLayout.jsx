import {useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import {userService} from "@/services/userService.js";
import {authService} from "@/services/authService.js";




export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [user,setUser] = useState(null);

  const loadUser = async () =>{
      try{
          const response = await userService.getCurrentUser();
          setUser(response);
      }catch (error){
          console.error(error);
      }
  }

    useEffect(() => {
        loadUser();
    }, []);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate("/login",{replace:true});
    };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 animate-slide-in-left">
            <div className="relative h-full">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute -right-12 top-4 p-2 rounded-xl bg-white dark:bg-slate-800 shadow-soft text-slate-600 dark:text-slate-300"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:pl-64 min-w-0 flex flex-col">
        <Topbar
          user={user}
          query={query}
          setQuery={setQuery}
          onToggleSidebar={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet context={{ query, user }} />
        </main>
      </div>
    </div>
  );
}
