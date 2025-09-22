import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, SlidersHorizontal } from "lucide-react";

// Import car images
import carBmw from "@/assets/car-bmw.jpg";
import carToyota from "@/assets/car-toyota.jpg";

const Cars = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  // Mock data for cars
  const cars = [
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
    },
    {
      id: "3",
      title: "BMW X5 xDrive40i",
      price: 65000,
      image: carBmw,
      type: "car" as const,
      brand: "BMW",
      year: 2023,
      mileage: 12000,
      condition: "used" as const,
      location: "Chicago, IL"
    },
    {
      id: "4",
      title: "Toyota Camry XSE",
      price: 32000,
      image: carToyota,
      type: "car" as const,
      brand: "Toyota",
      year: 2024,
      mileage: 5000,
      condition: "new" as const,
      location: "Houston, TX"
    },
    {
      id: "5",
      title: "BMW 5 Series",
      price: 52000,
      image: carBmw,
      type: "car" as const,
      brand: "BMW",
      year: 2023,
      mileage: 10000,
      condition: "used" as const,
      location: "Miami, FL"
    },
    {
      id: "6",
      title: "Toyota Highlander",
      price: 42000,
      image: carToyota,
      type: "car" as const,
      brand: "Toyota",
      year: 2023,
      mileage: 18000,
      condition: "used" as const,
      location: "Seattle, WA"
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
              <FilterSidebar type="cars" />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Cars for Sale</h1>
                <p className="text-muted-foreground">
                  {cars.length} vehicles found
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
                    <SelectItem value="year-new">Year: Newest First</SelectItem>
                    <SelectItem value="year-old">Year: Oldest First</SelectItem>
                    <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
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

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {cars.map((car) => (
                <ProductCard
                  key={car.id}
                  {...car}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                Load More Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;