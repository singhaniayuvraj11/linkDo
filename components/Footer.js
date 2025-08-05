import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">LinkDo</h3>
          <p className="text-sm text-gray-400">
            Building the future of personal link sharing. Customize. Share. Connect.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Founder</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white">Yuvraj Singhania</li>
            <li className="hover:text-white">+91 8017274811</li>
            <li className="hover:text-white">YourPage</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} LinkDo. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
