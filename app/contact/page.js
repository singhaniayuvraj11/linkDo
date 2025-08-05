"use client"
import React, { useState } from 'react';
import { Mail, HelpCircle, ChevronDown, Twitter, Instagram, Facebook } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="border-b border-gray-200 py-6">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-6 w-6 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-base text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
    </>
  );
};

// Contact Page Component for linkDo
export default function ContactPage() {
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
    <>
    <Navbar />
    <div className="bg-[#254f1a] min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d2e823] tracking-tight">
            Contact & Support
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-[#d2e823]">
            We're here to help. Find the best way to reach us and get answers to common questions below.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach Out</h2>
              
              <div className="space-y-6">
                {/* Email Contact */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Email Support</h3>
                    <p className="text-gray-600">Best for non-urgent inquiries.</p>
                    <a href="mailto:support@linkdo.com" className="font-medium text-indigo-600 hover:text-indigo-500">
                      support@linkdo.com
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Follow Us</h3>
                    <p className="text-gray-600">For updates and quick questions.</p>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-gray-500 hover:text-indigo-600"><Twitter className="h-6 w-6" /></a>
                      <a href="#" className="text-gray-500 hover:text-indigo-600"><Instagram className="h-6 w-6" /></a>
                      <a href="#" className="text-gray-500 hover:text-indigo-600"><Facebook className="h-6 w-6" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
             <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div>
                  {faqData.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
