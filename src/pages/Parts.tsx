import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, SlidersHorizontal } from "lucide-react";

// Import part images
import brakePads from "@/assets/brake-pads.jpg";
import airFilter from "@/assets/air-filter.jpg";

const Parts = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  // Mock data for spare parts
  const parts = [
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
    },
    {
      id: "p3",
      title: "Ceramic Brake Pads - Performance",
      price: 125,
      image: brakePads,
      type: "part" as const,
      brand: "Brembo",
      condition: "new" as const,
      location: "Atlanta, GA"
    },
    {
      id: "p4",
      title: "OEM Air Filter Replacement",
      price: 25,
      image: airFilter,
      type: "part" as const,
      brand: "Genuine Parts",
      condition: "new" as const,
      location: "Denver, CO"
    },
    {
      id: "p5",
      title: "Racing Brake Pads Set",
      price: 180,
      image: brakePads,
      type: "part" as const,
      brand: "StopTech",
      condition: "new" as const,
      location: "Las Vegas, NV"
    },
    {
      id: "p6",
      title: "Heavy-Duty Air Filter",
      price: 45,
      image: airFilter,
      type: "part" as const,
      brand: "Mann-Filter",
      condition: "used" as const,
      location: "Portland, OR"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80">
              <FilterSidebar type="parts" />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Spare Parts</h1>
                <p className="text-muted-foreground">
                  {parts.length} parts found
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <Select defaultValue="price-low">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Categories Quick Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Engine", "Brakes", "Suspension", "Electrical", "Body", "Interior"].map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {parts.map((part) => (
                <ProductCard
                  key={part.id}
                  {...part}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                Load More Parts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parts;