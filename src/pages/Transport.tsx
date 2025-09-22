import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  Phone,
  MessageSquare
} from "lucide-react";

const Transport = () => {
  const [trackingId, setTrackingId] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  // Mock tracking data
  const trackingData = {
    id: "TRK-00123",
    status: "in_transit",
    item: "BMW 3 Series Sedan",
    from: "New York, NY",
    to: "Boston, MA", 
    driver: {
      name: "Carlos Rodriguez",
      phone: "+1 (555) 123-4567",
      rating: 4.9,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    timeline: [
      { status: "picked_up", time: "2024-01-15 09:00", completed: true, description: "Vehicle picked up from seller" },
      { status: "in_transit", time: "2024-01-15 10:30", completed: true, description: "En route to destination" },
      { status: "arriving", time: "2024-01-15 14:00", completed: false, description: "Arriving at destination" },
      { status: "delivered", time: "2024-01-15 15:00", completed: false, description: "Delivered to buyer" }
    ],
    estimatedArrival: "Today, 3:00 PM",
    progress: 65
  };

  const handleTrack = () => {
    if (trackingId) {
      setShowTracking(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Professional Vehicle Transport
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure, insured vehicle transport with real-time tracking and professional drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Transport Services */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Request Transport
              </CardTitle>
              <CardDescription>
                Get a quote for professional vehicle transport services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input id="pickup" placeholder="City, State" />
                </div>
                <div>
                  <Label htmlFor="delivery">Delivery Location</Label>
                  <Input id="delivery" placeholder="City, State" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="vehicle">Vehicle Details</Label>
                <Input id="vehicle" placeholder="Make, Model, Year" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup-date">Pickup Date</Label>
                  <Input id="pickup-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="transport-type">Transport Type</Label>
                  <select className="w-full p-2 border rounded-md bg-background">
                    <option>Open Transport</option>
                    <option>Enclosed Transport</option>
                    <option>Expedited Service</option>
                  </select>
                </div>
              </div>
              
              <Button variant="premium" className="w-full">
                Get Quote
              </Button>
            </CardContent>
          </Card>

          {/* Live Tracking */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Track Your Delivery
              </CardTitle>
              <CardDescription>
                Enter your tracking ID to see real-time delivery status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tracking">Tracking ID</Label>
                <Input 
                  id="tracking"
                  placeholder="Enter tracking ID (e.g., TRK-00123)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleTrack}
              >
                Track Delivery
              </Button>

              {/* Demo Button */}
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => {
                  setTrackingId("TRK-00123");
                  setShowTracking(true);
                }}
              >
                View Demo Tracking
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Results */}
        {showTracking && (
          <Card className="shadow-premium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Tracking: {trackingData.id}
                </CardTitle>
                <Badge variant={
                  trackingData.status === 'delivered' ? 'default' :
                  trackingData.status === 'in_transit' ? 'secondary' : 'outline'
                }>
                  {trackingData.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <CardDescription>
                {trackingData.item} • {trackingData.from} → {trackingData.to}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Delivery Progress</span>
                  <span>{trackingData.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${trackingData.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated arrival: {trackingData.estimatedArrival}
                </p>
              </div>

              <Separator />

              {/* Driver Information */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{trackingData.driver.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Professional Driver • {trackingData.driver.rating}⭐
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold">Delivery Timeline</h4>
                <div className="space-y-4">
                  {trackingData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                        event.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {event.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className={`font-medium ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {event.description}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Location */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">Current Location</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I-95 North, approximately 45 miles from destination
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="text-center shadow-card">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <CardTitle>Fully Insured</CardTitle>
              <CardDescription>
                Complete insurance coverage for your vehicle during transport
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <Navigation className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Real-time Tracking</CardTitle>
              <CardDescription>
                Monitor your vehicle's location and delivery status 24/7
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <Truck className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Professional Drivers</CardTitle>
              <CardDescription>
                Experienced, licensed drivers with excellent safety records
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Transport;