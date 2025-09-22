import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium luxury car" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect 
            <span className="block text-accent">Car & Parts</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Discover premium vehicles and authentic spare parts from trusted sellers. 
            Complete with delivery tracking and professional transport services.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/cars">
              <Button size="lg" variant="premium" className="w-full sm:w-auto text-lg px-8 py-6">
                <Search className="h-5 w-5 mr-2" />
                Browse Cars
              </Button>
            </Link>
            
            <Link to="/parts">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Find Parts
              </Button>
            </Link>
            
            <Link to="/transport">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
                <Truck className="h-5 w-5 mr-2" />
                Transport
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-white/80">Cars Available</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-white/80">Spare Parts</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-white/80">Delivery Tracking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;