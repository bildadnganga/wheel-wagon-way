import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, ShoppingCart, Truck, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            
            {/* Dashboard Links */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link to="/dashboard/buyer">
                <Button variant="outline" size="sm">Buyer</Button>
              </Link>
              <Link to="/dashboard/seller">
                <Button variant="outline" size="sm">Seller</Button>
              </Link>
              <Link to="/dashboard/driver">
                <Button variant="outline" size="sm">Driver</Button>
              </Link>
              <Link to="/dashboard/admin">
                <Button variant="outline" size="sm">Admin</Button>
              </Link>
            </div>

            <Link to="/dashboard">
              <Button variant="premium" className="hidden sm:flex">
                <User className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

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
              <div className="border-t pt-2 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/dashboard/buyer">
                    <Button variant="outline" size="sm" className="w-full">Buyer</Button>
                  </Link>
                  <Link to="/dashboard/seller">
                    <Button variant="outline" size="sm" className="w-full">Seller</Button>
                  </Link>
                  <Link to="/dashboard/driver">
                    <Button variant="outline" size="sm" className="w-full">Driver</Button>
                  </Link>
                  <Link to="/dashboard/admin">
                    <Button variant="outline" size="sm" className="w-full">Admin</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;