
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react";

const HelpCenter = () => {
  return (
    <>
      <Helmet>
        <title>Help Center | Film Loca</title>
        <meta name="description" content="Get help with booking locations, managing your listings, or any other questions about Film Loca." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-10">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">How can we help you?</h1>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search for help topics..." 
                    className="pr-10 py-6 text-lg"
                  />
                  <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Help Categories */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                      <HelpCircle className="h-8 w-8 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
                    <p className="text-muted-foreground mb-4">Find quick answers to common questions about booking and listing locations.</p>
                    <Button variant="outline">Browse FAQs</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-nollywood-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Contact Support</h3>
                    <p className="text-muted-foreground mb-4">Need more help? Our support team is ready to assist you with any issues.</p>
                    <Button>Get in Touch</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                      <Phone className="h-8 w-8 text-nollywood-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                    <p className="text-muted-foreground mb-4">Talk to our team directly for urgent matters or complex questions.</p>
                    <Button variant="outline">+234 800 123 4567</Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I book a location?</AccordionTrigger>
                    <AccordionContent>
                      To book a location, browse our listings and select the one you're interested in. Check availability for your dates, then click "Request to Book." The property owner will review your request and confirm if the location is available.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit cards, including Visa, Mastercard, and American Express. We also support bank transfers for certain bookings. Payment is only processed after your booking is confirmed.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I list my property?</AccordionTrigger>
                    <AccordionContent>
                      To list your property, create an account and click on "List Your Property" in the navigation. Follow the step-by-step process to add details, photos, pricing, and availability for your location.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What fees does Film Loca charge?</AccordionTrigger>
                    <AccordionContent>
                      Film Loca charges a 10% service fee to filmmakers for each booking. Property owners pay a 3% commission on successful bookings. These fees help us maintain the platform and provide customer support.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I cancel a booking?</AccordionTrigger>
                    <AccordionContent>
                      To cancel a booking, go to your account dashboard and select the booking you wish to cancel. Follow the cancellation process, and your refund will be processed according to the location's cancellation policy.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
          
          {/* Contact Form */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-6">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-6">
                      Can't find what you're looking for? Send us a message and our support team will get back to you as soon as possible.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-nollywood-primary" />
                        <span>support@filmloca.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-nollywood-primary" />
                        <span>+234 800 123 4567</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 bg-white p-6 shadow-sm rounded-lg">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject
                        </label>
                        <Input id="subject" placeholder="What's this about?" />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 py-2 border border-input rounded-md"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
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

export default HelpCenter;
