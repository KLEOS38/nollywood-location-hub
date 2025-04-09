
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, FileText, Film, Bookmark, Book, Video, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const FilmingResources = () => {
  return (
    <>
      <Helmet>
        <title>Filming Resources | Film Loca</title>
        <meta name="description" content="Access guides, templates, and resources to help with your film production." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Filming Resources</h1>
              <p className="text-muted-foreground">Guides, templates, and tools to help with your film production</p>
            </div>
            
            {/* Resource Tabs */}
            <Tabs defaultValue="guides" className="w-full mb-12">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="directory">Directory</TabsTrigger>
              </TabsList>
              
              {/* Guides Tab */}
              <TabsContent value="guides" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Location scouting" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Book className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Production Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Location Scouting: A Complete Guide</h3>
                      <p className="text-muted-foreground mb-4">
                        Learn how to effectively scout locations for your next film project, including what to look for and questions to ask.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1609190235242-5ce6fd470bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Film permits" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Legal Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Film Permits & Regulations in Nigeria</h3>
                      <p className="text-muted-foreground mb-4">
                        Everything you need to know about obtaining film permits, regulations, and legal requirements for filming in Nigeria.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Budget planning" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Book className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Financial Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Location Budgeting for Filmmakers</h3>
                      <p className="text-muted-foreground mb-4">
                        Tips and strategies for effectively budgeting location costs for your film production.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Set design" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Film className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Production Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Set Design on a Budget</h3>
                      <p className="text-muted-foreground mb-4">
                        Practical tips for transforming filming locations with cost-effective set design techniques.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1598387846148-47e82ee120cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Lighting setup" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Film className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Technical Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Lighting Techniques for On-Location Filming</h3>
                      <p className="text-muted-foreground mb-4">
                        Essential lighting setups and techniques to achieve professional results when filming on location.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Location contracts" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Legal Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Understanding Location Contracts</h3>
                      <p className="text-muted-foreground mb-4">
                        A breakdown of location contracts, including key terms, negotiation tips, and potential red flags.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Budget Template</h3>
                        <p className="text-sm text-muted-foreground">Excel, Google Sheets</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A comprehensive spreadsheet to plan and track all your location-related expenses, including rental fees, permits, travel, and more.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Agreement Template</h3>
                        <p className="text-sm text-muted-foreground">Word, PDF</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A legally reviewed location agreement template that you can customize for your specific production needs.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Scouting Checklist</h3>
                        <p className="text-sm text-muted-foreground">PDF, Word</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A detailed checklist to help you evaluate potential filming locations, including technical, logistical, and aesthetic considerations.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Checklist
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Call Sheet Template</h3>
                        <p className="text-sm text-muted-foreground">Excel, Google Sheets</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A professional call sheet template with specific sections for location details, directions, and on-site logistics.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Release Form</h3>
                        <p className="text-sm text-muted-foreground">PDF, Word</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A standard release form granting permission to film at a location and use the footage in your production.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Form
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Production Insurance Checklist</h3>
                        <p className="text-sm text-muted-foreground">PDF</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A comprehensive checklist of insurance considerations for on-location filming to ensure proper coverage.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Checklist
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Tools Tab */}
              <TabsContent value="tools" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-muted p-4 rounded-full mb-4">
                        <Calendar className="h-8 w-8 text-nollywood-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Location Availability Calendar</h3>
                      <p className="text-muted-foreground mb-4">
                        Interactive tool to check availability of locations across different dates.
                      </p>
                      <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white w-full">
                        Launch Tool
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-muted p-4 rounded-full mb-4">
                        <Video className="h-8 w-8 text-nollywood-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Shot Planner</h3>
                      <p className="text-muted-foreground mb-4">
                        Plan your shots with this interactive tool designed for location-based filming.
                      </p>
                      <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white w-full">
                        Launch Tool
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-muted p-4 rounded-full mb-4">
                        <Book className="h-8 w-8 text-nollywood-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Budget Calculator</h3>
                      <p className="text-muted-foreground mb-4">
                        Estimate your location costs with our interactive budget calculator.
                      </p>
                      <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white w-full">
                        Launch Tool
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Directory Tab */}
              <TabsContent value="directory" className="mt-6">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Film Production Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Equipment Rental</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>CineGear Lagos - Victoria Island</li>
                          <li>FilmEquip Nigeria - Ikeja</li>
                          <li>LightCraft Services - Lekki</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Catering Services</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>FilmFeast Catering</li>
                          <li>On-Set Meals</li>
                          <li>CrewBites Nigeria</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Transport & Logistics</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>FilmMoves Transport</li>
                          <li>SetLogistics Nigeria</li>
                          <li>Production Vehicles Ltd</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Set Design & Construction</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Creative Spaces Nigeria</li>
                          <li>SetCraft Designs</li>
                          <li>FilmBuild Construction</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Costume & Wardrobe</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>FilmFashion Rentals</li>
                          <li>Costume Creations</li>
                          <li>Wardrobe Warriors</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Makeup & Hair</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>On-Set Glamour</li>
                          <li>Film Face Artistry</li>
                          <li>Production Beauty Pros</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Industry Organizations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Film Commissions & Regulatory Bodies</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Nigerian Film Commission</li>
                          <li>Lagos State Film Office</li>
                          <li>National Film and Video Censors Board</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Industry Associations</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Directors Guild of Nigeria</li>
                          <li>Association of Movie Producers</li>
                          <li>Nigerian Society of Cinematographers</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Education & Training</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Nigerian Film Institute</li>
                          <li>PEFTI Film Institute</li>
                          <li>Del-York Creative Academy</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Funding Organizations</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Bank of Industry - NollyFund</li>
                          <li>Nigerian Film Corporation</li>
                          <li>Lagos State Creative Industry Initiative</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Newsletter Section */}
            <section className="bg-nollywood-primary/5 p-8 rounded-lg mt-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">Subscribe to Resource Updates</h2>
                  <p className="text-muted-foreground mb-4">
                    Get notified when we add new guides, templates, and resources to help with your film productions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="px-4 py-2 border border-input rounded-md flex-grow"
                    />
                    <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                      Subscribe
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/3 flex justify-center">
                  <Bookmark className="h-24 w-24 text-nollywood-primary/30" />
                </div>
              </div>
            </section>
            
            {/* Upcoming Workshops */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Upcoming Workshops & Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4 flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                      <span className="text-3xl font-bold">15</span>
                      <span className="text-sm">May 2025</span>
                    </div>
                    
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold mb-2">Location Scouting Masterclass</h3>
                      <p className="text-muted-foreground mb-4">
                        A hands-on workshop covering advanced techniques for finding and securing the perfect filming locations.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>25 spots available</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4 flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                      <span className="text-3xl font-bold">22</span>
                      <span className="text-sm">May 2025</span>
                    </div>
                    
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold mb-2">Legal Aspects of Location Filming</h3>
                      <p className="text-muted-foreground mb-4">
                        A seminar covering permits, contracts, insurance, and legal considerations for on-location production.
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Virtual Event</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline">
                  View All Events
                </Button>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FilmingResources;
