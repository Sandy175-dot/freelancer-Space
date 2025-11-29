import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md mt-auto border-t border-white/10 dark:border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                FreelanceHub
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connecting talented freelancers with amazing clients worldwide.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 hover:text-blue-500 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/browse-jobs" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Browse Jobs
              </Link>
              <Link to="/browse-freelancers" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Browse Freelancers
              </Link>
              <Link to="/about" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                About Us
              </Link>
              <Link to="/help" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Help & FAQ
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">For Users</h3>
            <div className="space-y-2">
              <Link to="/signup" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Sign Up
              </Link>
              <Link to="/login" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Login
              </Link>
              <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm">
                Terms of Service
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@freelancehub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2025 FreelanceHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
