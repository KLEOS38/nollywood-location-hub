
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const HelpCenter = () => {
  return (
    <>
      <Helmet>
        <title>Help Center | Nollywood Locations</title>
        <meta name="description" content="Get help with using Nollywood Locations platform, booking properties, and managing your filmmaking needs." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
                <p className="text-lg text-muted-foreground mb-8">Find answers to common questions about using Nollywood Locations</p>
                
                <div className="relative max-w-2xl mx-auto">
                  <Input
                    type="text"
                    placeholder="Search for answers..."
                    className="pl-10 pr-4 py-6 h-14 bg-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="filmmakers" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="filmmakers">For Filmmakers</TabsTrigger>
                  <TabsTrigger value="hosts">For Property Owners</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>
                
                <TabsContent value="filmmakers" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card>
                      <CardHeader>
                        <CardTitle>Booking Locations</CardTitle>
                        <CardDescription>Help with finding and securing filming venues</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-nollywood-primary hover:underline">How to search for locations</a></li>
                          <li><a href="#" className="text-nollywood-primary hover:underline">Understanding location details</a></li>
                          <li><a href="#" className="text-nollywood-primary hover:underline">Booking and payment process</a></li>
                          <li><a href="#" className="text-nollywood-primary hover:underline">Cancellation policies</a></li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>During Your Shoot</CardTitle>
                        <CardDescription>Guidance for your filming day</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li><a href="#" className="text-nollywood-primary hover:underline">Check-in procedures</a></li>
                          <li><a href="#" className="text-nollywood-primary hover:underline">Property rules and guidelines</a></li>
                          <li><a href="#" className="text-nollywood-primary hover:underline">Handling issues during your shoot</a></li>
                          <li><a href="#" className="text-nollywood-primary hover:underline">Extensions and overtime</a></li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I book a location for filming?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Booking a location on Nollywood Locations is simple:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Search for locations using filters to find ones that match your needs.</li>
                          <li>Review the location details, amenities, rules, and availability.</li>
                          <li>Submit a booking request with your filming dates and details.</li>
                          <li>Wait for the host to approve your booking (usually within 24 hours).</li>
                          <li>Once approved, complete the payment to secure your booking.</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What if I need to cancel my booking?</AccordionTrigger>
                      <AccordionContent>
                        <p>Cancellation policies vary by location. Each property listing clearly displays its cancellation policy before you book. Generally, you can receive a full refund if you cancel within 48 hours of booking and at least 14 days before your scheduled shoot. Partial refunds may be available for cancellations made between 7-14 days before your booking. Cancellations made less than 7 days before your booking may not be eligible for refunds. Check the specific policy on your booking confirmation.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Do I need insurance to book a location?</AccordionTrigger>
                      <AccordionContent>
                        <p>Some locations require proof of production insurance before booking, while others do not. The insurance requirements are clearly stated on each listing. For high-value properties or commercial shoots, hosts typically require a Certificate of Insurance (COI) naming them as additional insured. If you don't have production insurance, we offer connections to affordable short-term insurance providers tailored for Nollywood productions.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Can I visit a location before booking?</AccordionTrigger>
                      <AccordionContent>
                        <p>Yes, many hosts offer location scouts for a small fee that is credited toward your booking if you choose to book the location. You can request a scout directly through the listing page by clicking the "Request Scout" button and proposing dates and times that work for you. The host will confirm if they can accommodate your scout request.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="hosts">
                  <h2 className="text-2xl font-bold mb-6">For Property Owners</h2>
                  <p className="mb-8">Information and guidance for hosting film productions at your property.</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I list my property on Nollywood Locations?</AccordionTrigger>
                      <AccordionContent>
                        <p>To list your property, simply click on "List Your Property" in the navigation menu and follow the step-by-step guide. You'll need to provide photos, a description, amenities, house rules, and set your availability and pricing. Our team will review your listing before it goes live to ensure it meets our quality standards.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How much should I charge for my location?</AccordionTrigger>
                      <AccordionContent>
                        <p>Pricing depends on factors like your property's size, uniqueness, amenities, and location. Urban properties in Lagos typically range from ₦50,000 to ₦200,000 per day for residential spaces and higher for commercial or luxury properties. Our pricing tool can provide recommendations based on similar properties in your area. You can adjust your pricing seasonally or for different types of productions.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How am I protected as a host?</AccordionTrigger>
                      <AccordionContent>
                        <p>Nollywood Locations provides several protections for hosts:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>Security deposits that cover minor damages</li>
                          <li>Production insurance requirements for larger shoots</li>
                          <li>Host Guarantee program that provides additional protection</li>
                          <li>Verified filmmaker profiles with reviews and ratings</li>
                          <li>Support team available to help resolve any issues</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>When and how do I get paid?</AccordionTrigger>
                      <AccordionContent>
                        <p>Payment is processed 24 hours after the filmmaker successfully checks in at your property. This gives both parties time to confirm that everything is in order. The funds are then transferred to your designated bank account, which typically takes 1-3 business days to appear depending on your bank. You can view all your transactions in your host dashboard.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="general">
                  <h2 className="text-2xl font-bold mb-6">General Help</h2>
                  <p className="mb-8">General information about using Nollywood Locations platform.</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I create and manage my account?</AccordionTrigger>
                      <AccordionContent>
                        <p>Creating an account is easy. Click "Sign Up" in the top navigation, enter your email and create a password. After verifying your email, complete your profile with your name, phone number, and profile picture. You can manage your account settings, including payment methods and notifications, from your profile page.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                      <AccordionContent>
                        <p>We accept various payment methods including credit/debit cards, bank transfers, and selected mobile payment platforms popular in Nigeria. All payments are processed securely through our payment partners with industry-standard encryption.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How does the review system work?</AccordionTrigger>
                      <AccordionContent>
                        <p>After a booking is completed, both filmmakers and hosts have 14 days to leave reviews for each other. Reviews include star ratings and written feedback about the experience. These reviews help build trust in our community and improve the quality of future interactions. Reviews cannot be edited once posted, but users can respond to reviews they've received.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                      <AccordionContent>
                        <p>You can reach our customer support team through several channels:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>Email: support@nollywoodlocations.com</li>
                          <li>Live chat: Available on our website during business hours (9am-6pm WAT)</li>
                          <li>Phone: +234 (0) 700-NOLLYWOOD (weekdays 8am-8pm WAT)</li>
                          <li>Emergency support is available 24/7 for urgent issues during active bookings</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">Our support team is ready to assist you with any questions or concerns.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                  Contact Support
                </Button>
                <Button variant="outline">
                  Send us a Message
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HelpCenter;
