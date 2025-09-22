import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  ShoppingCart, 
  Truck, 
  Settings, 
  BarChart3, 
  Package,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Car,
  Wrench
} from "lucide-react";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const { user, userRole, userProfile } = useAuth();
  const role = searchParams.get('role') || userRole || 'buyer';

  // Mock data for different user roles
  const userData = {
    buyer: {
      name: "John Smith",
      stats: {
        orders: 12,
        favorites: 8,
        saved: 156,
        spent: 45000
      },
      recentOrders: [
        { id: "ORD-001", item: "BMW 3 Series", status: "delivered", amount: 45000 },
        { id: "ORD-002", item: "Brake Pads Set", status: "in_transit", amount: 89 },
        { id: "ORD-003", item: "Air Filter", status: "processing", amount: 35 },
      ]
    },
    seller: {
      name: "Mike Johnson",
      stats: {
        listings: 24,
        sold: 18,
        revenue: 125000,
        rating: 4.8
      },
      recentSales: [
        { id: "SAL-001", item: "Toyota RAV4", buyer: "Sarah Wilson", amount: 38000 },
        { id: "SAL-002", item: "Brake Pads", buyer: "Tom Brown", amount: 89 },
        { id: "SAL-003", item: "Engine Oil", buyer: "Lisa Davis", amount: 25 },
      ]
    },
    driver: {
      name: "Carlos Rodriguez", 
      stats: {
        deliveries: 156,
        distance: 12450,
        rating: 4.9,
        earnings: 8900
      },
      activeDeliveries: [
        { id: "DEL-001", from: "Detroit, MI", to: "Chicago, IL", item: "BMW X5", status: "in_transit" },
        { id: "DEL-002", from: "New York, NY", to: "Boston, MA", item: "Spare Parts", status: "pickup" },
      ]
    },
    admin: {
      name: "Admin User",
      stats: {
        users: 1250,
        listings: 890,
        revenue: 450000,
        growth: 15.2
      },
      metrics: [
        { label: "Total Sales", value: "$450K", change: "+15.2%" },
        { label: "Active Users", value: "1,250", change: "+8.1%" },
        { label: "New Listings", value: "890", change: "+12.3%" },
        { label: "Deliveries", value: "245", change: "+5.7%" },
      ]
    }
  };

  const currentUser = userData[role as keyof typeof userData];

  const renderBuyerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.buyer.stats.orders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.buyer.stats.favorites}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.buyer.stats.saved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${userData.buyer.stats.spent.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Track your recent purchases and deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.buyer.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{order.item}</p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={
                    order.status === 'delivered' ? 'default' : 
                    order.status === 'in_transit' ? 'secondary' : 'outline'
                  }>
                    {order.status.replace('_', ' ')}
                  </Badge>
                  <span className="font-bold">${order.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSellerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.seller.stats.listings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.seller.stats.sold}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${userData.seller.stats.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.seller.stats.rating}/5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Your latest transactions and customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.seller.recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{sale.item}</p>
                  <p className="text-sm text-muted-foreground">Sold to {sale.buyer}</p>
                </div>
                <span className="font-bold text-success">${sale.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDriverDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.driver.stats.deliveries}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Miles Driven</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.driver.stats.distance.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.driver.stats.rating}/5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${userData.driver.stats.earnings.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
          <CardDescription>Current delivery assignments and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.driver.activeDeliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{delivery.item}</p>
                  <p className="text-sm text-muted-foreground">
                    {delivery.from} → {delivery.to}
                  </p>
                </div>
                <Badge variant={delivery.status === 'in_transit' ? 'default' : 'secondary'}>
                  {delivery.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userData.admin.metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-success">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Key metrics and system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Users</span>
                <span className="text-2xl font-bold">{userData.admin.stats.users.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Listings</span>
                <span className="text-2xl font-bold">{userData.admin.stats.listings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Monthly Revenue</span>
                <span className="text-2xl font-bold">${userData.admin.stats.revenue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Administrative tools and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Car className="h-4 w-4 mr-2" />
              Review Listings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Truck className="h-4 w-4 mr-2" />
              Track Deliveries
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (role) {
      case 'seller':
        return renderSellerDashboard();
      case 'driver':
        return renderDriverDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderBuyerDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {userProfile?.full_name || user?.email || currentUser.name}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="premium">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>

          {/* Role Selector */}
          <Tabs value={role} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="buyer" asChild>
                <a href="/dashboard?role=buyer">Buyer</a>
              </TabsTrigger>
              <TabsTrigger value="seller" asChild>
                <a href="/dashboard?role=seller">Seller</a>
              </TabsTrigger>
              <TabsTrigger value="driver" asChild>
                <a href="/dashboard?role=driver">Driver</a>
              </TabsTrigger>
              <TabsTrigger value="admin" asChild>
                <a href="/dashboard?role=admin">Admin</a>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Dashboard Content */}
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;