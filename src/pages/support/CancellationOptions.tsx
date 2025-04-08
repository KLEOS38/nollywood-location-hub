
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, AlertCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const CancellationOptions = () => {
  return (
    <>
      <Helmet>
        <title>Cancellation Options | Nollywood Locations</title>
        <meta name="description" content="Learn about cancellation policies and options for bookings on Nollywood Locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Cancellation Policies</h1>
                <p className="text-lg text-muted-foreground mb-6">Understanding how cancellations work on Nollywood Locations</p>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <p className="mb-8 text-lg">
                  We understand that plans can change. Our cancellation policies are designed to be fair to both filmmakers and property owners. Each location listing has a specified cancellation policy that you should review before booking.
                </p>
                
                <Tabs defaultValue="filmmaker" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="filmmaker">For Filmmakers</TabsTrigger>
                    <TabsTrigger value="host">For Property Owners</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="filmmaker">
                    <h2 className="text-2xl font-bold mb-6">Filmmaker Cancellation Policies</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-lg">
                            <Calendar className="h-5 w-5 mr-2 text-green-500" />
                            Flexible
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li><span className="font-medium">Full refund:</span> If cancelled at least 48 hours before booking start</li>
                            <li><span className="font-medium">50% refund:</span> If cancelled between 24-48 hours before start</li>
                            <li><span className="font-medium">No refund:</span> If cancelled less than 24 hours before start</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-lg">
                            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                            Moderate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li><span className="font-medium">Full refund:</span> If cancelled at least 5 days before booking start</li>
                            <li><span className="font-medium">50% refund:</span> If cancelled between 2-5 days before start</li>
                            <li><span className="font-medium">No refund:</span> If cancelled less than 2 days before start</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-l-amber-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-lg">
                            <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                            Strict
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li><span className="font-medium">Full refund:</span> If cancelled at least 14 days before booking start</li>
                            <li><span className="font-medium">50% refund:</span> If cancelled between 7-14 days before start</li>
                            <li><span className="font-medium">No refund:</span> If cancelled less than 7 days before start</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-lg mb-10">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-nollywood-primary" />
                        Important Notes for Filmmakers
                      </h3>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span>All times are calculated based on the property's local time zone</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span>Service fees are refundable only if the cancellation qualifies for a full refund</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span>If you cancel three or more bookings within a 6-month period, additional cancellation penalties may apply</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span>Extenuating circumstances may qualify for additional refund options (see below)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">How to Cancel a Booking</h3>
                    
                    <ol className="list-decimal pl-5 space-y-3 mb-8">
                      <li>Go to "Trips" in your account dashboard</li>
                      <li>Find the booking you wish to cancel</li>
                      <li>Click "Cancel Booking"</li>
                      <li>Select the reason for cancellation</li>
                      <li>Confirm your cancellation</li>
                      <li>Refund will be processed according to the location's cancellation policy</li>
                    </ol>
                    
                    <div className="border border-border rounded-lg p-6 mb-8">
                      <h3 className="text-xl font-semibold mb-4">Modifying Bookings</h3>
                      <p className="mb-4">Need to change your booking dates instead of cancelling? You can request date modifications directly through your booking:</p>
                      
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Date changes are subject to host approval and availability</li>
                        <li>Price adjustments may apply if different dates have different rates</li>
                        <li>Modification requests must be made at least 48 hours before your scheduled booking</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="host">
                    <h2 className="text-2xl font-bold mb-6">Property Owner Cancellation Policies</h2>
                    
                    <p className="mb-6">As a property owner, we expect you to honor all bookings that you accept. However, we understand that there are rare circumstances where you may need to cancel a reservation.</p>
                    
                    <div className="bg-muted/30 p-6 rounded-lg mb-8">
                      <h3 className="text-xl font-semibold mb-4">Host Cancellation Consequences</h3>
                      
                      <p className="mb-4">To maintain the reliability of our platform, host cancellations result in the following:</p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>A cancellation fee of ₦20,000 or 10% of the booking total (whichever is greater)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Automatic negative impact on your listing's search ranking for 30 days</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>A cancellation note added to your listing's public reviews section</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Multiple cancellations may result in temporary or permanent account restrictions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6 mb-8">
                      <h3 className="text-xl font-semibold mb-4">Setting Your Cancellation Policy</h3>
                      <p className="mb-4">You can select from three standard cancellation policies for your property:</p>
                      
                      <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li><span className="font-semibold">Flexible:</span> Best for locations with high availability and easier rebooking</li>
                        <li><span className="font-semibold">Moderate:</span> Balanced approach suitable for most properties</li>
                        <li><span className="font-semibold">Strict:</span> Recommended for premium or in-demand locations</li>
                      </ul>
                      
                      <p>You can set or change your cancellation policy in your property settings. Note that any existing confirmed bookings will maintain their original cancellation terms.</p>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Unavoidable Cancellations</h3>
                    
                    <p className="mb-4">If you absolutely must cancel a booking, here's how to minimize the impact:</p>
                    
                    <ol className="list-decimal pl-5 space-y-3 mb-8">
                      <li>Contact the filmmaker as soon as possible</li>
                      <li>Explain the situation honestly</li>
                      <li>Offer to help find alternative locations if possible</li>
                      <li>Formally cancel the booking through your host dashboard</li>
                      <li>Respond promptly to any follow-up communications</li>
                    </ol>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Extenuating Circumstances Policy</h2>
                  
                  <p className="mb-6">Our Extenuating Circumstances Policy covers situations outside of your control that prevent you from completing a reservation.</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Qualifying Circumstances</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Government-declared emergencies and epidemics</li>
                          <li>Natural disasters (earthquakes, floods, etc.)</li>
                          <li>Severe property damage that makes the location unusable</li>
                          <li>Serious illness, injury, or death (yourself or immediate family)</li>
                          <li>Severe transportation disruptions (airline cancellations, roadblocks)</li>
                          <li>Military duty and civil unrest</li>
                          <li>Loss of necessary utilities at the location (water, electricity)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Required Documentation</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">To qualify for the Extenuating Circumstances Policy, you must provide documentation within 14 days of cancellation that clearly shows:</p>
                        
                        <ul className="list-disc pl-5 space-y-2">
                          <li>The specific issue that prevented the completion of the booking</li>
                          <li>The date when the circumstance began or occurred</li>
                          <li>Official documentation (medical records, government notices, etc.)</li>
                          <li>For illness/injury: a signed letter from a medical professional</li>
                          <li>For transportation issues: cancellation notices or delay verifications</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How to Submit a Claim</AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Cancel your reservation through your account</li>
                          <li>Select "Extenuating Circumstances" as the reason</li>
                          <li>Fill out the provided form with details about your situation</li>
                          <li>Upload supporting documentation</li>
                          <li>Submit your claim for review</li>
                          <li>Our team will evaluate your claim within 48-72 hours</li>
                          <li>You'll be notified by email of the decision</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Non-Qualifying Circumstances</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">The following situations generally do not qualify for the Extenuating Circumstances Policy:</p>
                        
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Weather conditions that are normal for the season</li>
                          <li>Traffic delays or minor transportation disruptions</li>
                          <li>Personal or business scheduling conflicts</li>
                          <li>Changes in production plans or budgets</li>
                          <li>Mild illness or pre-existing medical conditions</li>
                          <li>Non-emergency family situations</li>
                          <li>Change of mind or filmmaker preferences</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help With a Cancellation?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">Our support team is available to assist you with any questions or special circumstances.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                  Contact Support
                </Button>
                <Button variant="outline">
                  Review FAQs
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

export default CancellationOptions;
