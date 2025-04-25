import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  User,
  LogIn,
  LogOut,
  Calendar,
  Users,
  Award,
  Activity,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: <Activity className="w-5 h-5" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Committee', path: '/committee', icon: <Award className="w-5 h-5" /> },
  ];

  const roleBasedItems = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Students', path: '/students', icon: <Users className="w-5 h-5" /> },
        { name: 'Faculty', path: '/faculty', icon: <Users className="w-5 h-5" /> },
        { name: 'Dashboard', path: '/dashboard', icon: <Activity className="w-5 h-5" /> }
      ];
    } else if (user?.role === 'faculty') {
      return [
        { name: 'Students', path: '/students', icon: <Users className="w-5 h-5" /> },
        { name: 'Dashboard', path: '/dashboard', icon: <Activity className="w-5 h-5" /> }
      ];
    } else if (user?.role === 'student') {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: <Activity className="w-5 h-5" /> }
      ];
    }
    return [];
  };

  const allMenuItems = [...menuItems, ...(user ? roleBasedItems() : [])];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">VU SAC</h1>
          </Link>

          {/* Mobile menu button */}
          <div className="block md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {allMenuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className="flex items-center gap-1"
                asChild
              >
                <Link to={item.path}>
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
            
            {user ? (
              <Button onClick={handleLogout} variant="outline" className="ml-2" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button asChild variant="default" className="ml-2" size="sm">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b shadow-lg animate-fade-in">
            <div className="container px-4 py-3">
              <nav className="flex flex-col gap-2">
                {allMenuItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    className="flex items-center justify-start gap-2"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      {item.name}
                    </Link>
                  </Button>
                ))}
                
                {user ? (
                  <Button onClick={handleLogout} variant="outline" className="mt-2">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button asChild variant="default" className="mt-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container px-4 py-6 mx-auto text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Vignan University Student Activity Council
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
