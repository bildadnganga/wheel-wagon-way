import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { X, Filter } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  type: "cars" | "parts";
  onFilterChange?: (filters: any) => void;
}

const FilterSidebar = ({ type, onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const carBrands = ["BMW", "Toyota", "Honda", "Ford", "Mercedes", "Audi", "Nissan", "Hyundai"];
  const partCategories = ["Engine", "Brakes", "Suspension", "Electrical", "Body", "Interior", "Exhaust", "Transmission"];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedBrands([]);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Clear
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>-</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        {/* Brand/Category Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {type === "cars" ? "Brands" : "Categories"}
          </Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {(type === "cars" ? carBrands : partCategories).map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedBrands.includes(item)}
                  onCheckedChange={() => handleBrandToggle(item)}
                />
                <Label htmlFor={item} className="text-sm cursor-pointer flex-1">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Car-specific filters */}
        {type === "cars" && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Year Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="yearFrom" className="text-xs text-muted-foreground">From</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="2000" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearTo" className="text-xs text-muted-foreground">To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="2024" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Body Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="convertible">Convertible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Transmission</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="cvt">CVT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Part-specific filters */}
        {type === "parts" && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Condition</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Conditions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="refurbished">Refurbished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Compatible Models</Label>
              <Input placeholder="e.g., BMW X5, Toyota Camry" />
            </div>
          </>
        )}

        <Separator />

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Location</Label>
          <Input placeholder="City or ZIP code" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="nationwide" />
              <Label htmlFor="nationwide" className="text-sm">
                Search nationwide
              </Label>
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button 
          variant="premium" 
          className="w-full"
          onClick={() => onFilterChange?.({ priceRange, selectedBrands })}
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;