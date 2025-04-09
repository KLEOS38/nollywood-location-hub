
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, AlertTriangle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CancellationOptions = () => {
  return (
    <>
      <Helmet>
        <title>Cancellation Options | Film Loca</title>
        <meta name="description" content="Learn about our cancellation policies and how to cancel your booking." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Calendar className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Cancellation Policies</h1>
              <p className="text-lg max-w-2xl mx-auto">
                We understand that plans can change. Learn about our flexible cancellation options to help you manage your bookings.
              </p>
            </div>
          </section>
          
          {/* Cancellation Types */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Cancellation Policy Types</h2>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>Different cancellation policies offered by Film Loca</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Policy Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Refund Timeline</TableHead>
                      <TableHead className="text-right">Cancellation Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Flexible</TableCell>
                      <TableCell>Full refund if cancelled more than 24 hours before the booking.</TableCell>
                      <TableCell>Within 7 days</TableCell>
                      <TableCell className="text-right">0-10%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Moderate</TableCell>
                      <TableCell>Full refund if cancelled more than 5 days before the booking.</TableCell>
                      <TableCell>Within 10 days</TableCell>
                      <TableCell className="text-right">10-25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Strict</TableCell>
                      <TableCell>50% refund if cancelled more than 14 days before the booking.</TableCell>
                      <TableCell>Within 14 days</TableCell>
                      <TableCell className="text-right">25-50%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Production</TableCell>
                      <TableCell>Custom policy for large productions with special requirements.</TableCell>
                      <TableCell>As specified in contract</TableCell>
                      <TableCell className="text-right">Variable</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    <strong>Important Note:</strong> Each location may have its own specific cancellation policy. Always check the policy details on the location's listing page before booking.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* How to Cancel */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">How to Cancel a Booking</h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-nollywood-primary" />
                      For Filmmakers
                    </h3>
                    
                    <ol className="list-decimal ml-5 space-y-4">
                      <li className="pl-2">
                        <span className="font-medium">Go to your account dashboard</span>
                        <p className="text-muted-foreground mt-1">Sign in to your Film Loca account and navigate to "My Bookings".</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Find the booking you want to cancel</span>
                        <p className="text-muted-foreground mt-1">Locate the specific booking in your list of upcoming reservations.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Click on "Cancel Booking"</span>
                        <p className="text-muted-foreground mt-1">Select the cancellation option and provide a reason if requested.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Review refund information</span>
                        <p className="text-muted-foreground mt-1">Confirm the refund amount based on the location's cancellation policy.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Confirm cancellation</span>
                        <p className="text-muted-foreground mt-1">Complete the process by confirming the cancellation request.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-nollywood-primary" />
                      For Property Owners
                    </h3>
                    
                    <ol className="list-decimal ml-5 space-y-4">
                      <li className="pl-2">
                        <span className="font-medium">Access your host dashboard</span>
                        <p className="text-muted-foreground mt-1">Sign in to your Film Loca account and go to "My Listings".</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Select the relevant booking</span>
                        <p className="text-muted-foreground mt-1">Find the booking you need to cancel in your upcoming reservations.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Choose "Cancel Reservation"</span>
                        <p className="text-muted-foreground mt-1">Select a cancellation reason from the available options.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Provide additional information</span>
                        <p className="text-muted-foreground mt-1">Explain the circumstances of the cancellation to the filmmaker.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Review cancellation terms</span>
                        <p className="text-muted-foreground mt-1">Understand any penalties that may apply for host cancellations.</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How quickly will I receive my refund?</AccordionTrigger>
                    <AccordionContent>
                      Refunds are processed within 24-48 hours of cancellation approval. However, it may take 5-10 business days for the funds to appear in your account, depending on your payment method and financial institution.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I get a full refund if I need to cancel due to an emergency?</AccordionTrigger>
                    <AccordionContent>
                      We review emergency cancellations on a case-by-case basis. If you need to cancel due to a documented emergency (medical emergency, natural disaster, etc.), please contact our support team as soon as possible with relevant documentation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What happens if the property owner cancels my booking?</AccordionTrigger>
                    <AccordionContent>
                      If a property owner cancels your booking, you will receive a full refund regardless of the cancellation policy. We'll also provide assistance in finding an alternative location for your shoot and may offer additional compensation for the inconvenience.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I change the dates instead of cancelling?</AccordionTrigger>
                    <AccordionContent>
                      Yes, subject to the property owner's approval and availability. Log into your account, go to "My Bookings," select the booking you want to modify, and click "Request Date Change." The property owner will need to approve these changes.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is the service fee refundable if I cancel?</AccordionTrigger>
                    <AccordionContent>
                      The service fee is refundable if you cancel more than 48 hours after booking and at least 14 days before the scheduled start date. Otherwise, the service fee is non-refundable.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
              <p className="max-w-2xl mx-auto mb-6">
                If you have questions about cancellations or need assistance with a booking, our support team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/help">
                  <Button variant="outline">Contact Support</Button>
                </Link>
                <Link to="/terms">
                  <Button>Terms of Service</Button>
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

export default CancellationOptions;
