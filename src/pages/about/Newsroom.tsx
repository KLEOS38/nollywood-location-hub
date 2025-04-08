
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';

const Newsroom = () => {
  return (
    <>
      <Helmet>
        <title>Newsroom | Nollywood Locations</title>
        <meta name="description" content="Stay updated with the latest news, press releases, and media coverage about Nollywood Locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Newsroom</h1>
                <p className="text-lg text-muted-foreground mb-6">Latest news, announcements, and press coverage about Nollywood Locations</p>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="press-releases" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
                  <TabsTrigger value="news-coverage">News Coverage</TabsTrigger>
                  <TabsTrigger value="blog">Company Blog</TabsTrigger>
                </TabsList>
                
                <TabsContent value="press-releases" className="mt-6">
                  <div className="space-y-8">
                    <Card className="border-l-4 border-l-nollywood-primary">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <Badge className="mb-2 bg-nollywood-primary hover:bg-nollywood-primary/90">Latest</Badge>
                            <CardTitle className="text-xl">Nollywood Locations Secures ₦500 Million in Series A Funding</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> March 15, 2025
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4">Nollywood Locations, the leading marketplace connecting filmmakers with perfect filming venues across Nigeria, today announced it has secured ₦500 million in Series A funding led by Africa Ventures Capital with participation from Lagos Angel Network and Future Media Fund.</p>
                        <p className="text-muted-foreground">The funding will support expansion to additional Nigerian cities, enhanced verification services for properties, and development of advanced features for the filmmaker community.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="gap-1">
                          Read Full Press Release <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">New Partnership with Nigerian Film Corporation Announced</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> February 8, 2025
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4">Nollywood Locations is proud to announce a strategic partnership with the Nigerian Film Corporation (NFC) to provide preferred access to filming locations for officially sanctioned NFC productions.</p>
                        <p className="text-muted-foreground">This collaboration aims to support the growth of Nigerian cinema by reducing production costs and streamlining the location scouting process for filmmakers working with the NFC.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="gap-1">
                          Read Full Press Release <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">Nollywood Locations Reaches 1,000 Verified Properties Milestone</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> January 22, 2025
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4">Nollywood Locations has reached a significant milestone with 1,000 verified properties now available on the platform, representing a 300% growth in available filming locations since the company's launch.</p>
                        <p className="text-muted-foreground">The diverse property portfolio now includes luxury mansions, traditional compounds, modern offices, retail spaces, and unique venues across Lagos, with plans to expand to other Nigerian cities.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="gap-1">
                          Read Full Press Release <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">Launch of New Filmmaker Protection Program</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> December 5, 2024
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground">Nollywood Locations today announced the launch of its Filmmaker Protection Program, offering additional security measures and guarantees for productions booking through the platform, including location backup options and priority support.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="gap-1">
                          Read Full Press Release <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Press Releases
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="news-coverage" className="mt-6">
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6 border rounded-lg p-6">
                      <div className="md:w-1/3">
                        <img 
                          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="TechCabal coverage" 
                          className="rounded-lg h-40 w-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <Badge variant="outline">TechCabal</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> March 18, 2025
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">How Nollywood Locations is Revolutionizing Film Production in Nigeria</h3>
                        <p className="text-muted-foreground mb-4">"The platform's innovative approach to connecting filmmakers with location owners is dramatically reducing production costs and time spent on location scouting, potentially transforming how Nollywood operates..."</p>
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            Read Full Article <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 border rounded-lg p-6">
                      <div className="md:w-1/3">
                        <img 
                          src="https://images.unsplash.com/photo-1626142282460-10b8319575a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Business Day coverage" 
                          className="rounded-lg h-40 w-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <Badge variant="outline">Business Day</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> February 22, 2025
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Nollywood Locations Raises ₦500M to Expand Film Location Marketplace</h3>
                        <p className="text-muted-foreground mb-4">"In one of the largest funding rounds for a Nigerian creative tech startup this year, Nollywood Locations has secured ₦500 million to expand its marketplace connecting film producers with location owners..."</p>
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            Read Full Article <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 border rounded-lg p-6">
                      <div className="md:w-1/3">
                        <img 
                          src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Film Africa coverage" 
                          className="rounded-lg h-40 w-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <Badge variant="outline">Film Africa Magazine</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> January 30, 2025
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">The Tech Solution Changing How Nollywood Finds Filming Locations</h3>
                        <p className="text-muted-foreground mb-4">"Filmmakers speak highly of the platform's verification process and its ability to connect them with unique spaces that would have been impossible to discover through traditional channels..."</p>
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            Read Full Article <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 border rounded-lg p-6">
                      <div className="md:w-1/3">
                        <img 
                          src="https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="CNN Africa coverage" 
                          className="rounded-lg h-40 w-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <Badge variant="outline">CNN Africa</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> December 12, 2024
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Nigeria's Film Industry Boosted by New Location Marketplace</h3>
                        <p className="text-muted-foreground mb-4">"Nollywood Locations is helping property owners in Lagos earn significant income by listing their homes and businesses as filming locations, with some hosts reporting monthly earnings exceeding their regular salaries..."</p>
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            Read Full Article <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Media Coverage
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="blog" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1578668580909-989e0b2920cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="5 Trends Shaping Nollywood in 2025" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                          <Badge>Industry Insights</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" /> March 10, 2025
                          </div>
                        </div>
                        <CardTitle className="text-lg">5 Trends Shaping Nollywood in 2025</CardTitle>
                        <CardDescription>By Chioma Eze, Content Manager</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">We examine the top trends influencing Nigeria's film industry this year, from production techniques to distribution channels and audience preferences.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1632292220916-e9c34dd75db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="How Property Owners Earned ₦250M in 2024" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                          <Badge>Success Stories</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" /> February 25, 2025
                          </div>
                        </div>
                        <CardTitle className="text-lg">How Property Owners Earned ₦250M in 2024</CardTitle>
                        <CardDescription>By Michael Okonkwo, Host Relations</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">A look at how Nigerian property owners turned their spaces into film sets and earned substantial income through the Nollywood Locations platform.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="The Impact of Location Selection on Storytelling" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                          <Badge>Filmmaking Tips</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" /> February 12, 2025
                          </div>
                        </div>
                        <CardTitle className="text-lg">The Impact of Location Selection on Storytelling</CardTitle>
                        <CardDescription>By Funke Akindele, Guest Contributor</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Award-winning director Funke Akindele shares insights on how location choices can enhance narrative depth and audience connection in Nigerian cinema.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Behind the Scenes: Building Nollywood Locations" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                          <Badge>Company Stories</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" /> January 30, 2025
                          </div>
                        </div>
                        <CardTitle className="text-lg">Behind the Scenes: Building Nollywood Locations</CardTitle>
                        <CardDescription>By Tunde Falola, CEO & Co-Founder</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Our CEO shares the journey of creating Nigeria's first dedicated film location marketplace and the challenges of innovating in the creative tech space.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Blog Posts
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Media Resources</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h3 className="text-xl font-semibold mb-4">Company Fact Sheet</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Founded:</span>
                        <span className="text-muted-foreground"> October 2023</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Headquarters:</span>
                        <span className="text-muted-foreground"> Lagos, Nigeria</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Founders:</span>
                        <span className="text-muted-foreground"> Tunde Falola (CEO), Adebola Johnson (CTO), Nneka Okafor (COO)</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Total Funding:</span>
                        <span className="text-muted-foreground"> ₦650 Million</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Properties Listed:</span>
                        <span className="text-muted-foreground"> 1000+ verified locations across Lagos</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Total Bookings:</span>
                        <span className="text-muted-foreground"> 3,500+ completed filming sessions</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Brand Assets</CardTitle>
                      <CardDescription>Download official logos and brand materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Access our logo files in multiple formats, brand guidelines, and approved imagery for media usage.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Download Media Kit
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Executive Photos</CardTitle>
                      <CardDescription>Professional images of our leadership team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">High-resolution professional photos of our founders and executive team members for press use.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Download Photos
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
                <p className="text-lg mb-8">For press inquiries, interview requests, or additional information, please contact our media relations team.</p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm inline-block text-left">
                  <p className="font-medium">Press Contact:</p>
                  <p className="mb-3 text-muted-foreground">press@nollywoodlocations.com</p>
                  
                  <p className="font-medium">Phone:</p>
                  <p className="mb-3 text-muted-foreground">+234 (0) 701-555-7890</p>
                  
                  <Separator className="my-4" />
                  
                  <p className="text-sm text-muted-foreground">We aim to respond to all media inquiries within 24-48 hours.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Newsroom;
