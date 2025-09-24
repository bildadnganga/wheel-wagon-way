import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, Star, Car, Package } from "lucide-react";

interface SellerProfileProps {
  sellerId: string;
  trigger?: React.ReactNode;
}

interface SellerData {
  profile: any;
  cars: any[];
  parts: any[];
}

const SellerProfile = ({ sellerId, trigger }: SellerProfileProps) => {
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSellerData = async () => {
    setLoading(true);
    try {
      // Fetch seller profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', sellerId)
        .single();

      if (profileError) throw profileError;

      // Fetch seller's cars
      const { data: cars, error: carsError } = await supabase
        .from('cars')
        .select('*')
        .eq('seller_id', sellerId)
        .eq('is_active', true)
        .limit(5);

      if (carsError) throw carsError;

      // Fetch seller's parts
      const { data: parts, error: partsError } = await supabase
        .from('parts')
        .select('*')
        .eq('seller_id', sellerId)
        .eq('is_active', true)
        .limit(5);

      if (partsError) throw partsError;

      setSellerData({ profile, cars: cars || [], parts: parts || [] });
    } catch (error) {
      console.error('Error fetching seller data:', error);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" onClick={fetchSellerData}>
            View Seller Profile
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Seller Profile</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">Loading seller information...</div>
          </div>
        ) : sellerData ? (
          <div className="space-y-6">
            {/* Seller Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={sellerData.profile.avatar_url} />
                    <AvatarFallback>
                      {sellerData.profile.full_name?.charAt(0) || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      {sellerData.profile.full_name || 'Anonymous Seller'}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {sellerData.profile.bio || 'Professional car and parts dealer'}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      {sellerData.profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {sellerData.profile.location}
                        </div>
                      )}
                      {sellerData.profile.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {sellerData.profile.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {sellerData.profile.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-muted-foreground">(24 reviews)</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Seller's Cars */}
            {sellerData.cars.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Available Cars ({sellerData.cars.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sellerData.cars.map((car) => (
                      <div key={car.id} className="border rounded-lg p-4 space-y-2">
                        {car.image_url && (
                          <img
                            src={car.image_url}
                            alt={car.title}
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                        <h4 className="font-medium">{car.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {car.make} {car.model} • {car.year}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-success">
                            ${car.price.toLocaleString()}
                          </span>
                          <Badge variant="secondary">{car.fuel_type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Seller's Parts */}
            {sellerData.parts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Available Parts ({sellerData.parts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sellerData.parts.map((part) => (
                      <div key={part.id} className="border rounded-lg p-4 space-y-2">
                        {part.image_url && (
                          <img
                            src={part.image_url}
                            alt={part.title}
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                        <h4 className="font-medium">{part.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {part.category} • {part.condition}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-success">
                            ${part.price.toLocaleString()}
                          </span>
                          <Badge variant="outline">{part.condition}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {sellerData.cars.length === 0 && sellerData.parts.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    This seller currently has no active listings.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Unable to load seller information.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SellerProfile;