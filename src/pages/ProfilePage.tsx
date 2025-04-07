
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocationProps } from "@/components/LocationCard";
import LocationCard from "@/components/LocationCard";

// Profile schema
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProperties, setUserProperties] = useState<LocationProps[]>([]);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  
  // Get user data from localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate('/auth');
      return;
    }
    
    // Load user's profile image if exists
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    // Load user's properties if they are a homeowner
    if (user.userType === 'homeowner') {
      const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      const filteredProperties = allProperties.filter((prop: any) => prop.ownerId === user.email);
      setUserProperties(filteredProperties);
    }
    
    // Load user's bookings
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const filteredBookings = allBookings.filter((booking: any) => booking.userId === user.email);
    setUserBookings(filteredBookings);
  }, [navigate, user]);
  
  // Initialize profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
      address: user?.address || "",
      companyName: user?.companyName || "",
    },
  });
  
  // Initialize password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  // Update profile handler
  const onUpdateProfile = (values: ProfileFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user data in localStorage
      const updatedUser = { ...user, ...values };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsLoading(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };
  
  // Change password handler
  const onChangePassword = (values: PasswordFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully!");
    }, 1000);
  };
  
  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result as string;
          setProfileImage(imageUrl);
          localStorage.setItem('profileImage', imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully!");
    navigate('/');
  };
  
  // Handle delete account
  const handleDeleteAccount = () => {
    // In a real app, this would make an API call to delete the user
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    
    // Clean up user properties if they are a homeowner
    if (user.userType === 'homeowner') {
      const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      const filteredProperties = allProperties.filter((prop: any) => prop.ownerId !== user.email);
      localStorage.setItem('properties', JSON.stringify(filteredProperties));
    }
    
    // Clean up user bookings
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const filteredBookings = allBookings.filter((booking: any) => booking.userId !== user.email);
    localStorage.setItem('bookings', JSON.stringify(filteredBookings));
    
    toast.success("Account deleted successfully!");
    navigate('/');
  };
  
  // Generate initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user?.isLoggedIn) {
    return null; // Already redirecting in useEffect
  }

  return (
    <>
      <Helmet>
        <title>My Profile | Nollywood Locations</title>
        <meta name="description" content="Manage your Nollywood Locations profile, bookings, and property listings." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center mb-10">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={profileImage || undefined} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(user.name || user.email)}
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity"
                >
                  Change
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </div>
              <h1 className="text-2xl font-bold mt-4">{user.name || user.email}</h1>
              <p className="text-muted-foreground">
                {user.userType === 'homeowner' ? 'Property Owner' : 'Filmmaker/Location Renter'}
              </p>
            </div>
            
            <Tabs defaultValue="profile" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                {user.userType === 'homeowner' && (
                  <TabsTrigger value="properties">My Properties</TabsTrigger>
                )}
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and how we can reach you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="you@example.com" 
                                    {...field} 
                                    disabled 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Email cannot be changed
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about yourself..." 
                                  className="min-h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Share a bit about your background or experience
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+234..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {user.userType === 'homeowner' && (
                          <FormField
                            control={profileForm.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Company or business name" {...field} />
                                </FormControl>
                                <FormDescription>
                                  If you represent a company or property management agency
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {user.userType === 'homeowner' && (
                <TabsContent value="properties">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Properties</CardTitle>
                      <CardDescription>
                        Manage your listed properties or add new ones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <Button onClick={() => navigate('/list-property')}>
                          Add New Property
                        </Button>
                      </div>
                      
                      {userProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {userProperties.map((property) => (
                            <LocationCard key={property.id} {...property} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">
                            You haven't listed any properties yet
                          </p>
                          <Button onClick={() => navigate('/list-property')}>
                            List Your First Property
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                      Track and manage your location bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userBookings.length > 0 ? (
                      <div className="space-y-6">
                        {userBookings.map((booking, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{booking.locationTitle}</h3>
                                  <p className="text-muted-foreground">{booking.dates}</p>
                                  <p>Team size: {booking.teamSize} people</p>
                                  <p className="font-medium mt-2">Status: <span className="text-green-600">Confirmed</span></p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                  <p className="font-bold text-lg">₦{booking.totalPrice.toLocaleString()}</p>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-2"
                                    onClick={() => navigate(`/locations/${booking.locationId}`)}
                                  >
                                    View Location
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">
                          You don't have any bookings yet
                        </p>
                        <Button onClick={() => navigate('/locations')}>
                          Browse Locations
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-6">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Change Password"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Actions</CardTitle>
                      <CardDescription>
                        Manage your account data and sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Button variant="outline" onClick={handleLogout}>
                          Logout
                        </Button>
                      </div>
                      
                      <div>
                        <Button 
                          variant="destructive" 
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                              handleDeleteAccount();
                            }
                          }}
                        >
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;
