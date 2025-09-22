import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye, User } from "lucide-react";
import { useState } from "react";
import SellerProfile from "@/components/seller/SellerProfile";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  type: "car" | "part";
  brand?: string;
  year?: number;
  mileage?: number;
  condition?: "new" | "used" | "refurbished";
  location?: string;
  sellerId?: string;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  image, 
  type, 
  brand, 
  year, 
  mileage, 
  condition = "used",
  location,
  sellerId 
}: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage?: number) => {
    if (!mileage) return null;
    return new Intl.NumberFormat('en-US').format(mileage) + ' mi';
  };

  return (
    <Card className="group hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-card">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={isFavorited ? "destructive" : "secondary"}
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-white/90 hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          {sellerId && (
            <SellerProfile 
              sellerId={sellerId}
              trigger={
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <User className="h-4 w-4" />
                </Button>
              }
            />
          )}
        </div>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={condition === "new" ? "default" : condition === "refurbished" ? "secondary" : "outline"}
            className="bg-white/90 text-foreground"
          >
            {condition.toUpperCase()}
          </Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-primary/90 text-primary-foreground border-primary/20">
            {type === "car" ? "Vehicle" : "Part"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-1 text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-primary">
          {formatPrice(price)}
        </div>

        {/* Details */}
        <div className="space-y-2">
          {brand && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Brand:</span>
              <span>{brand}</span>
            </div>
          )}
          
          {year && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Year:</span>
              <span>{year}</span>
            </div>
          )}
          
          {mileage && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Mileage:</span>
              <span>{formatMileage(mileage)}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Location:</span>
              <span>{location}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="premium" 
          className="flex-1"
          onClick={() => console.log(`View details for ${id}`)}
        >
          Contact Seller
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => console.log(`Add ${id} to cart`)}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;