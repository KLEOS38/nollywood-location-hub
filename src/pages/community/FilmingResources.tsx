
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Book, ExternalLink, Download, Video, Users, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const FilmingResources = () => {
  return (
    <>
      <Helmet>
        <title>Filming Resources | Nollywood Locations</title>
        <meta name="description" content="Access valuable resources, guides and tools for Nollywood filmmakers, including location checklists, agreements, and production tips." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Filming Resources</h1>
                <p className="text-lg text-muted-foreground mb-6">Tools, guides, and materials to support your Nollywood production</p>
                <div className="flex justify-center">
                  <Book className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="guides" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="guides">Guides & Checklists</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                  <TabsTrigger value="directory">Services Directory</TabsTrigger>
                </TabsList>
                
                <TabsContent value="guides" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Guides & Checklists</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Location Scouting Checklist
                        </CardTitle>
                        <CardDescription>Essential items to evaluate when scouting potential filming locations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">This comprehensive checklist covers all aspects to assess during location scouting, including space requirements, power availability, ambient noise, parking, and more.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 3,421 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.9/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" /> Download PDF
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Production Planning Guide
                        </CardTitle>
                        <CardDescription>Step-by-step planning framework for Nollywood productions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">A comprehensive guide to planning your production from pre-production through filming, with special focus on location management and scheduling.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 2,874 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.7/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" /> Download PDF
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Low-Budget Filming Guide
                        </CardTitle>
                        <CardDescription>Strategies for maximizing production value on limited budgets</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Learn practical approaches to creating high-quality content with constrained resources, including location selection tips to maximize production value.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 4,129 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.8/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" /> Download PDF
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Lagos Filming Permits Guide
                        </CardTitle>
                        <CardDescription>Navigating permits and permissions for Lagos filming locations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">A detailed guide to understanding when permits are required, how to obtain them, associated costs, and special considerations for various Lagos neighborhoods.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 2,035 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.6/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" /> Download PDF
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Guides & Checklists
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="templates" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Templates & Documents</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Location Release Form
                        </CardTitle>
                        <CardDescription>Standard agreement between filmmakers and property owners</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">A legally reviewed template for documenting permission to film at a location, outlining the terms, conditions, and compensation.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 5,783 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.9/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> Word
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> PDF
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Call Sheet Template
                        </CardTitle>
                        <CardDescription>Comprehensive daily production schedule</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">A customizable call sheet template with sections for crew call times, location details, scene breakdowns, and important contacts.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 4,217 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.8/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> Excel
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> Google Sheets
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Shooting Schedule Template
                        </CardTitle>
                        <CardDescription>Production timeline planning document</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">A template for organizing your shooting schedule by location, scene, and day, with built-in formulas to calculate shooting time and track progress.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 3,651 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.7/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> Excel
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> PDF
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-nollywood-primary" /> Budget Template for Location Shoots
                        </CardTitle>
                        <CardDescription>Financial planning tool for production costs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">A comprehensive budget template with detailed categories for location-related expenses, including rental fees, permits, transportation, and location department staffing.</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" /> 3,845 downloads
                          <Star className="h-4 w-4 ml-4 mr-1 text-amber-500" /> 4.9/5 rating
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> Excel
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" /> Google Sheets
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Templates
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="tutorials" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Lighting setup for indoor scenes" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Video className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Lighting Techniques for Small Spaces</CardTitle>
                        <CardDescription>Master lighting in confined Nigerian interiors</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Learn practical lighting solutions for small Nigerian interiors with limited power capacity. This tutorial covers techniques using affordable equipment.</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Watch Tutorial (18:24)
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1532800783378-1bed60adaf58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Camera movement demonstration" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Video className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Effective Location Sound Recording</CardTitle>
                        <CardDescription>Capturing clear audio in challenging environments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Tips and techniques for recording high-quality sound in typical Nigerian filming locations, dealing with ambient noise, and equipment recommendations.</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Watch Tutorial (22:07)
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1581508525333-ea82cce9e3c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Location scouting" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Video className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Location Scouting Masterclass</CardTitle>
                        <CardDescription>Finding and securing perfect filming locations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">A comprehensive guide to scouting locations in Lagos, including what to look for, questions to ask, and negotiation tips with property owners.</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Watch Tutorial (35:18)
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Production management" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Video className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Managing On-Location Productions</CardTitle>
                        <CardDescription>Logistics and coordination for smooth filming</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Learn how to efficiently manage crews, equipment, and schedules during on-location shoots to maximize productivity and minimize disruptions.</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Watch Tutorial (29:45)
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Tutorials
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="directory" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Services Directory</h2>
                  
                  <div className="bg-muted/30 p-6 rounded-lg mb-8">
                    <p className="text-sm text-center mb-0">This directory features trusted service providers for Nollywood productions. Services are independently reviewed and not directly affiliated with Nollywood Locations.</p>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Equipment Rental</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Lagos Film Gear</CardTitle>
                            <CardDescription>Full-service camera, lighting and grip equipment</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Comprehensive selection of professional cinema cameras, lighting kits, and grip equipment with delivery services available throughout Lagos.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Nollywood Tech Solutions</CardTitle>
                            <CardDescription>Affordable equipment packages for indie filmmakers</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Budget-friendly equipment options for independent productions with flexible rental terms and technical support services.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Production Insurance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">FilmGuard Nigeria</CardTitle>
                            <CardDescription>Specialized insurance for film productions</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Comprehensive insurance coverage for equipment, locations, cast, and third-party liability, with short-term policies available for single productions.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Creative Industries Insurance</CardTitle>
                            <CardDescription>Tailored coverage for Nollywood projects</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Flexible insurance solutions designed specifically for Nigerian film productions with quick quote services and location coverage options.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Set Design & Construction</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Lagos Creative Spaces</CardTitle>
                            <CardDescription>Modular set design and construction services</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Full-service set design, construction, and decoration with experience in both traditional and contemporary Nigerian settings.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Nollywood Set Masters</CardTitle>
                            <CardDescription>Authentic Nigerian set design specialists</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Specialists in creating authentic Nigerian environments from various regions and cultural backgrounds with attention to historical details.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Catering Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Film Feast Lagos</CardTitle>
                            <CardDescription>On-set catering specializing in Nigerian cuisine</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Mobile catering service with experience working on film sets, offering diverse menu options and flexible scheduling for production needs.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Meals on Reels</CardTitle>
                            <CardDescription>Production catering for crews of all sizes</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">Specialized in serving film productions with dietary accommodations, early morning calls, and extended production days throughout Lagos.</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View Complete Directory
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-12 bg-nollywood-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Need Custom Resources?</h2>
                <p className="text-lg mb-8">Our team can provide personalized assistance and resources tailored to your specific production needs.</p>
                <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                  Request Custom Resources
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

export default FilmingResources;
