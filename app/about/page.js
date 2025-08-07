import React from 'react';
import { Users, Target, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// About Page Component for linkDo
export default function AboutPage() {
  return (<>
    <Navbar/>
    <div className="bg-[#e9c0e9] min-h-screen text-gray-800 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            About <span className="text-indigo-600">linkDo</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            One link to rule them all. We help you connect your audience to all your content with a single, simple link.
          </p>
        </header>

        {/* Main Content Section */}
        <main>
          {/* Mission Statement */}
          <div className="relative mb-20">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-black" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#e9c0e9] px-3 text-lg font-medium text-gray-900">
                Our Mission
              </span>
            </div>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl font-light leading-relaxed">
              To empower creators, artists, and businesses to unify their digital presence, making it effortless to share their world with their audience. We believe in the power of simplicity and connection.
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              
              {/* Feature 1: For Everyone */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Built for Everyone</h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you&apos;re a content creator, a small business, an artist, or just someone who wants to share multiple links easily, linkDo is the perfect tool for you.
                </p>
              </div>

              {/* Feature 2: Simple & Powerful */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Simple & Powerful</h2>
                <p className="text-gray-600 leading-relaxed">
                  Get your page up and running in minutes. Our intuitive editor makes it easy to add, customize, and manage your links without any technical skills required.
                </p>
              </div>
              
              {/* Feature 3: Know Your Audience */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Understand Your Audience</h2>
                <p className="text-gray-600 leading-relaxed">
                  With our built-in analytics, you can track link clicks and gain insights into what your audience is most interested in, helping you make better content decisions.
                </p>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
    <Footer />
    </>
  );
}
