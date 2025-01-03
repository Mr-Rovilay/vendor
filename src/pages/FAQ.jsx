import { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Package, 
  CreditCard, 
  RefreshCw,  
  Truck 
} from "lucide-react";
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';


const FAQ = () => {
  return (
    <div>
        <Header/>
        <Faq/>
        <Footer/>
    </div>
  )
}

const Faq = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Categorized FAQ Data
    const faqCategories = [
        {
          title: "Order Tracking & Management",
          icon: <Truck className="w-6 h-6 mr-2 text-blue-500" />,
          faqs: [
            {
              question: "How do I track my order?",
              answer: "Once your order is shipped, you'll receive a tracking number via email. You can track your package by clicking the tracking link or visiting our website's 'Order Tracking' section. Enter your order number or tracking ID to get real-time updates on your shipment's status."
            },
            {
              question: "Can I change or cancel my order?",
              answer: "You can modify or cancel your order within 1 hour of placing it. After this window, changes may not be possible. To make changes, log into your account, go to 'My Orders', and select the specific order. For urgent modifications, contact our customer support team immediately."
            },
            {
              question: "What shipping options do you offer?",
              answer: "We offer multiple shipping options: Standard Shipping (3-5 business days), Express Shipping (1-2 business days), and Priority Overnight. Shipping costs and estimated delivery times are calculated at checkout based on your location and selected method."
            }
          ]
        },
        {
          title: "Returns & Refunds",
          icon: <RefreshCw className="w-6 h-6 mr-2 text-green-500" />,
          faqs: [
            {
              question: "What is your return policy?",
              answer: "We offer a comprehensive 30-day return policy. Items must be:\n- Unused and in original packaging\n- Accompanied by the original receipt\n- Returned within 30 days of purchase\n\nRefunds are processed within 5-7 business days after we receive the returned item. The original shipping cost is non-refundable."
            },
            {
              question: "How do I initiate a return?",
              answer: "To start a return:\n1. Log into your account\n2. Go to 'My Orders'\n3. Select the item you wish to return\n4. Choose 'Initiate Return'\n5. Select the reason for return\n6. Print the pre-paid return label\n\nAlternatively, contact our customer support for assistance."
            }
          ]
        },
        {
          title: "Payment Methods",
          icon: <CreditCard className="w-6 h-6 mr-2 text-purple-500" />,
          faqs: [
            {
              question: "What payment methods do you accept?",
              answer: "We accept a wide range of payment methods:\n- Major Credit Cards (Visa, MasterCard, American Express)\n- PayPal\n- Apple Pay\n- Google Pay\n- Klarna (Buy Now, Pay Later)\n\nAll transactions are secured with end-to-end encryption to protect your financial information."
            },
            {
              question: "Is my payment information secure?",
              answer: "Absolutely! We use state-of-the-art security protocols:\n- PCI DSS Level 1 Compliance\n- 256-bit SSL Encryption\n- Tokenization of payment details\n- Regular security audits\n\nWe never store your full credit card information on our servers."
            }
          ]
        },
        {
          title: "Order Confirmation & Processing",
          icon: <Package className="w-6 h-6 mr-2 text-orange-500" />,
          faqs: [
            {
              question: "When will I receive my order confirmation?",
              answer: "An order confirmation email is sent immediately after successful payment. This email includes:\n- Order number\n- Itemized list of purchased products\n- Total cost\n- Estimated delivery date\n\nIf you don't receive this email within 15 minutes, please check your spam folder or contact our support."
            },
            {
              question: "How long does order processing take?",
              answer: "Order processing typically takes 1-2 business days:\n- Orders placed before 2 PM (local time) are processed the same day\n- Orders after 2 PM are processed the next business day\n- Custom or personalized items may take additional processing time\n\nYou'll receive a shipping confirmation email once your order is dispatched."
            }
          ]
        }
      ];
    
    const filteredFAQs = faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0);

      return (
        <div className="mb-5 max-pad-container">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 text-4xl font-bold">
                Customer Support Center
              </CardTitle>
              <p className="text-muted-foreground">
                Everything you need to know about ordering, shipping, and returns
              </p>
            </CardHeader>
            
            {/* Rest of the previous implementation remains the same */}
         
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search FAQs..." 
                    className="py-2 pl-10 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
    
              {/* Previous filtering and rendering logic remains the same */}
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((category, catIndex) => (
                  <div key={catIndex} className="mb-8">
                    <div className="flex items-center mb-4">
                      {category.icon}
                      <h2 className="text-2xl font-semibold">{category.title}</h2>
                    </div>
                    
                    <Accordion type="single" collapsible>
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`item-${catIndex}-${faqIndex}`}
                          className="border-b"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-left">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="whitespace-pre-line text-muted-foreground">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-xl text-muted-foreground">
                    No FAQs found matching your search.
                  </p>
                </div>
              )}
    
              {/* Contact Section */}
              <div className="mt-12 text-center">
                <h3 className="mb-4 text-2xl font-semibold">
                  Need More Help?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Our dedicated support team is available 24/7 to assist you.
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="mailto:support@example.com" 
                    className="px-6 py-3 transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Email Support
                  </a>
                  <a 
                    href="tel:1-800-HELP" 
                    className="px-6 py-3 transition-colors rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Call Support
                  </a>
                </div>
              </div>
          
        </div>
      );
    
}

export default FAQ