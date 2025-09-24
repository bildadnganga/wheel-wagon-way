-- Create cars table
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  condition TEXT NOT NULL DEFAULT 'used',
  description TEXT,
  image_url TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create parts table
CREATE TABLE public.parts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  condition TEXT NOT NULL DEFAULT 'used',
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url TEXT,
  compatibility TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cars
CREATE POLICY "Anyone can view available cars" 
ON public.cars 
FOR SELECT 
USING (status = 'available');

CREATE POLICY "Sellers can manage their own cars" 
ON public.cars 
FOR ALL 
USING (auth.uid() = seller_id);

-- RLS Policies for parts
CREATE POLICY "Anyone can view available parts" 
ON public.parts 
FOR SELECT 
USING (status = 'available');

CREATE POLICY "Sellers can manage their own parts" 
ON public.parts 
FOR ALL 
USING (auth.uid() = seller_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_parts_updated_at
  BEFORE UPDATE ON public.parts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();