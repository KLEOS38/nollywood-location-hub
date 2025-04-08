
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageSquare, Users, PlusCircle, Search, ArrowUpRight, Star, Heart, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const CommunityForum = () => {
  return (
    <>
      <Helmet>
        <title>Community Forum | Nollywood Locations</title>
        <meta name="description" content="Join the Nollywood Locations community forum to connect with filmmakers, share experiences, and get advice about filming locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Forum</h1>
                <p className="text-lg text-muted-foreground mb-6">Connect with fellow filmmakers and property owners in the Nollywood community</p>
                <div className="flex justify-center">
                  <MessageSquare className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                <Tabs defaultValue="all" className="w-full max-w-md">
                  <TabsList>
                    <TabsTrigger value="all">All Discussions</TabsTrigger>
                    <TabsTrigger value="locations">Locations</TabsTrigger>
                    <TabsTrigger value="filming">Filming Tips</TabsTrigger>
                    <TabsTrigger value="hosting">Hosting</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Search discussions..." 
                      className="pl-10 w-full md:w-64"
                    />
                  </div>
                  <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90 whitespace-nowrap">
                    <PlusCircle className="h-4 w-4 mr-2" /> New Post
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/4">
                  <TabsContent value="all" className="mt-0">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge className="mb-2 bg-nollywood-primary hover:bg-nollywood-primary/90">Featured</Badge>
                              <CardTitle className="text-xl">Best locations for night scenes in Lagos</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs">Locations</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground">I'm planning a thriller with several night scenes and need recommendations for well-lit locations around Lagos that are suitable for evening shoots...</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> 24 replies
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> 342 views
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" /> 18 likes
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://i.pravatar.cc/32?img=1" 
                              alt="Avatar" 
                              className="h-6 w-6 rounded-full"
                            />
                            <span>David Oyelowo • 2 days ago</span>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">Tips for filming in residential properties</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs">Filming Tips</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground">After directing several films in residential locations, I wanted to share some practical advice for minimizing disruption and maintaining good relationships with property owners...</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> 42 replies
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> 516 views
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" /> 76 likes
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://i.pravatar.cc/32?img=2" 
                              alt="Avatar" 
                              className="h-6 w-6 rounded-full"
                            />
                            <span>Genevieve Nnaji • 5 days ago</span>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">How to prepare your property for a film crew</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs">Hosting</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground">I've hosted 8 different productions over the past year, and I've developed a checklist that helps me prepare my home for film crews. Here's what I've learned...</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> 17 replies
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> 289 views
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" /> 32 likes
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://i.pravatar.cc/32?img=3" 
                              alt="Avatar" 
                              className="h-6 w-6 rounded-full"
                            />
                            <span>Temilola Adebayo • 1 week ago</span>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">Location scouting challenges in rainy season</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs">Locations</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground">With the rainy season approaching, I'm concerned about outdoor shooting locations. What are some good alternatives or contingency plans for when the weather doesn't cooperate?</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> 12 replies
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> 178 views
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" /> 8 likes
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://i.pravatar.cc/32?img=4" 
                              alt="Avatar" 
                              className="h-6 w-6 rounded-full"
                            />
                            <span>Kunle Afolayan • 2 weeks ago</span>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">Recommendations for luxury villa locations in Ikoyi</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs">Locations</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground">Our upcoming series requires several scenes in a luxury home. Budget is around ₦300,000 per day. Has anyone worked with any particularly accommodating hosts in Ikoyi or VI?</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> 9 replies
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> 142 views
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" /> 5 likes
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://i.pravatar.cc/32?img=5" 
                              alt="Avatar" 
                              className="h-6 w-6 rounded-full"
                            />
                            <span>Folake Johnson • 3 weeks ago</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <Button variant="outline">Load More Discussions</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="locations" className="mt-0">
                    <p className="text-center text-muted-foreground py-8">Select a tab to view discussions related to filming locations.</p>
                  </TabsContent>
                  
                  <TabsContent value="filming" className="mt-0">
                    <p className="text-center text-muted-foreground py-8">Select a tab to view discussions related to filming tips and techniques.</p>
                  </TabsContent>
                  
                  <TabsContent value="hosting" className="mt-0">
                    <p className="text-center text-muted-foreground py-8">Select a tab to view discussions related to hosting film productions.</p>
                  </TabsContent>
                </div>
                
                <div className="md:w-1/4">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>Be respectful to other members</li>
                          <li>Share experiences, not advertisements</li>
                          <li>Keep discussions constructive</li>
                          <li>Respect confidentiality of productions</li>
                          <li>Report inappropriate content</li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Full Guidelines
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Active Members</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src="https://i.pravatar.cc/40?img=2" 
                              alt="Avatar" 
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">Genevieve Nnaji</p>
                              <p className="text-xs text-muted-foreground">Director • 76 posts</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <img 
                              src="https://i.pravatar.cc/40?img=6" 
                              alt="Avatar" 
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">Kemi Adetiba</p>
                              <p className="text-xs text-muted-foreground">Producer • 58 posts</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <img 
                              src="https://i.pravatar.cc/40?img=3" 
                              alt="Avatar" 
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">Temilola Adebayo</p>
                              <p className="text-xs text-muted-foreground">Property Owner • 43 posts</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <img 
                              src="https://i.pravatar.cc/40?img=4" 
                              alt="Avatar" 
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">Kunle Afolayan</p>
                              <p className="text-xs text-muted-foreground">Director • 39 posts</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Popular Topics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Location Scouting</Badge>
                          <Badge variant="secondary">Budget Tips</Badge>
                          <Badge variant="secondary">Crew Management</Badge>
                          <Badge variant="secondary">Lighting</Badge>
                          <Badge variant="secondary">Host Advice</Badge>
                          <Badge variant="secondary">Weather Concerns</Badge>
                          <Badge variant="secondary">Permits</Badge>
                          <Badge variant="secondary">Equipment</Badge>
                          <Badge variant="secondary">Post-Production</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Upcoming Events</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm">Location Scouting Workshop</h4>
                            <p className="text-xs text-muted-foreground">July 15, 2025 • Lagos Film House</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm">Nollywood Locations Meetup</h4>
                            <p className="text-xs text-muted-foreground">August 2, 2025 • The Wheatbaker Hotel</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm">Property Host Networking</h4>
                            <p className="text-xs text-muted-foreground">August 18, 2025 • Virtual Event</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Events
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">Connect with fellow filmmakers and property owners, share experiences, and find solutions together.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                  <Users className="mr-2 h-4 w-4" /> Join Community
                </Button>
                <Link to="/auth?tab=signup">
                  <Button variant="outline">
                    Create Account <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CommunityForum;
