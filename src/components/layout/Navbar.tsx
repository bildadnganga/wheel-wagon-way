import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User, LogOut, ShoppingCart, Truck, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">AutoHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cars" className="text-foreground hover:text-primary transition-smooth">
              Cars
            </Link>
            <Link to="/parts" className="text-foreground hover:text-primary transition-smooth">
              Spare Parts
            </Link>
            <Link to="/transport" className="text-foreground hover:text-primary transition-smooth flex items-center gap-1">
              <Truck className="h-4 w-4" />
              Transport
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {/* Authentication */}
            {user ? (
              <div className="flex items-center space-x-2">
                {/* Dashboard Links for authenticated users */}
                <div className="hidden lg:flex items-center space-x-2">
                  <Link to="/dashboard?role=buyer">
                    <Button variant="outline" size="sm">Buyer</Button>
                  </Link>
                  <Link to="/dashboard?role=seller">
                    <Button variant="outline" size="sm">Seller</Button>
                  </Link>
                  <Link to="/dashboard?role=driver">
                    <Button variant="outline" size="sm">Driver</Button>
                  </Link>
                  <Link to="/dashboard?role=admin">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                </div>

                <Link to="/dashboard">
                  <Button variant="premium" className="hidden sm:flex">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar_url} />
                        <AvatarFallback>
                          {userProfile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">
                        {userProfile?.full_name || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button asChild variant="premium">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background py-4">
            <div className="space-y-2">
              <Link to="/cars" className="block px-2 py-2 text-foreground hover:text-primary transition-smooth">
                Cars
              </Link>
              <Link to="/parts" className="block px-2 py-2 text-foreground hover:text-primary transition-smooth">
                Spare Parts
              </Link>
              <Link to="/transport" className="block px-2 py-2 text-foreground hover:text-primary transition-smooth">
                Transport
              </Link>
              
              {user ? (
                <>
                  <div className="border-t pt-2 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link to="/dashboard?role=buyer">
                        <Button variant="outline" size="sm" className="w-full">Buyer</Button>
                      </Link>
                      <Link to="/dashboard?role=seller">
                        <Button variant="outline" size="sm" className="w-full">Seller</Button>
                      </Link>
                      <Link to="/dashboard?role=driver">
                        <Button variant="outline" size="sm" className="w-full">Driver</Button>
                      </Link>
                      <Link to="/dashboard?role=admin">
                        <Button variant="outline" size="sm" className="w-full">Admin</Button>
                      </Link>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="border-t pt-2 mt-2">
                  <Link to="/auth">
                    <Button variant="premium" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;