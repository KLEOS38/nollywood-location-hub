
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, AlertTriangle, Check, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SafetyInfo = () => {
  return (
    <>
      <Helmet>
        <title>Safety Information | Nollywood Locations</title>
        <meta name="description" content="Learn about the safety measures and protocols in place for Nollywood Locations users and properties." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Safety First</h1>
                <p className="text-lg text-muted-foreground mb-6">Your safety is our top priority at Nollywood Locations</p>
                <div className="flex justify-center">
                  <Shield className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Tabs defaultValue="filmmakers" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="filmmakers">For Filmmakers</TabsTrigger>
                    <TabsTrigger value="hosts">For Property Owners</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="filmmakers" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Filmmaker Safety</h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
                          <p className="text-muted-foreground">All premium listings on our platform are physically verified by our team. We check that properties match their descriptions and photos, have basic safety equipment, and meet our quality standards.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                          <p className="text-muted-foreground">All payments are processed through our secure platform. Your payment is held until 24 hours after check-in, ensuring the location meets your expectations before the host receives payment.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Reviews You Can Trust</h3>
                          <p className="text-muted-foreground">Our review system only allows feedback from filmmakers who have actually booked and used the location, ensuring authentic insights about each property.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                          <p className="text-muted-foreground">Our dedicated support team is available around the clock for any emergencies during your shoot. We can assist with last-minute issues, communication with hosts, or unexpected problems.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-12">
                      <h3 className="text-xl font-semibold mb-4">Before Your Shoot: Safety Checklist</h3>
                      
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-nollywood-accent flex-shrink-0 mt-0.5" />
                            <span>Scout the location in advance when possible to identify any potential hazards</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-nollywood-accent flex-shrink-0 mt-0.5" />
                            <span>Check for emergency exits and ensure they are accessible during your shoot</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-nollywood-accent flex-shrink-0 mt-0.5" />
                            <span>Locate fire extinguishers and first aid kits before starting your production</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-nollywood-accent flex-shrink-0 mt-0.5" />
                            <span>Verify electrical outlets and capacity if you're bringing production equipment</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-nollywood-accent flex-shrink-0 mt-0.5" />
                            <span>Share location details and contact information with your production team</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-5 w-5 text-nollywood-accent flex-shrink-0 mt-0.5" />
                            <span>Ensure you have adequate insurance coverage for your production</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hosts" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Property Owner Safety</h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Verified Filmmakers</h3>
                          <p className="text-muted-foreground">All filmmakers on our platform undergo identity verification. We validate their profile information, contact details, and payment methods to ensure they are legitimate professionals.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Damage Protection</h3>
                          <p className="text-muted-foreground">Our Host Guarantee program provides protection for your property against accidental damage during shoots. Additionally, you can require security deposits and production insurance for added protection.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Screening Control</h3>
                          <p className="text-muted-foreground">You have full control over who can book your property. Review filmmaker profiles, past reviews, and production details before accepting any booking request.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-nollywood-primary/10 p-3 rounded-full">
                          <Check className="h-6 w-6 text-nollywood-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Clear House Rules</h3>
                          <p className="text-muted-foreground">Set detailed guidelines for the use of your property. These become part of the booking agreement that filmmakers must accept before their reservation is confirmed.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-12">
                      <h3 className="text-xl font-semibold mb-4">Host Safety Preparation</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Info className="h-5 w-5 mr-2 text-nollywood-secondary" />
                              Before the Shoot
                            </h4>
                            <ul className="space-y-2">
                              <li>Remove or secure valuable personal items</li>
                              <li>Document property condition with photos</li>
                              <li>Create detailed check-in instructions</li>
                              <li>Check that safety equipment is functional</li>
                              <li>Secure necessary permits if required</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Info className="h-5 w-5 mr-2 text-nollywood-secondary" />
                              During and After
                            </h4>
                            <ul className="space-y-2">
                              <li>Conduct thorough check-in and check-out inspections</li>
                              <li>Keep communication channels open</li>
                              <li>Document any issues immediately</li>
                              <li>Report problems to our support team</li>
                              <li>Leave honest, constructive reviews</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
          
          <section className="py-12 bg-nollywood-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Emergency Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Emergency Contacts</h3>
                    <ul className="space-y-2">
                      <li>Emergency Services: 112</li>
                      <li>Police: 199</li>
                      <li>Fire Service: 112</li>
                      <li>Ambulance: 112</li>
                      <li>Lagos Emergency: 767/112</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Medical Services</h3>
                    <ul className="space-y-2">
                      <li>Lagos University Teaching Hospital</li>
                      <li>Lagoon Hospital</li>
                      <li>Reddington Hospital</li>
                      <li>St. Nicholas Hospital</li>
                      <li>First Consultant Medical Centre</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Nollywood Locations Support</h3>
                    <ul className="space-y-2">
                      <li>24/7 Emergency: +234 (0) 800-NOLLYWOOD</li>
                      <li>Email: urgent@nollywoodlocations.com</li>
                      <li>In-app SOS Button</li>
                      <li>Live Chat Support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Safety Feedback</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">Help us improve our safety measures. If you have any suggestions or concerns regarding safety on our platform, please let us know.</p>
              <Button className="bg-white text-nollywood-dark hover:bg-white/90">
                Submit Safety Feedback
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SafetyInfo;
