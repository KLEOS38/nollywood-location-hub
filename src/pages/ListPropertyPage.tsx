import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import MediaUploader from "@/components/media/MediaUploader";
import { locationTypes, neighborhoodOptions, amenitiesList } from "@/data/propertyConstants";

// Define form schema with zod
const propertySchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters" }),
  type: z.string({ required_error: "Please select a property type" }),
  neighborhood: z.string({ required_error: "Please select a neighborhood" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  description: z.string().min(30, { message: "Description must be at least 30 characters" }),
  price: z.coerce.number().min(1000, { message: "Price must be at least 1,000 Naira" }),
  amenities: z.array(z.string()).min(1, { message: "Please select at least one amenity" }),
  rules: z.string().optional(),
  availability: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const ListPropertyPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedMediaUrls, setUploadedMediaUrls] = useState<string[]>([]);
  
  // Initialize form with react-hook-form and zod
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
      price: undefined,
      amenities: [],
      rules: "",
      availability: "",
    },
  });
  
  // Check if user is logged in
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  if (!user?.isLoggedIn) {
    // Redirect to login if not logged in
    React.useEffect(() => {
      navigate('/auth?listing=true');
    }, [navigate]);
    return null;
  }

  const handleMediaUpload = (urls: string[]) => {
    setUploadedMediaUrls(urls);
    toast.success(`${urls.length} files uploaded successfully!`);
  };

  const onSubmit = (values: PropertyFormValues) => {
    if (uploadedMediaUrls.length === 0) {
      toast.error("Please upload at least one image or video of your property");
      return;
    }

    setIsLoading(true);
    
    // In a real app, you would save this to Supabase
    setTimeout(() => {
      // Generate an ID for the new property
      const newPropertyId = Date.now().toString();
      
      // Store the form data in localStorage (in a real app, this would go to a database)
      const properties = JSON.parse(localStorage.getItem('properties') || '[]');
      
      const newProperty = {
        id: newPropertyId,
        title: values.title,
        type: values.type,
        neighborhood: values.neighborhood,
        address: values.address,
        description: values.description,
        price: values.price,
        amenities: values.amenities,
        rating: 0,
        reviewCount: 0,
        imageUrl: uploadedMediaUrls[0],
        images: uploadedMediaUrls,
        mediaUrls: uploadedMediaUrls,
        rules: values.rules,
        availability: values.availability,
        ownerId: user.email,
        isVerified: false,
        createdAt: new Date().toISOString(),
      };
      
      properties.push(newProperty);
      localStorage.setItem('properties', JSON.stringify(properties));
      
      setIsLoading(false);
      toast.success("Property listed successfully!");
      navigate(`/locations/${newPropertyId}`);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>List Your Property | Nollywood Locations</title>
        <meta name="description" content="List your property on Nollywood Locations and earn by renting it out for film productions in Lagos." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
            <p className="text-muted-foreground mb-8">
              Share your space with the Nollywood community and earn money by hosting film productions
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Luxury Waterfront Villa in Lekki" {...field} />
                        </FormControl>
                        <FormDescription>
                          Create a catchy title that describes your property
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locationTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Neighborhood</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select neighborhood" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {neighborhoodOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Full address of your property" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will only be shared with confirmed bookings
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your property in detail..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include unique features, spaces available, and why it would be good for filming
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Pricing */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Pricing</h2>
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Rate (NGN)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="E.g., 150000" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Set your price per day in Nigerian Naira
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Amenities */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Amenities</h2>
                  
                  <FormField
                    control={form.control}
                    name="amenities"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>What amenities does your property offer?</FormLabel>
                          <FormDescription>
                            Select all that apply
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {amenitiesList.map((amenity) => (
                            <FormField
                              key={amenity.id}
                              control={form.control}
                              name="amenities"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={amenity.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(amenity.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, amenity.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== amenity.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {amenity.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Media Upload Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Property Media</h2>
                  <MediaUploader 
                    onUploadComplete={handleMediaUpload}
                    maxFiles={10}
                    acceptedTypes={['image/*', 'video/*']}
                    bucket="property-media"
                  />
                </div>
                
                {/* Additional Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Additional Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="rules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Rules</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific rules film crews need to follow..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include rules like noise restrictions, parking guidelines, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Let people know when your property is available..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include any dates when the property is not available
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Submit section */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4">
                      <p className="text-sm text-muted-foreground">
                        By listing your property, you agree to our Terms of Service and Privacy Policy.
                        All properties are subject to verification before being fully listed.
                      </p>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "List Your Property"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ListPropertyPage;
