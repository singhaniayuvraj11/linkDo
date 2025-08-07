'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- SVG Icon Components (replaces lucide-react for a self-contained component) ---
// This makes the component portable and removes an external dependency.

const MailIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const HelpCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TwitterIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3 7.1 0 .5-.2 1.1-.4 1.6-1.1 2.3-3.9 3.6-6.6 3.6-3.6 0-6.6-2-9.3-5.1-1-1.1-1.9-2.3-2.3-3.5-.2-.6-.3-1.2-.2-1.8.1-1.2 1.3-2.8 3.2-4.1 1.4-.9 2.8-1.5 4.3-1.8.5-.1 1.1-.2 1.7-.2 1.1 0 2.2.4 3.3 1.1.2-.2.4-.3.6-.5.2-.2.4-.3.7-.4.3-.1.6-.2.9-.2.3 0 .6 0 .9.1.3.1.6.2.8.3.2.1.4.3.6.4.2.2.4.4.6.6.2.2.3.4.4.6.1.2.2.5.2.7 0 .2 0 .5-.1.7s-.1.4-.2.6c-.1.2-.2.4-.3.5-.1.1-.2.3-.4.4-.1.1-.2.2-.3.3-.1.1-.2.2-.3.3s-.2.2-.3.3c-.1.1-.2.1-.3.2z" />
    </svg>
);


const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);





// --- FAQ Item Component ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex justify-between items-center text-left py-6"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDownIcon
          className={`h-6 w-6 text-indigo-600 transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <div className="pb-6 text-base text-gray-600">
                <p>{answer}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Contact Page Component ---
const ContactPage = () => {
  const faqData = [
    {
      question: 'What is linkDo?',
      answer: 'linkDo is a tool that allows you to create a personalized and easily-customizable page that houses all the important links you want to share with your audience. It\'s a link-in-bio solution for Instagram, TikTok, and other social platforms.'
    },
    {
      question: 'How do I add links to my page?',
      answer: 'Once you sign up and log in to your dashboard, you will see an "Add New Link" button. Simply click it, enter the URL and a title for your link, and it will instantly appear on your linkDo page.'
    },
    {
      question: 'Can I customize the look of my page?',
      answer: 'Absolutely! We offer a variety of themes, color options, and font choices to help you match your linkDo page to your brand or personal style. You can find these options in the "Appearance" tab of your admin dashboard.'
    },
    {
      question: 'Is linkDo free to use?',
      answer: 'Yes, we offer a robust free plan that includes unlimited links and basic customization. We also have premium plans with advanced features like detailed analytics, custom domains, and more.'
    }
  ];

  return (
    <div className="bg-[#254f1a] min-h-screen font-sans pt-20">
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="text-center mb-16 sm:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d2e823] tracking-tight">
              Contact & Support
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-[#d2e823]/90">
              We&apos;re here to help. Find the best way to reach us and get answers to common questions below.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-2xl h-full sticky top-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Reach Out</h2>
                
                <div className="space-y-8">
                  {/* Email Contact */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
                      <MailIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Email Support</h3>
                      <p className="text-gray-600 text-sm">Best for non-urgent inquiries.</p>
                      <a href="mailto:support@linkdo.com" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                        support@linkdo.com
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
                      <HelpCircleIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
                      <p className="text-gray-600 text-sm">For updates and quick questions.</p>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"><TwitterIcon className="h-6 w-6" /></a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"><InstagramIcon className="h-6 w-6" /></a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"><FacebookIcon className="h-6 w-6" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: FAQ Section */}
            <div className="lg:col-span-2">
                 <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div>
                      {faqData.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                      ))}
                    </div>
                 </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


// The final App component to be rendered
export default function App() {
  return <ContactPage />;
}
