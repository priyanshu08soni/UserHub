import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, HomeIcon, Menu } from 'lucide-react';
import img from "../assets/logo.png";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <img src={img} alt="logo" width={30} />
          UserHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {isAuthenticated && (
                <NavigationMenuItem>
                  <Link to="/users">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <User className="h-4 w-4 mr-2" />
                      Users
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" /> Home
                </Link>
              </DropdownMenuItem>
              {isAuthenticated && (
                <DropdownMenuItem asChild>
                  <Link to="/users" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Users
                  </Link>
                </DropdownMenuItem>
              )}
              {isAuthenticated ? (
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              ) : (
                location.pathname !== '/login' && (
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      Login
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          ) : (
            location.pathname !== '/login' && (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;