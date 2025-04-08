
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, ShieldCheck, Thermometer, Spray, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const CovidGuidelines = () => {
  return (
    <>
      <Helmet>
        <title>COVID-19 Guidelines | Nollywood Locations</title>
        <meta name="description" content="Learn about our COVID-19 safety protocols and guidelines for filming locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">COVID-19 Safety Guidelines</h1>
                <p className="text-lg text-muted-foreground mb-6">Health and safety protocols for Nollywood productions</p>
                <div className="flex justify-center">
                  <ShieldCheck className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        While COVID-19 restrictions have eased in most areas, we continue to prioritize safety. These guidelines are regularly updated to align with current health recommendations and local regulations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="mb-8 text-lg">
                  At Nollywood Locations, we're committed to providing a safe environment for all filmmakers and property owners. These guidelines help ensure productions can continue while minimizing health risks.
                </p>
                
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="general">General Guidelines</TabsTrigger>
                    <TabsTrigger value="filmmakers">For Filmmakers</TabsTrigger>
                    <TabsTrigger value="hosts">For Property Owners</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">General Guidelines</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center mb-4">
                            <div className="bg-nollywood-primary/10 p-3 rounded-full inline-flex mb-2">
                              <Thermometer className="h-6 w-6 text-nollywood-primary" />
                            </div>
                            <h3 className="font-semibold">Health Screening</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li>Monitor symptoms before arriving at locations</li>
                            <li>Stay home if you feel unwell</li>
                            <li>Consider temperature checks for larger productions</li>
                            <li>Follow local health department guidelines</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center mb-4">
                            <div className="bg-nollywood-primary/10 p-3 rounded-full inline-flex mb-2">
                              <Spray className="h-6 w-6 text-nollywood-primary" />
                            </div>
                            <h3 className="font-semibold">Sanitation</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li>Regular handwashing and sanitizing</li>
                            <li>Clean high-touch surfaces frequently</li>
                            <li>Proper ventilation of indoor spaces</li>
                            <li>Sanitize equipment between users</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center mb-4">
                            <div className="bg-nollywood-primary/10 p-3 rounded-full inline-flex mb-2">
                              <Users className="h-6 w-6 text-nollywood-primary" />
                            </div>
                            <h3 className="font-semibold">Physical Distancing</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li>Maintain appropriate distance when possible</li>
                            <li>Reduce unnecessary physical contact</li>
                            <li>Consider masks in crowded indoor settings</li>
                            <li>Respect personal space preferences</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-lg mb-8">
                      <h3 className="text-xl font-semibold mb-4">Current Status in Nigeria</h3>
                      
                      <p className="mb-4">While formal COVID-19 restrictions have largely been lifted across Nigeria, we recommend staying informed about the current situation and following these best practices:</p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                          <span>Follow Nigeria CDC guidelines for current recommendations</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                          <span>Respect individual comfort levels regarding masks and distancing</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                          <span>Stay updated on any location-specific requirements</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                          <span>Consider health protocols for international cast/crew members</span>
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Vaccination Information</h3>
                    
                    <p className="mb-4">
                      While vaccination is not required to use Nollywood Locations, we encourage all users to follow health guidelines and make informed decisions regarding their health and safety.
                    </p>
                    
                    <p className="mb-8">
                      For the latest information on COVID-19 vaccines in Nigeria, please visit the <a href="https://www.health.gov.ng/" target="_blank" rel="noopener noreferrer" className="text-nollywood-primary hover:underline">Federal Ministry of Health website</a> or the <a href="https://ncdc.gov.ng/" target="_blank" rel="noopener noreferrer" className="text-nollywood-primary hover:underline">Nigeria Centre for Disease Control</a>.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="filmmakers" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Guidelines for Filmmakers</h2>
                    
                    <div className="space-y-8 mb-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Pre-Production Planning</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Develop a COVID-19 safety plan for your production</li>
                          <li>Consider assigning a health and safety coordinator for larger productions</li>
                          <li>Plan for proper distancing on set</li>
                          <li>Budget for sanitation supplies and PPE if needed</li>
                          <li>Have contingency plans for potential illness</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Crew and Cast Management</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Keep crew sizes reasonable for the filming location</li>
                          <li>Consider staggered call times to reduce crowding</li>
                          <li>Maintain records of who was present each day</li>
                          <li>Encourage reporting of any symptoms post-filming</li>
                          <li>Respect individual health concerns and accommodations</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">On-Set Protocols</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Provide hand sanitizer and handwashing stations</li>
                          <li>Clean equipment and high-touch surfaces regularly</li>
                          <li>Consider masks for indoor filming with large crews</li>
                          <li>Ensure proper ventilation in indoor settings</li>
                          <li>Provide individually wrapped meals and drinks when possible</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Location Respect</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Follow any specific health guidelines requested by the property owner</li>
                          <li>Clean and sanitize the location thoroughly after filming</li>
                          <li>Inform the host immediately if anyone develops symptoms after filming</li>
                          <li>Respect capacity limits for indoor spaces</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Production Safety Checklist</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Before Filming:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Communicate safety protocols to all cast and crew</li>
                            <li>Survey location for adequate ventilation</li>
                            <li>Prepare sanitation stations</li>
                            <li>Screen for symptoms</li>
                            <li>Distribute PPE if required</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">During Filming:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Maintain cleaning schedule</li>
                            <li>Enforce distancing when possible</li>
                            <li>Limit unnecessary personnel in confined spaces</li>
                            <li>Ensure proper ventilation</li>
                            <li>Monitor compliance with safety protocols</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hosts" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Guidelines for Property Owners</h2>
                    
                    <div className="space-y-8 mb-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Preparing Your Property</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Ensure proper ventilation in all filming areas</li>
                          <li>Consider providing hand sanitizer in easily accessible locations</li>
                          <li>Communicate any specific health requirements in your listing</li>
                          <li>Be clear about maximum capacity limits for your space</li>
                          <li>Prepare a cleaning protocol for before and after filming</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">During Bookings</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Consider contactless check-in when possible</li>
                          <li>Clearly mark any areas that are off-limits</li>
                          <li>Ensure proper air circulation throughout filming</li>
                          <li>Communicate any concerns directly to the production manager</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">After Filming</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Allow adequate time between bookings for thorough cleaning</li>
                          <li>Sanitize high-touch surfaces (doorknobs, light switches, etc.)</li>
                          <li>Launder any fabrics or furnishings as appropriate</li>
                          <li>Ventilate the property thoroughly between bookings</li>
                          <li>Report any health concerns to Nollywood Locations support</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Setting Expectations</h3>
                      
                      <p className="mb-4">Clear communication about your health and safety expectations is key. Consider addressing the following in your property listing:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Property Rules:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Any mask requirements for indoor spaces</li>
                            <li>Maximum capacity limits</li>
                            <li>Ventilation requirements during filming</li>
                            <li>Cleaning expectations after production</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Health Protocols:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Any screening requirements for crews</li>
                            <li>How you'll handle symptom reporting</li>
                            <li>Special considerations for high-risk spaces</li>
                            <li>Cancellation policy for health-related issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What happens if someone develops COVID-19 symptoms after a shoot?</AccordionTrigger>
                      <AccordionContent>
                        <p>If anyone involved in a production develops symptoms or tests positive for COVID-19 within 14 days after filming, we recommend:</p>
                        <ol className="list-decimal pl-5 space-y-2 mt-2">
                          <li>Notify all cast and crew members who were present</li>
                          <li>Inform the property owner through our messaging system</li>
                          <li>Alert Nollywood Locations support team</li>
                          <li>Follow local health department guidelines for testing and isolation</li>
                        </ol>
                        <p className="mt-2">This transparency helps protect everyone in our community and allows for appropriate cleaning and precautions.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Are COVID-19 cancellations eligible for refunds?</AccordionTrigger>
                      <AccordionContent>
                        <p>COVID-19 related cancellations may qualify under our Extenuating Circumstances Policy in certain situations:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>If you or a crew member tests positive for COVID-19 (with documentation)</li>
                          <li>If there are new government restrictions that prevent filming</li>
                          <li>If the property owner or filmmaker is required to quarantine (with documentation)</li>
                        </ul>
                        <p className="mt-2">Each case is reviewed individually by our support team. Documentation such as positive test results or doctor's notes may be required for refund approval.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can property owners require vaccination for film crews?</AccordionTrigger>
                      <AccordionContent>
                        <p>Property owners can set specific requirements for their locations, including health-related requirements, as long as they comply with local laws and regulations. If you wish to require vaccination for crews filming at your property:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>Clearly state this requirement in your listing description</li>
                          <li>Mention it again in pre-booking communications</li>
                          <li>Be prepared to discuss how verification will be handled</li>
                        </ul>
                        <p className="mt-2">Filmmakers should respect property owners' requirements or choose alternative locations if they cannot meet these requirements.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Where can I find current COVID-19 regulations for filming in Lagos?</AccordionTrigger>
                      <AccordionContent>
                        <p>For the most current information on COVID-19 regulations specific to film production in Lagos, we recommend checking:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li><a href="https://ncdc.gov.ng/" target="_blank" rel="noopener noreferrer" className="text-nollywood-primary hover:underline">Nigeria Centre for Disease Control (NCDC)</a></li>
                          <li><a href="https://lasg.gov.ng/" target="_blank" rel="noopener noreferrer" className="text-nollywood-primary hover:underline">Lagos State Government official website</a></li>
                          <li><a href="https://nfvcb.gov.ng/" target="_blank" rel="noopener noreferrer" className="text-nollywood-primary hover:underline">National Film and Video Censors Board (NFVCB)</a></li>
                        </ul>
                        <p className="mt-2">Additionally, for specific film production guidelines, you may want to consult with the Lagos State Film and Video Censors Board for any current protocols.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Commitment to Safety</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">We continuously update our guidelines based on public health recommendations. Our goal is to ensure filmmakers and property owners can work together safely.</p>
              <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                Contact Safety Team
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CovidGuidelines;
