import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Wrench, Truck, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import carBmw from "@/assets/car-bmw.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import brakePads from "@/assets/brake-pads.jpg";
import airFilter from "@/assets/air-filter.jpg";

const Index = () => {
  // Featured products
  const featuredCars = [
    {
      id: "1",
      title: "BMW 3 Series Sedan",
      price: 45000,
      image: carBmw,
      type: "car" as const,
      brand: "BMW",
      year: 2022,
      mileage: 15000,
      condition: "used" as const,
      location: "New York, NY"
    },
    {
      id: "2", 
      title: "Toyota RAV4 Hybrid",
      price: 38000,
      image: carToyota,
      type: "car" as const,
      brand: "Toyota",
      year: 2023,
      mileage: 8000,
      condition: "used" as const,
      location: "Los Angeles, CA"
    }
  ];

  const featuredParts = [
    {
      id: "p1",
      title: "Premium Brake Pads Set",
      price: 89,
      image: brakePads,
      type: "part" as const,
      brand: "Bosch",
      condition: "new" as const,
      location: "Detroit, MI"
    },
    {
      id: "p2",
      title: "High-Flow Air Filter",
      price: 35,
      image: airFilter,
      type: "part" as const,
      brand: "K&N",
      condition: "new" as const,
      location: "Phoenix, AZ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Cars Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Cars</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover premium vehicles from trusted sellers with complete history and verified conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredCars.map((car) => (
              <ProductCard key={car.id} {...car} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/cars">
              <Button variant="premium" size="lg">
                <Car className="h-5 w-5 mr-2" />
                View All Cars
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Parts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Spare Parts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Authentic spare parts from certified suppliers with warranty and compatibility guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredParts.map((part) => (
              <ProductCard key={part.id} {...part} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/parts">
              <Button variant="premium" size="lg">
                <Wrench className="h-5 w-5 mr-2" />
                Browse All Parts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-metallic">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose AutoHub?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete automotive marketplace with professional transport and tracking services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card">
              <CardHeader>
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Professional Transport</CardTitle>
                <CardDescription>
                  Secure vehicle transport with real-time tracking and insurance coverage.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center shadow-card">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Verified Sellers</CardTitle>
                <CardDescription>
                  All sellers are verified and rated by our community for your peace of mind.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center shadow-card">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  Round-the-clock customer support for all your automotive needs.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers buying and selling cars and parts on AutoHub.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard?role=buyer">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Start as Buyer
              </Button>
            </Link>
            <Link to="/dashboard?role=seller">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">AutoHub</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted automotive marketplace for cars and spare parts with professional transport services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <div className="space-y-2">
                <Link to="/cars" className="text-muted-foreground hover:text-primary block">Cars for Sale</Link>
                <Link to="/parts" className="text-muted-foreground hover:text-primary block">Spare Parts</Link>
                <Link to="/transport" className="text-muted-foreground hover:text-primary block">Transport Services</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <div className="space-y-2">
                <Link to="/dashboard?role=buyer" className="text-muted-foreground hover:text-primary block">Buyer Dashboard</Link>
                <Link to="/dashboard?role=seller" className="text-muted-foreground hover:text-primary block">Seller Dashboard</Link>
                <Link to="/dashboard?role=driver" className="text-muted-foreground hover:text-primary block">Driver Portal</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="text-muted-foreground hover:text-primary block">Help Center</a>
                <a href="#" className="text-muted-foreground hover:text-primary block">Contact Us</a>
                <a href="#" className="text-muted-foreground hover:text-primary block">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AutoHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
