
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Nollywood Locations</title>
        <meta name="description" content="Terms and conditions for using the Nollywood Locations platform. Please review these terms before using our services." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="text-lg text-muted-foreground mb-6">Please read these terms carefully before using our platform</p>
                <div className="flex justify-center">
                  <FileText className="h-16 w-16 text-nollywood-primary" />
                </div>
                <p className="text-sm text-muted-foreground mt-4">Last Updated: April 1, 2025</p>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
                  
                  <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Nollywood Locations Ltd. ("Company", "we", "us", or "our"), concerning your access to and use of the Nollywood Locations platform.</p>
                  
                  <p>By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the platform.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">2. Definitions</h2>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>"Platform"</strong> refers to the Nollywood Locations website, mobile applications, and services.</li>
                    <li><strong>"Property Owner"</strong> or <strong>"Host"</strong> refers to users who list properties on the platform for filming purposes.</li>
                    <li><strong>"Filmmaker"</strong> refers to users who book properties for filming purposes.</li>
                    <li><strong>"Booking"</strong> refers to a reservation of a property for filming purposes.</li>
                    <li><strong>"Content"</strong> refers to all information, text, graphics, photos, videos, and other materials uploaded, downloaded, or appearing on the platform.</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">3. Account Registration and Eligibility</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account Creation</h3>
                  <p>To use certain features of our platform, you must register for an account. When you register, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Eligibility</h3>
                  <p>You must be at least 18 years old to create an account and use our platform. By creating an account, you represent and warrant that you meet this requirement and have the legal capacity to enter into these Terms.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Account Verification</h3>
                  <p>We may implement identity verification processes. You agree to provide additional information as requested and consent to our verification of your identity and information.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">4. Platform Rules and Restrictions</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4.1 General Rules</h3>
                  <p>When using our platform, you agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Post false, misleading, or deceptive content</li>
                    <li>Harass, abuse, or harm another person</li>
                    <li>Use our platform in any manner that could interfere with, disrupt, or negatively affect the platform</li>
                    <li>Attempt to gain unauthorized access to the platform or other users' accounts</li>
                    <li>Use the platform for purposes other than those intended</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Property Owner Rules</h3>
                  <p>If you are a Property Owner using our platform, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information about your property</li>
                    <li>Have the legal right to list the property for filming purposes</li>
                    <li>Disclose any restrictions, limitations, or conditions that may affect filming</li>
                    <li>Maintain the property as represented in your listing</li>
                    <li>Comply with all applicable laws, including tax and property regulations</li>
                    <li>Honor confirmed bookings and not cancel without legitimate reason</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Filmmaker Rules</h3>
                  <p>If you are a Filmmaker using our platform, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate information about your production and filming needs</li>
                    <li>Use properties only for the purposes specified in your booking</li>
                    <li>Obtain any necessary permits or permissions for filming</li>
                    <li>Respect property rules and limitations</li>
                    <li>Leave properties in the condition you found them</li>
                    <li>Not exceed the crew size or equipment limitations specified</li>
                    <li>Honor confirmed bookings and not cancel without legitimate reason</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">5. Bookings and Payments</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Booking Process</h3>
                  <p>Filmmakers may request to book properties through our platform. Property Owners have the right to accept or decline these requests. A booking is considered confirmed only when accepted by the Property Owner and payment is processed.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Pricing and Fees</h3>
                  <p>Property Owners set their own prices for their properties. In addition to the property fee, Nollywood Locations charges a service fee to both Property Owners and Filmmakers for the use of our platform. All fees are disclosed before a booking is confirmed.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Payments</h3>
                  <p>Payments are processed through our secure payment system. Filmmakers are required to pay the full amount at the time of booking. Property Owners receive payment 24 hours after successful check-in, minus applicable fees.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Cancellations and Refunds</h3>
                  <p>Cancellation policies are set by Property Owners and displayed on property listings. Refunds are processed according to these policies and our platform guidelines. Nollywood Locations reserves the right to override cancellation policies in exceptional circumstances.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">6. Content and Intellectual Property</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6.1 User Content</h3>
                  <p>You retain ownership of content you submit to the platform. By submitting content, you grant Nollywood Locations a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute the content for the purpose of operating and promoting the platform.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Platform Content</h3>
                  <p>The platform, including its design, features, and content created by Nollywood Locations, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our platform content without our express permission.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Reviews and Feedback</h3>
                  <p>Users may leave reviews and ratings on the platform. Reviews must be honest, relevant, and respectful. We reserve the right to remove reviews that violate our policies or Terms.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">7. Privacy and Data Protection</h2>
                  
                  <p>Our Privacy Policy governs the collection, use, and disclosure of your personal information. By using our platform, you consent to our privacy practices as outlined in the Privacy Policy.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
                  
                  <p>To the maximum extent permitted by law, Nollywood Locations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your access to or use of or inability to access or use the platform</li>
                    <li>Any conduct or content of any third party on the platform</li>
                    <li>Any content obtained from the platform</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">9. Dispute Resolution</h2>
                  
                  <p>In the event of any dispute arising between users of the platform, we encourage you to first attempt to resolve the issue directly with the other party. If this is not possible, please contact our support team, who will attempt to help mediate the dispute.</p>
                  
                  <p>For disputes between users and Nollywood Locations, you agree to first contact us with your concerns before pursuing formal legal action. If we cannot resolve the issue informally, any legal proceedings shall be brought in the courts of Lagos, Nigeria.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">10. Termination</h2>
                  
                  <p>We reserve the right to suspend or terminate your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>
                  
                  <p>We may modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our platform and updating the "Last Updated" date. Your continued use of the platform after such changes constitutes your acceptance of the new Terms.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Information</h2>
                  
                  <p>If you have any questions or concerns about these Terms or our platform, please contact us at:</p>
                  
                  <div className="bg-muted/30 p-6 rounded-lg mt-4">
                    <p className="font-medium">Email: legal@nollywoodlocations.com</p>
                    <p className="font-medium mt-2">Postal Address:</p>
                    <p>Nollywood Locations Ltd.</p>
                    <p>23 Admiralty Way</p>
                    <p>Lekki Phase 1</p>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90 gap-1">
                    Back to Home <ArrowRight className="h-4 w-4" />
                  </Button>
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

export default Terms;
